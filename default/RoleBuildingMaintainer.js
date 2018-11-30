const RoleFunctions = require('RoleFunctions')
const MaintainerHelper = require('MaintainerHelper')

const isStructDamaged = struct => struct.hits < struct.hitsMax
const isStructMineAndDamaged = struct => isStructDamaged(struct) && MaintainerHelper.isStructMine(struct)

const isBuildingMineAndDamaged = struct => isStructMineAndDamaged(struct) && MaintainerHelper.isStructFortification(struct) == false

const repairBuilding = creep =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: isBuildingMineAndDamaged})

    if(target == undefined)
        MaintainerHelper.repairFortifications(creep)
    else if(creep.repair(target) == ERR_NOT_IN_RANGE)
        RoleFunctions.moveCreepToTarget(creep, target)  
}






const RoleBuildingMaintainer = {
    run: function(creep) {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            repairBuilding(creep) :
            RoleFunctions.gatherEnergy(creep)
	}
};

module.exports = RoleBuildingMaintainer;