const RoleFunctions =
{
    ifNotZero: (val, func, param) => val == 0 ? null : func(param),

    moveCreepToTarget: (creep, target) => creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}}),

    findClosestActiveSource: (creep) => creep.pos.findClosestByPath(
        FIND_SOURCES_ACTIVE,
        {filter: source => source.room.controller.owner.username == 'JinLisek'}
    ),

    isFullInPercent: (creep, percent) => creep.carry.energy / creep.carryCapacity >= percent,
    
    canCreepCarryMore: (creep) => creep.carry.energy < creep.carryCapacity,

    findTargeIdtIfNoLongerValid: (creep, targetFinder, predIfTargetValid) =>
    {
        const target = (Game.getObjectById(creep.memory.targetId))

        if(target == undefined || predIfTargetValid(target) == false)
        {
            const newTarget = targetFinder(creep)
            if(newTarget != undefined)
                return newTarget.id
            else
            {
                console.log("NEW TARGET IS UNDEFINED")
            }
        }
        else
        {
            return creep.memory.targetId
        }
    },

    moveCreepToTargetThenDoAction: (creep, target, action) =>
    {
        if(target == undefined)
            console.log("ERROR: Trying to move to undefined target")
        else
        {
            RoleFunctions.moveCreepToTarget(creep, target)
            if(creep.pos.isNearTo(target))
                action(creep, target)
        }
    }
}

module.exports = RoleFunctions;