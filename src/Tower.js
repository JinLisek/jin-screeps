

const Tower =
{
    run: function()
    {
        const towers = Game.spawns['Byzantium'].room.find(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER })
        const target = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        towers[0].attack(target)
    }
}

module.exports = Tower