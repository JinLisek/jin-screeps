const RoleFunctions = require('RoleFunctions')

const isSpawn = struct => struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_EXTENSION

const hasEnergySpace = struct => struct.energy < struct.energyCapacity

const canSpawnBeFilledWithEnergy = struct =>
    isSpawn(struct) && hasEnergySpace(struct)

const canStorageBeFilledWithEnergy = struct =>
    struct.structureType == STRUCTURE_STORAGE && struct.store[RESOURCE_ENERGY] < struct.storeCapacity

const canTowerBeFilledWithEnergy = struct =>
    struct.structureType == STRUCTURE_TOWER && hasEnergySpace(struct)

const canStructureBeFilledWithEnergy = struct =>
    canSpawnBeFilledWithEnergy(struct) || canStorageBeFilledWithEnergy(struct) || canTowerBeFilledWithEnergy(struct)

const findStructureToBeFilledWithEnergy = creep =>
{
    const spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: struct => canSpawnBeFilledWithEnergy(struct) })

    if(spawn != undefined)
        return spawn
    
    const tower = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: struct => canTowerBeFilledWithEnergy(struct) })

    if(tower != undefined)
        return tower
    
    return creep.room.find(
        FIND_STRUCTURES,
        {filter: struct => canStorageBeFilledWithEnergy(struct)})[0]
}

const storeEnergyInTarget = (creep, target) =>
{
    creep.transfer(target, RESOURCE_ENERGY)
    creep.memory.targetId = undefined
}





const EnergyStorer =
{
    storeEnergyInStructures: creep => 
    {
        creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(
            creep,
            findStructureToBeFilledWithEnergy,
            canStructureBeFilledWithEnergy)

        const energyStoringTarget = Game.getObjectById(creep.memory.targetId)

        RoleFunctions.moveCreepToTargetThenDoAction(creep, energyStoringTarget, storeEnergyInTarget)
    }
}

module.exports = EnergyStorer