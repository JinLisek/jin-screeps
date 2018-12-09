

const Tower =
{
    run: function()
    {
        const towers = Game.spawns['Byzantium'].room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER })
        for(tower of towers)
        {
            const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
            tower.attack(target)
        }
    }
}

module.exports = Tower