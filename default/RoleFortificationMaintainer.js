const RoleFunctions = require('RoleFunctions')
const MaintainerHelper = require('MaintainerHelper')





const RoleFortificationMaintainer = {
    run: function(creep) {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            MaintainerHelper.repairFortifications(creep) :
            RoleFunctions.gatherEnergy(creep)
	}
};

module.exports = RoleFortificationMaintainer;