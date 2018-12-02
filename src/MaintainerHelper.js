const RoleFunctions = require('RoleFunctions')

const isStructDamagedFortification = (structureType, percent) => struct =>
    MaintainerHelper.isStructMine(struct) &&
    struct.structureType == structureType && 
    hasLessHitsThanPercent(percent)(struct)

const hasLessHitsThanPercent = percent => struct => struct.hits / struct.hitsMax < percent

const findFortificationWithLowestHits = (creep, iteration, percent, depth) =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => MaintainerHelper.isFortificationDamaged(percent)(struct) })
    
    const newPercent = percent + iteration
    const newDepth = depth + 1

    if(depth >= 20)
    {
        console.log("MAXIMUM DEPTH REACHED at: " + creep.pos)
        return creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => MaintainerHelper.isFortificationDamaged(100)(struct) })
    }

    creep.memory.structurePercentHealth = percent

    return target == undefined ?
        findFortificationWithLowestHits(creep, iteration, newPercent, newDepth ) :
        target
}

const creepRepairTarget = (creep, target) => creep.repair(target)

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(31, 18, 'W32S11'))
}


const MaintainerHelper = {
    isStructMine: struct => (struct.room.controller.reservation != undefined && struct.room.controller.reservation.username == ' JinLisek') || (struct.room.controller.owner != undefined && struct.room.controller.owner.username == 'JinLisek'),
    isRepairing: creep => creep.memory.isRepairing,
    shouldRepair: creep => (MaintainerHelper.isRepairing(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity,
    findFortificationWithLowestHitsWrapper: creep => findFortificationWithLowestHits(creep, 0.0003, 0.0003, 0),
    isFortificationDamaged: percent => struct =>
        isStructDamagedFortification(STRUCTURE_RAMPART, percent * 100)(struct) ||
        isStructDamagedFortification(STRUCTURE_WALL, percent)(struct),

    moveToTargetAndRepairIt: (creep, target) => RoleFunctions.moveCreepToTargetThenDoAction(creep, target, creepRepairTarget, restIfTargetNotFound)
};

module.exports = MaintainerHelper;