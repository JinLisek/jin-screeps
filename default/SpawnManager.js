const peonSettings = { body: [WORK, WORK, CARRY, MOVE], preferredNum: 3 }
const priestSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 5 }
const architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }

const roleSettingsMap = new Map([
    ['Peon', peonSettings],
    ['Priest', priestSettings],
    ['Architect', architectSettings]
]);

function spawnRole(role)
{
    const creepName = role + ' ' + Game.time;
        
    if(Game.spawns['Byzantium'].spawnCreep(roleSettingsMap.get(role).body, creepName, {memory: {role: role}}) >= 0)
        console.log('Spawning new ' + role + ': ' + creepName);
    
    if(Game.spawns['Byzantium'].spawning) { 
        const spawningCreep = Game.creeps[Game.spawns['Byzantium'].spawning.name];
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
            const numOfCreepsWithRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            if(numOfCreepsWithRole.length < roleSettingsMap.get(role).preferredNum)
            {
                spawnRole(role);
                break
            }
        }
    }

};

module.exports = SpawnManager;