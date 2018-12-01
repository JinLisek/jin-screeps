const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')
const EnergyGatherer = require('EnergyGatherer')



const RoleSlave = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
			EnergyGatherer.gatherEnergy(creep) :
            EnergyStorer.storeEnergyInStructures(creep);
	}
};

module.exports = RoleSlave;