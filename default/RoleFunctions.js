const isEnoughEnergyInResourceForCreep = resource => resource.amount > 0 && resource.resourceType == RESOURCE_ENERGY

const isEnoughEnergyInContainerForCreep = struct => struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0

const harvest = (creep, source) =>
{
    const harvestResult = creep.harvest(source)
    harvestResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, source) :
        RoleFunctions.ifNotZero(harvestResult, console.log, "ERROR: creep.harvest: " + harvestResult + ", position: " + source)
}

const withdrawEnergy = (creep, container) =>
{
    const withdrawResult = creep.withdraw(container, RESOURCE_ENERGY)
    withdrawResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, container) :
        RoleFunctions.ifNotZero(withdrawResult, console.log, "ERROR: creep.withdraw: " + withdrawResult + ", position: " + creep.pos)
}

const pickupDroppedEnergy = (creep, droppedEnergy) =>
{
    RoleFunctions.moveCreepToTarget(creep, droppedEnergy)
    creep.pickup(droppedEnergy)
}






const RoleFunctions =
{
    ifNotZero: (val, func, param) => val == 0 ? null : func(param),

    moveCreepToTarget: (creep, target) => creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}}),

    findClosestActiveSource: (creep) => creep.pos.findClosestByPath(
        FIND_SOURCES_ACTIVE,
        {filter: source => source.room.controller.owner.username == 'JinLisek'}
    ),

    harvestIfPossible: (creep, sourceFinder) =>
    {
        const source = sourceFinder(creep)
        source == null ? null : harvest(creep, source);
    },

    isFullInPercent: (creep, percent) => creep.carry.energy / creep.carryCapacity >= percent,
    
    canCreepCarryMore: (creep) => creep.carry.energy < creep.carryCapacity,

    gatherEnergy: creep =>
    {
        const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter : resource => isEnoughEnergyInResourceForCreep(resource) })
        if(droppedEnergy != undefined)
            pickupDroppedEnergy(creep, droppedEnergy)
        else
        {
            const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => isEnoughEnergyInContainerForCreep(struct) })
            energyContainer == null ?
                RoleFunctions.harvestIfPossible(creep, RoleFunctions.findClosestActiveSource) :
                withdrawEnergy(creep, energyContainer)
        }
    }
}

module.exports = RoleFunctions;