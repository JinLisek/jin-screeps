const RoleFunctions = require('RoleFunctions');

const buildConstruction = creep =>
{
    const target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

    if(target == undefined)
        RoleFunctions.moveCreepToTarget(creep, ArchitectRestPos);
    else
    {
        const closestSource = RoleFunctions.findClosestActiveSource(creep);
        if(creep.pos.getRangeTo(closestSource) < 3)
            RoleFunctions.moveCreepToTarget(creep, ArchitectRestPos);
        else if(creep.build(target) == ERR_NOT_IN_RANGE)
            RoleFunctions.moveCreepToTarget(creep, target);
    }        
}

const isBuilding = creep => creep.memory.building

const shouldBuild = (creep, percent) => RoleFunctions.isFullInPercent(creep, percent) || (isBuilding(creep) && creep.carry.energy > 0)

const ArchitectRestPos = new RoomPosition(40, 15, "W32S11")






const RoleArchitect = {
    run: function(creep) {
	    creep.memory.building = shouldBuild(creep, 0.33)

	    isBuilding(creep) ?
            buildConstruction(creep) :
            RoleFunctions.harvestIfPossible(creep, RoleFunctions.findClosestActiveSource)
	}
};

module.exports = RoleArchitect;