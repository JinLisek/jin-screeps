const RoleFunctions = require('RoleFunctions');

const isUpgrading = (creep) => creep.memory.upgrading

const rolePriest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(isUpgrading(creep) && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!isUpgrading(creep) && creep.carry.energy > creep.carryCapacity / 3) {
	        creep.memory.upgrading = true;
	    }

	    RoleFunctions.upgradeOrHarvest(creep, isUpgrading)
	}
};

module.exports = rolePriest;