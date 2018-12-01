const RoleFunctions = require('RoleFunctions')
const SlaveHelper = require('SlaveHelper')



const RoleSlave = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
			RoleFunctions.gatherEnergy(creep) :
            SlaveHelper.storeEnergyInStructures(creep);
	}
};

module.exports = RoleSlave;