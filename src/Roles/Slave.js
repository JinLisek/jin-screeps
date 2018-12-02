const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')
const EnergyGatherer = require('EnergyGatherer')



const Slave =
{
	run: creep =>
	{
	    RoleFunctions.canCreepCarryMore(creep) ?
			EnergyGatherer.gatherEnergy(creep) :
            EnergyStorer.storeEnergyInStructures(creep);
	}
}

module.exports = Slave