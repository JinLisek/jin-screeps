const RoleFunctions = require('RoleFunctions')

const PeonRestPos = new RoomPosition(37, 3, "W32S11")

const RolePeon = {
    run: function(creep) {
	    RoleFunctions.canCreepCarryMore(creep) ?
	        RoleFunctions.harvestIfPossible(creep, RoleFunctions.findClosestActiveSource) :
            RoleFunctions.transferEnergyOrRest(creep, RoleFunctions.canStructureBeFilledWithEnergy, PeonRestPos);
	}
};

module.exports = RolePeon;