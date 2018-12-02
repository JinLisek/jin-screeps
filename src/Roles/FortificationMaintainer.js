const MaintainerHelper = require('MaintainerHelper')
const EnergyGatherer = require('EnergyGatherer')





const FortificationMaintainer =
{
    run: creep =>
    {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            MaintainerHelper.repairFortifications(creep) :
            EnergyGatherer.gatherEnergy(creep)
	}
}

module.exports = FortificationMaintainer