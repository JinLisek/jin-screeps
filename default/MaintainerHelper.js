const RoleFunctions = require('RoleFunctions')

const isFortificationMineAndDamaged = struct => MaintainerHelper.isStructMine(struct) && MaintainerHelper.isStructFortification(struct)

const hasLessHitsThanPercent = percent => struct => struct.hits / struct.hitsMax < percent

const findFortificationWithLowestHits = (creep, iteration, percent) =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => isFortificationMineAndDamaged(struct) && hasLessHitsThanPercent(percent)(struct)})
    const newPercent = percent + iteration

    return target == undefined ?
        findFortificationWithLowestHits(creep, iteration, newPercent ) :
        target
}

const MaintainerRestPos = new RoomPosition(29, 11, "W32S11")




const MaintainerHelper = {
    isStructMine: struct => struct.room.controller.owner.username == 'JinLisek',
    isStructFortification: struct => struct.structureType == STRUCTURE_RAMPART || struct.structureType == STRUCTURE_WALL,
    isRepairing: creep => creep.memory.isRepairing,
    shouldRepair: creep => (MaintainerHelper.isRepairing(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity,

    repairFortifications: creep => 
    {
        const target = findFortificationWithLowestHits(creep, 0.000001, 0.000001)

        if(target != undefined)
        {
            RoleFunctions.moveCreepToTarget(creep, target)
            creep.repair(target)
        }
        else
            RoleFunctions.moveCreepToTarget(creep, MaintainerRestPos)  
    }
};

module.exports = MaintainerHelper;