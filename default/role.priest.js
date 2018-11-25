const RoleFunctions = require('RoleFunctions');

const rolePriest = {

    /** @param {Creep} creep **/
    run: function(creep) {
		creep.memory.upgrading = RoleFunctions.calculateUpgradingState(creep, 0.33)
	    RoleFunctions.upgradeOrHarvest(creep)
	}
};

module.exports = rolePriest;