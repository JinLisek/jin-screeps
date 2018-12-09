const RoleFunctions = require('RoleFunctions')


const Reserver =
{
    run: creep =>
    {
        // if(creep.memory.workRoom != 'W33S12')
        //     creep.memory.workRoom = 'W33S12'

        if(Game.rooms[creep.memory.workRoom] != undefined && creep.room.name == creep.memory.workRoom)
        {
            creep.claimController(Game.rooms[creep.memory.workRoom].controller)
            RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
        }
        else
        {
            const route = Game.map.findRoute(creep.room, creep.memory.workRoom)
            creep.moveTo(creep.pos.findClosestByPath(route[0].exit))
        }
    }
}

module.exports = Reserver