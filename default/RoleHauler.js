const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')
const EnergyGatherer = require('EnergyGatherer')





const RoleHauler = {
    run: function(creep) {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'
        
        if(creep.memory.homeRoom == undefined)
            creep.memory.homeRoom = 'W32S11'
        
        if(creep.room.name == creep.memory.workRoom)
        {
            RoleFunctions.canCreepCarryMore(creep) ?
                EnergyGatherer.gatherEnergy(creep) :
                RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.homeRoom].controller)

        }
        else
        {
            creep.carry.energy > 0 ?
                EnergyStorer.storeEnergyInStructures(creep) :
                RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)    
        }
	}
};

module.exports = RoleHauler;