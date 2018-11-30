const RoleFunctions = require('RoleFunctions');

const MaintainerRestPos = new RoomPosition(47, 11, "W32S11")

const RoleStructureMaintainer = {
    run: function(creep) {
        RoleFunctions.moveCreepToTarget(creep, MaintainerRestPos)
	}
};

module.exports = RoleStructureMaintainer;