const minerSettings = { body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], preferredNum: 4 }
const slaveSettings = { body: [CARRY, CARRY, MOVE], preferredNum: 4 }
const priestSettings = { body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], preferredNum: 4 }
const architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const buildingMaintainerSettings = { body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 10 }
const fortificationMaintainerSettings = { body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 2 }
const reserverSettings = { body: [CLAIM, MOVE], preferredNum: 2 }
const haulerSettings = { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], preferredNum: 7 }
const phalanxSettings = { body: [ATTACK, MOVE], preferredNum: 1 }

const roleSettingsMap = new Map([
    ['Slave', slaveSettings],
    ['Miner', minerSettings],
    ['Priest', priestSettings],
    ['Hauler', haulerSettings],
    ['Architect', architectSettings],
    ['BuildingMaintainer', buildingMaintainerSettings],
    ['FortificationMaintainer', fortificationMaintainerSettings],
    ['Reserver', reserverSettings],
    ['Phalanx', phalanxSettings]
]);

const spawnRole = (spawn, role) =>
{
    const creepName = role + ' ' + Game.time;

    const homeRoom = spawn.room.name
    var workRoom = 'W33S11'

    if(role == 'BuildingMaintainer' && spawn.room.find(FIND_MY_CREEPS, { filter: c => c.memory.role == 'BuildingMaintainer'}).length < 5)
    {
        workRoom = homeRoom
    }

    if(role == 'Phalanx')
        workRoom = 'W33S12'

    if(spawn.spawnCreep(roleSettingsMap.get(role).body, creepName, {memory: {role: role, homeRoom: homeRoom, workRoom: workRoom, wait: true}}) >= 0)
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