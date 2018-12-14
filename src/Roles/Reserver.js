const RoleFunctions = require('RoleFunctions')


const Reserver =
{
    run: creep =>
    {
        if(Game.rooms[creep.memory.workRoom] == undefined)
        {
            const route = Game.map.findRoute(creep.room, creep.memory.workRoom)
            creep.moveTo(creep.pos.findClosestByPath(route[0].exit))
        }
        else
        {
            creep.reserveController(Game.rooms[creep.memory.workRoom].controller)
            RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
        }
    }
}

module.exports = Reserver