const RoleFunctions = require('RoleFunctions')


const Reserver =
{
    run: creep =>
    {
        creep.reserveController(Game.rooms[creep.memory.workRoom].controller)
        RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
    }
}

module.exports = Reserver