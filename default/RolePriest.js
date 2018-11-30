const RoleFunctions = require('RoleFunctions');

const upgradeController = (creep) =>
{
	const controller = creep.room.controller
	const upgradeResult = creep.upgradeController(controller)

	upgradeResult == ERR_NOT_IN_RANGE ?
		RoleFunctions.moveCreepToTarget(creep, controller) :
		RoleFunctions.ifNotZero(upgradeResult, console.log, "ERROR: creep.upgradeController: " + upgradeResult + ", position: " + controller)
}

const isUpgrading = (creep) => creep.memory.upgrading

const shouldUpgrade = (creep, percent) =>
{
	return RoleFunctions.isFullInPercent(creep, percent) || (isUpgrading(creep) && creep.carry.energy > 0)
}





const RolePriest = {
    run: function(creep) {
		creep.memory.upgrading = shouldUpgrade(creep, 0.33)

	    isUpgrading(creep) ?
			upgradeController(creep) :
			RoleFunctions.harvestIfPossible(creep, RoleFunctions.findClosestActiveSource)
	}
};

module.exports = RolePriest;