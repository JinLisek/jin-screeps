const isStructNonEmptyContainer = struct => struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0

const transferEnergy = (creep, target) =>
{
    const transferResult = creep.transfer(target, RESOURCE_ENERGY)
    transferResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, target) :
        RoleFunctions.ifNotZero(transferResult, console.log, "ERROR: creep.transfer: " + transferResult)
}

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
    creep.moveTo(droppedEnergy)
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
    
    transferEnergyOrRest: (creep, targetFinder, restPos) => 
    {
        const targets = creep.room.find(FIND_STRUCTURES, {filter: targetFinder});
        targets.length > 0 ? transferEnergy(creep, targets[0]) : RoleFunctions.moveCreepToTarget(creep, restPos);
    },
    
    canCreepCarryMore: (creep) => creep.carry.energy < creep.carryCapacity,

    gatherEnergy: creep =>
    {
        const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, { filter : energy => energy.amount > 50 && energy.resourceType == RESOURCE_ENERGY })[0]
        if(droppedEnergy != undefined)
            pickupDroppedEnergy(creep, droppedEnergy)
        else
        {
            const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: isStructNonEmptyContainer})
            energyContainer == null ?
                RoleFunctions.harvestIfPossible(creep, RoleFunctions.findClosestActiveSource) :
                withdrawEnergy(creep, energyContainer)
        }
    }
}

module.exports = RoleFunctions;