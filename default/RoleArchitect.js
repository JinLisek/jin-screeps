const RoleFunctions = require('RoleFunctions');

const buildConstruction = creep =>
{
    const target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

    if(target == undefined)
        RoleFunctions.moveCreepToTarget(creep, ArchitectRestPos);
    else if(creep.build(target) == ERR_NOT_IN_RANGE)
            RoleFunctions.moveCreepToTarget(creep, target);      
}

const isBuilding = creep => creep.memory.building

const shouldBuild = creep => (isBuilding(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity

const ArchitectRestPos = new RoomPosition(40, 15, "W32S11")






const RoleArchitect = {
    run: function(creep) {
	    creep.memory.building = shouldBuild(creep)

	    isBuilding(creep) ?
            buildConstruction(creep) :
            RoleFunctions.gatherEnergy(creep)
	}
};

module.exports = RoleArchitect;