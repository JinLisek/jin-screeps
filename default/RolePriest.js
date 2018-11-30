const RoleFunctions = require('RoleFunctions');

const RolePriest = {
    run: function(creep) {
		creep.memory.upgrading = RoleFunctions.calculateUpgradingState(creep, 0.33)
	    RoleFunctions.upgradeOrHarvest(creep)
	}
};

module.exports = RolePriest;