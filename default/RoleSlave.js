const RoleFunctions = require('RoleFunctions')

const SlaveRestPos = new RoomPosition(37, 3, "W32S11")

const hasStructureEnergySpace = struct => struct.energy < struct.energyCapacity

const isStructureEnergyBased = struct =>
	struct.structureType == STRUCTURE_EXTENSION ||
	struct.structureType == STRUCTURE_SPAWN ||
	struct.structureType == STRUCTURE_TOWER

const canStructureBeFilledWithEnergy = struct => isStructureEnergyBased(struct) && hasStructureEnergySpace(struct)







const RoleSlave = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
		RoleFunctions.gatherEnergy(creep) :
            RoleFunctions.transferEnergyOrRest(creep, canStructureBeFilledWithEnergy, SlaveRestPos);
	}
};

module.exports = RoleSlave;