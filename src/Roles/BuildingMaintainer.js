const RoleFunctions = require('RoleFunctions')
const MaintainerHelper = require('MaintainerHelper')
const EnergyGatherer = require('EnergyGatherer')

const isStructDamaged = struct => struct.hits < struct.hitsMax
const isStructMineAndDamaged = struct => isStructDamaged(struct) && MaintainerHelper.isStructMine(struct)
const isStructCivil = struct => struct.structureType != STRUCTURE_RAMPART && struct.structureType != STRUCTURE_WALL
const isBuildingMineAndDamaged = struct => isStructMineAndDamaged(struct) && isStructCivil(struct)

const isStructureDamaged = creep => struct =>
    isBuildingMineAndDamaged(struct) ||
    MaintainerHelper.isFortificationDamaged(creep.memory.structurePercentHealth)(struct)

const isStructInWorkRoom = creep => struct => struct.room.name == creep.memory.workRoom

const findBuildingOrFortificationToRepair = creep => creep.pos.findClosestByPath(
        FIND_STRUCTURES,
        {filter: struct => isStructureDamaged(creep)(struct) && isStructInWorkRoom(creep)(struct) })

const repairBuilding = creep =>
{
    if(creep.room.name == creep.memory.workRoom)
    {
        creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(creep, findBuildingOrFortificationToRepair, isStructureDamaged(creep))
        const damagedStructure = Game.getObjectById(creep.memory.targetId)
        MaintainerHelper.moveToTargetAndRepairIt(creep, damagedStructure)
    }
    else
    {
        creep.moveTo(Game.rooms[creep.memory.workRoom].controller)
    }
}






const BuildingMaintainer =
{
    run: creep =>
    {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
                repairBuilding(creep) :
                EnergyGatherer.gatherEnergy(creep)

	}
}

module.exports = BuildingMaintainer