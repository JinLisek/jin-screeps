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
        const shouldCreepRepair = MaintainerHelper.shouldRepair(creep)

        if(shouldCreepRepair != creep.memory.isRepairing)
        {
            creep.memory.isRepairing = shouldCreepRepair
            creep.memory.targetId = undefined
        }

        MaintainerHelper.isRepairing(creep) ?
            repairFortifications(creep) :
            EnergyGatherer.gatherEnergy(creep)
	}
}

module.exports = FortificationMaintainer