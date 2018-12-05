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
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(31, 18, creep.memory.workRoom))
}


const isRoomOfTargetReservedByMe = target => target.room.controller.reservation != undefined && target.room.controller.reservation.username == 'JinLisek'
const isRoomOfTargetMine = target => target.room.controller.owner != undefined && target.room.controller.owner.username == 'JinLisek'

const MaintainerHelper = {
    isStructMine: struct => isRoomOfTargetReservedByMe(struct) || isRoomOfTargetMine(struct),
    isRepairing: creep => creep.memory.isRepairing,
    shouldRepair: creep => (MaintainerHelper.isRepairing(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity,
    findFortificationWithLowestHitsWrapper: creep => findFortificationWithLowestHits(creep, 0.0006, 0.0004, 0),
    isFortificationDamaged: percent => struct =>
        isStructDamagedFortification(STRUCTURE_RAMPART, percent * 90)(struct) ||
        isStructDamagedFortification(STRUCTURE_WALL, percent)(struct),

    moveToTargetAndRepairIt: (creep, target) => RoleFunctions.moveCreepToTargetThenDoAction(creep, target, creepRepairTarget, restIfTargetNotFound)
};

module.exports = MaintainerHelper;