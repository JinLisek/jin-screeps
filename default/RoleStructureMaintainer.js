const RoleFunctions = require('RoleFunctions');

const isStructMineAndDamaged = struct => 
    struct.hits < struct.hitsMax && 
    struct.structureType != STRUCTURE_WALL &&
    struct.room.controller.owner.username == "JinLisek" 

const repairStructure = creep =>
{
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: isStructMineAndDamaged})

    if(target == undefined)
        RoleFunctions.moveCreepToTarget(creep, MaintainerRestPos)
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