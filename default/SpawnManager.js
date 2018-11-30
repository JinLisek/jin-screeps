const minerSettings = { body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], preferredNum: 2 }
const slaveSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 2 }
const priestSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 5 }
const architectSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 4 }
const structureMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 2 }
const wallMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 4 }

const roleSettingsMap = new Map([
    ['Miner', minerSettings],
    ['Slave', slaveSettings],
    ['Priest', priestSettings],
    ['Architect', architectSettings],
    ['StructureMaintainer', structureMaintainerSettings],
    ['WallMaintainer', wallMaintainerSettings]
]);

const spawnRole = role =>
{
    const creepName = role + ' ' + Game.time;
    if(Game.spawns['Byzantium'].spawnCreep(roleSettingsMap.get(role).body, creepName, {memory: {role: role}}) >= 0)
        console.log('Spawning new ' + role + ': ' + creepName);
}

const SpawnManager = {
    
    run: function()
    {
        const roles = roleSettingsMap.keys()
        for(const role of roles)
        {
            const numOfCreepsWithRole = _.sum(Game.creeps, creep => creep.memory.role == role);
            if(numOfCreepsWithRole < roleSettingsMap.get(role).preferredNum)
            {
                spawnRole(role);
                break
            }
        }
    }

};

module.exports = SpawnManager;