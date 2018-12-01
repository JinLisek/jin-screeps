const RoleFunctions = require('RoleFunctions')

const SlaveRestPos = new RoomPosition(37, 3, "W32S11")

const canStructureBeFilledWithEnergy = struct => isStructureEnergyBased(struct) && hasStructureEnergySpace(struct)

const isStructureEnergyBased = struct =>
	struct.structureType == STRUCTURE_EXTENSION ||
	struct.structureType == STRUCTURE_SPAWN ||
    struct.structureType == STRUCTURE_TOWER

const hasStructureEnergySpace = struct => struct.energy < struct.energyCapacity

const transferEnergy = (creep, target) =>
{
    const transferResult = creep.transfer(target, RESOURCE_ENERGY)
    transferResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, target) :
        RoleFunctions.ifNotZero(transferResult, console.log, "ERROR: creep.transfer: " + transferResult)
}

const storeEnergy = creep =>
{
	const target = creep.room.find(
		FIND_STRUCTURES, 
		{filter: struct => struct.structureType == STRUCTURE_STORAGE && hasStructureEnergySpace(struct)})[0];
	
    target == undefined ?
        RoleFunctions.moveCreepToTarget(creep, SlaveRestPos) :
        transferEnergy(creep, target)
}

const SlaveHelper =
{
    storeEnergyInStructures: creep => 
    {
        const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: canStructureBeFilledWithEnergy});
        target == undefined ?
            storeEnergy(creep) :
            transferEnergy(creep, target)
    }
}

module.exports = SlaveHelper