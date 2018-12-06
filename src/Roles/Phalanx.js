const RoleFunctions = require('RoleFunctions')

const findEnemy = creep =>
{
    const enemyTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER})

    if(enemyTower != undefined)
        return enemyTower
    
    const enemyCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)

    if(enemyCreep != undefined)
        return enemyCreep
    
    const enemyStruct = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)

    return enemyStruct
}

const creepAttackTarget = (creep, target) => creep.attack(target)

const Phalanx = 
{
    run: creep =>
    {
        if(creep.room.name == creep.memory.workRoom)
        {
            creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(creep, findEnemy)
            const enemy = Game.getObjectById(creep.memory.targetId)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, enemy, creepAttackTarget)
        }
        else
        {
            if(creep.room.name == creep.memory.homeRoom)
                creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_BOTTOM))
            else
                creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_LEFT))
        }   
    }
}

module.exports = Phalanx