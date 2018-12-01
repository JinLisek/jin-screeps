const RoleFunctions = require('RoleFunctions')

const SlaveRestPos = new RoomPosition(37, 3, "W32S11")

const hasStructureEnergySpace = struct => struct.energy < struct.energyCapacity

const isStructureEnergyBased = struct =>
	struct.structureType == STRUCTURE_EXTENSION ||
	struct.structureType == STRUCTURE_SPAWN ||
	struct.structureType == STRUCTURE_TOWER

const canStructureBeFilledWithEnergy = struct => isStructureEnergyBased(struct) && hasStructureEnergySpace(struct)

const transferEnergy = (creep, target) =>
{
    const transferResult = creep.transfer(target, RESOURCE_ENERGY)
    transferResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, target) :
        RoleFunctions.ifNotZero(transferResult, console.log, "ERROR: creep.transfer: " + transferResult)
}

const transferEnergyOrRest= (creep, restPos) => 
{
	const targets = creep.room.find(FIND_STRUCTURES, {filter: canStructureBeFilledWithEnergy});
	targets.length > 0 ? transferEnergy(creep, targets[0]) : RoleFunctions.moveCreepToTarget(creep, restPos);
}





const RoleSlave = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
			RoleFunctions.gatherEnergy(creep) :
            transferEnergyOrRest(creep, SlaveRestPos);
	}
};

module.exports = RoleSlave;