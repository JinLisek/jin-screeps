const MaintainerHelper = require('MaintainerHelper')
const EnergyGatherer = require('EnergyGatherer')
const RoleFunctions = require('RoleFunctions')

const repairFortifications = creep => 
{
    creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(
        creep,
        MaintainerHelper.findFortificationWithLowestHitsWrapper,
        MaintainerHelper.isFortificationDamaged(creep.memory.structurePercentHealth))

    const damagedStructure = Game.getObjectById(creep.memory.targetId)
    MaintainerHelper.moveToTargetAndRepairIt(creep, damagedStructure)
}



const FortificationMaintainer =
{
    run: creep =>
    {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            repairFortifications(creep) :
            EnergyGatherer.gatherEnergy(creep)
	}
}

module.exports = FortificationMaintainer