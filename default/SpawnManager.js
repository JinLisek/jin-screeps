var PREFERRED_NUM_OF_PEONS = 3;
var PREFERRED_NUM_OF_PRIESTS = 8;
var PREFERRED_NUM_OF_ARCHITECTS = 4;

let peonSettings = { body: [WORK, WORK, CARRY, MOVE], preferredNum: 3 }
let priestSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 8 }
let architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }

let roleSettingsMap = new Map([
    ['Peon', peonSettings],
    ['Priest', priestSettings],
    ['Architect', architectSettings]
]);

function spawnRole(role, preferredNumOfRole)
{
    var newName = role + ' ' + Game.time;
        
    if(Game.spawns['Byzantium'].spawnCreep(roleSettingsMap.get(role).body, newName, {memory: {role: role}}) >= 0)
    console.log('Spawning new ' + role + ': ' + newName);
    
    if(Game.spawns['Byzantium'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Byzantium'].spawning.name];
        Game.spawns['Byzantium'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Byzantium'].pos.x + 1, 
            Game.spawns['Byzantium'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}

const SpawnManager = {
    
    run: function()
    {
        const roles = roleSettingsMap.keys()
        for(const role of roles)
        {
            const creepsWithGivenRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            if(creepsWithGivenRole.length >= roleSettingsMap.get(role).preferredNum)
                break
            spawnRole(role);
        }
    }

};

module.exports = SpawnManager;