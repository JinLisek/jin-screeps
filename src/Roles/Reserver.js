const RoleFunctions = require('RoleFunctions')


const Reserver =
{
    run: creep =>
    {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'

        creep.reserveController(Game.rooms[creep.memory.workRoom].controller)
        RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
    }
}

module.exports = Reserver