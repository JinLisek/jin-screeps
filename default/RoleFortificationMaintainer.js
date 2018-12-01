const MaintainerHelper = require('MaintainerHelper')
const EnergyGatherer = require('EnergyGatherer')





const RoleFortificationMaintainer = {
    run: function(creep) {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            MaintainerHelper.repairFortifications(creep) :
            EnergyGatherer.gatherEnergy(creep)
	}
};

module.exports = RoleFortificationMaintainer;