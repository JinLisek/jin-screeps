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
    const homeRoom = Game.rooms[creep.memory.homeRoom]
    const spawn = homeRoom.find(FIND_STRUCTURES, { filter: struct => canSpawnBeFilledWithEnergy(struct) })[0]

    if(spawn != undefined)
        return spawn
    
    const tower = homeRoom.find(FIND_STRUCTURES, { filter: struct => canTowerBeFilledWithEnergy(struct) })[0]

    if(tower != undefined)
        return tower
    
    return homeRoom.find(
        FIND_STRUCTURES,
        {filter: struct => canStorageBeFilledWithEnergy(struct)})[0]
}

const storeEnergyInTarget = (creep, target) =>
{
    creep.transfer(target, RESOURCE_ENERGY)
    creep.memory.targetId = undefined
}

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(40, 7, 'W32S11'))
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

        RoleFunctions.moveCreepToTargetThenDoAction(creep, energyStoringTarget, storeEnergyInTarget, restIfTargetNotFound)
    }
}

module.exports = EnergyStorer