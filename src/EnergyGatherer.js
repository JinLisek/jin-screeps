const RoleFunctions = require('RoleFunctions')

const isEnoughEnergyInResourceForCreep = creep => resource => resource.amount > creep.carryCapacity && resource.resourceType == RESOURCE_ENERGY

const isEnoughEnergyInStructureForCreep = creep => struct =>
    (struct.structureType == STRUCTURE_STORAGE ||
    struct.structureType == STRUCTURE_CONTAINER) &&
    struct.store[RESOURCE_ENERGY] > creep.carryCapacity

const isSafeInCreepRoom = creep => creep.room.find(FIND_HOSTILE_CREEPS) == 0

const findTargetForEnergyGathering = creep =>
{
    const droppedEnergy = isSafeInCreepRoom(creep) ?
        creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter : resource => isEnoughEnergyInResourceForCreep(creep)(resource) }) :
        undefined
    
    return droppedEnergy == undefined ?
        creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => isEnoughEnergyInStructureForCreep(creep)(struct) }) :
        droppedEnergy
}

const checkIfDroppedResourceValidForGathering = creep => resource =>
    resource.resourceType != undefined && isEnoughEnergyInResourceForCreep(creep)(resource)

const checkIfStructureValidForGathering = creep => struct =>
    struct.structureType != undefined && isEnoughEnergyInStructureForCreep(creep)(struct)

const checkIfTargetValidForEnergyGathering = creep => target =>
    checkIfDroppedResourceValidForGathering(creep)(target) ||
    checkIfStructureValidForGathering(creep)(target)

const getEnergyFromTarget = (creep, target) =>
{
    if(target.resourceType != undefined)
        creep.pickup(target)
    else if(target.structureType != undefined)
        creep.withdraw(target, RESOURCE_ENERGY)
    else
        console.log("ERROR: Trying to get energy from invalid source")

    creep.memory.targetId = undefined
}

const EnergyGatherer =
{
    gatherEnergy: creep =>
    {
        creep.memory.targetId = RoleFunctions.getTargeIdtIfNoLongerValid(creep, checkIfTargetValidForEnergyGathering(creep), findTargetForEnergyGathering)
        const energyGatheringTarget = Game.getObjectById(creep.memory.targetId)

        if(energyGatheringTarget != undefined)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, energyGatheringTarget, getEnergyFromTarget)
        else
            console.log("ERROR: Energy gathering target is undefined")
    }
}

module.exports = EnergyGatherer