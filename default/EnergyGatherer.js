const RoleFunctions = require('RoleFunctions')

const isEnoughEnergyInResourceForCreep = resource => resource.amount > 0 && resource.resourceType == RESOURCE_ENERGY

const isEnoughEnergyInContainerForCreep = struct =>
    (struct.structureType == STRUCTURE_STORAGE ||
    struct.structureType == STRUCTURE_CONTAINER) &&
    struct.store[RESOURCE_ENERGY] > 0

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


const EnergyGatherer =
{
    gatherEnergy: creep =>
    {
        const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter : resource => isEnoughEnergyInResourceForCreep(resource) })
        if(droppedEnergy != undefined)
            pickupDroppedEnergy(creep, droppedEnergy)
        else
        {
            const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => isEnoughEnergyInContainerForCreep(struct) })
            if(energyContainer != null)
                withdrawEnergy(creep, energyContainer)
        }
    }
}

module.exports = EnergyGatherer