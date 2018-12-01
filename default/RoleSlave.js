const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')



const RoleSlave = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
			RoleFunctions.gatherEnergy(creep) :
            EnergyStorer.storeEnergyInStructures(creep);
	}
};

module.exports = RoleSlave;