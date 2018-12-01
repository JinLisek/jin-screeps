const minerSettings = { body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], preferredNum: 2 }
const slaveSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 3 }
const priestSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const structureMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 4 }
const wallMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 4 }
const reserverSettings = { body: [CLAIM, MOVE], preferredNum: 2 }
const roleLongMinerSettings = { body: [WORK, WORK, MOVE, MOVE], preferredNum: 2 }
const roleLongSlaveSettings = { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], preferredNum: 3 }

const roleSettingsMap = new Map([
    ['Slave', slaveSettings],
    ['Miner', minerSettings],
    ['Priest', priestSettings],
    ['LongMiner', roleLongMinerSettings],
    ['LongSlave', roleLongSlaveSettings],
    ['Architect', architectSettings],
    ['StructureMaintainer', structureMaintainerSettings],
    ['WallMaintainer', wallMaintainerSettings],
    ['Reserver', reserverSettings]
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
        for(const spawnName in Game.spawns)
        {
            const spawn = Game.spawns[spawnName]

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
    }

};

module.exports = SpawnManager;