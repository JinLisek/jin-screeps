const RoleFunctions = require('RoleFunctions')

const isStructDamagedFortification = (structureType, percent) => struct =>
    MaintainerHelper.isStructMine(struct) &&
    struct.structureType == structureType && 
    hasLessHitsThanPercent(percent)(struct)

const hasLessHitsThanPercent = percent => struct => struct.hits / struct.hitsMax < percent


const findFortificationWithLowestHits = (creep, iteration, percent, depth) =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct =>
        isStructDamagedFortification(STRUCTURE_RAMPART, percent * 100)(struct) || isStructDamagedFortification(STRUCTURE_WALL, percent)(struct)})
    
    const newPercent = percent + iteration
    const newDepth = depth + 1

    if(depth >= 20)
    {
        console.log("MAXIMUM DEPTH REACHED")
        return undefined
    }
        

    return target == undefined ?
        findFortificationWithLowestHits(creep, iteration, newPercent, newDepth ) :
        target
}

const MaintainerRestPos = new RoomPosition(29, 11, "W32S11")




const MaintainerHelper = {
    isStructMine: struct => (struct.room.controller.reservation != undefined && struct.room.controller.reservation.username == ' JinLisek') || struct.room.controller.owner.username == 'JinLisek',
    isStructFortification: struct => struct.structureType == STRUCTURE_RAMPART || struct.structureType == STRUCTURE_WALL,
    isRepairing: creep => creep.memory.isRepairing,
    shouldRepair: creep => (MaintainerHelper.isRepairing(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity,

    repairFortifications: creep => 
    {
        const target = findFortificationWithLowestHits(creep, 0.0002, 0.0001, 0)

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