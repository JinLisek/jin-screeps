const minerSettings = { body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], preferredNum: 4 }
const slaveSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const priestSettings = { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], preferredNum: 4 }
const architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const buildingMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 6 }
const fortificationMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 4 }
const reserverSettings = { body: [CLAIM, MOVE], preferredNum: 2 }
const roleHaulerSettings = { body: [CARRY, CARRY, MOVE, MOVE], preferredNum: 4 }

const roleSettingsMap = new Map([
    ['Slave', slaveSettings],
    ['Miner', minerSettings],
    ['Priest', priestSettings],
    ['Hauler', roleHaulerSettings],
    ['Architect', architectSettings],
    ['BuildingMaintainer', buildingMaintainerSettings],
    ['FortificationMaintainer', fortificationMaintainerSettings],
    ['Reserver', reserverSettings]
]);

const spawnRole = (spawn, role) =>
{
    const creepName = role + ' ' + Game.time;

    if(spawn.spawnCreep(roleSettingsMap.get(role).body, creepName, {memory: {role: role, homeRoom: spawn.room.name, workRoom: 'W33S11'}}) >= 0)
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
                    spawnRole(spawn, role);
                    break
                }
            }
        }
    }

};

module.exports = SpawnManager;