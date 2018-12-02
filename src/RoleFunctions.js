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

    getTargeIdtIfNoLongerValid: (creep, predIfTargetValid, targetFinder) =>
    {
        const target = (Game.getObjectById(creep.memory.targetId))

        return target == undefined || predIfTargetValid(target) == false ?
            targetFinder(creep).id :
            creep.memory.targetId
    },

    moveCreepToTargetThenDoAction: (creep, target, action) =>
    {
        RoleFunctions.moveCreepToTarget(creep, target)
        if(creep.pos.isNearTo(target))
            action(creep, target)
    }
}

module.exports = RoleFunctions;