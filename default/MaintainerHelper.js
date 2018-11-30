const RoleFunctions = require('RoleFunctions')

const isStructDamagedFortification = (structureType, percent) => struct =>
    MaintainerHelper.isStructMine(struct) &&
    struct.structureType == structureType && 
    hasLessHitsThanPercent(percent)(struct)

const hasLessHitsThanPercent = percent => struct => struct.hits / struct.hitsMax < percent

const findFortificationWithLowestHits2 = (creep, iteration, percent) =>
{
    const fortificationsBuckets = new Map()
}

const findFortificationWithLowestHits = (creep, iteration, percent) =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct =>
        isStructDamagedFortification(STRUCTURE_RAMPART, percent * 10)(struct) || isStructDamagedFortification(STRUCTURE_WALL, percent)(struct)})
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
        const target = findFortificationWithLowestHits(creep, 0.0001, 0.0001)

        if(target != undefined)
        {
            if(creep.repair(target) == ERR_NOT_IN_RANGE)
                RoleFunctions.moveCreepToTarget(creep, target);
        }
        else
            RoleFunctions.moveCreepToTarget(creep, MaintainerRestPos)  
    }
};

module.exports = MaintainerHelper;