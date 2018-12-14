const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')
const EnergyGatherer = require('EnergyGatherer')





const Hauler =
{
    run: creep =>
    {
        if(creep.room.name == creep.memory.workRoom)
        {
            RoleFunctions.canCreepCarryMore(creep) ?
                EnergyGatherer.gatherEnergy(creep) :
                RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.homeRoom].controller)

        }
        else if(Game.rooms[creep.memory.workRoom] != undefined)
        {
            creep.carry.energy > 0 ?
                EnergyStorer.storeEnergyInStructures(creep) :
                RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)    
        }
        else
        {
            RoleFunctions.moveCreepToTarget(creep, new RoomPosition(25, 25, creep.room.name))
        }
	}
}

module.exports = Hauler