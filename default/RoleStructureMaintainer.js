const RoleFunctions = require('RoleFunctions');

const isStructDamaged = struct => struct.hits < struct.hitsMax
const isStructMine = struct => struct.room.controller.owner.username == 'JinLisek'
const isStructMineAndDamaged = struct => isStructDamaged(struct) && isStructMine(struct)

const isStructFortification = struct => struct.structureType == STRUCTURE_WALL || struct.structureType == STRUCTURE_RAMPART

const isBuildingMineAndDamaged = struct => isStructMineAndDamaged(struct) && isStructFortification(struct) == false

const isFortificationMineAndDamaged = struct => isStructMineAndDamaged(struct) && isStructFortification(struct)

const hasLessHitsThanPercent = percent => struct => struct.hits / struct.hitsMax < percent

const findFortificationWithLowestHits = (creep, iteration, percent) =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: isFortificationMineAndDamaged && hasLessHitsThanPercent(percent)})
    const newPercent = percent + iteration

    return target == undefined ?
        findFortificationWithLowestHits(creep, iteration, newPercent ) :
        target
}

const repairFortifications = creep => 
{
    const target = findFortificationWithLowestHits(creep, 0.00001, 0.00001)

    if(target != undefined)
    {
        RoleFunctions.moveCreepToTarget(creep, target)
        creep.repair(target)
    }
    else
        RoleFunctions.moveCreepToTarget(creep, MaintainerRestPos)  
}

const repairStructure = creep =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: isBuildingMineAndDamaged})

    if(target == undefined)
        repairFortifications(creep)
    else if(creep.repair(target) == ERR_NOT_IN_RANGE)
        RoleFunctions.moveCreepToTarget(creep, target)  
}

const isRepairing = creep => creep.memory.isRepairing

const shouldRepair = creep => (isRepairing(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity

const MaintainerRestPos = new RoomPosition(47, 11, "W32S11")






const RoleStructureMaintainer = {
    run: function(creep) {
        creep.memory.isRepairing = shouldRepair(creep)

        isRepairing(creep) ?
            repairStructure(creep) :
            RoleFunctions.gatherEnergy(creep)
	}
};

module.exports = RoleStructureMaintainer;