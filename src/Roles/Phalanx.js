const RoleFunctions = require('RoleFunctions')

const findEnemy = creep =>
{
    const enemyTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER})

    if(enemyTower != undefined)
        return enemyTower
    
    const enemyCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)

    if(enemyCreep != undefined)
        return enemyCreep
    
    const enemyStruct = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType != STRUCTURE_CONTROLLER})

    return enemyStruct
}

const creepAttackTarget = (creep, target) => creep.attack(target)

const moveCreepToExit = exit => creep => creep.moveTo(creep.pos.findClosestByPath(exit))



const Phalanx = 
{
    run: creep =>
    {
        creep.memory.targetId = undefined
        if(creep.room.name == creep.memory.workRoom)
        {
            creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(creep, findEnemy)
            const enemy = Game.getObjectById(creep.memory.targetId)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, enemy, creepAttackTarget, moveCreepToExit(FIND_EXIT_RIGHT))
        }
        else if(creep.room.name == 'W32S12')
        {
            creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(creep, findEnemy)
            const enemy = Game.getObjectById(creep.memory.targetId)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, enemy, creepAttackTarget, moveCreepToExit(FIND_EXIT_LEFT))
        }
        else if(creep.room.name == creep.memory.homeRoom)
            moveCreepToExit(FIND_EXIT_BOTTOM)(creep)
    }
}

module.exports = Phalanx