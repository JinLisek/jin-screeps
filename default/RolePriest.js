const RoleFunctions = require('RoleFunctions')
const EnergyGatherer = require('EnergyGatherer')

const upgradeController = creep =>
{
	const controller = creep.room.controller
	const upgradeResult = creep.upgradeController(controller)

	upgradeResult == ERR_NOT_IN_RANGE ?
		RoleFunctions.moveCreepToTarget(creep, controller) :
		RoleFunctions.ifNotZero(upgradeResult, console.log, "ERROR: creep.upgradeController: " + upgradeResult + ", position: " + creep.pos)
}

const isUpgrading = creep => creep.memory.upgrading

const shouldUpgrade = creep => (isUpgrading(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity





const RolePriest = {
    run: function(creep) {
		creep.memory.upgrading = shouldUpgrade(creep)

	    isUpgrading(creep) ?
			upgradeController(creep) :
			EnergyGatherer.gatherEnergy(creep)
	}
};

module.exports = RolePriest;