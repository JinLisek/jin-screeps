const minerSettings = { body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE] }
const slaveSettings = { body: [CARRY, CARRY, MOVE], preferredNum: 4 }
const priestSettings = { body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], preferredNum: 2 }
const architectSettings = { body: [WORK, CARRY, MOVE, MOVE], preferredNum: 4 }
const buildingMaintainerSettings = { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], preferredNum: 6 }
const fortificationMaintainerSettings = { body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 2 }
const reserverSettings = { body: [CLAIM, MOVE], preferredNum: 2 }
const haulerSettings = { body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], preferredNum: 5 }
const phalanxSettings = { body: [ATTACK, MOVE], preferredNum: 1 }

const roleSettingsMap = new Map([
    ['Slave', slaveSettings],
    ['Miner', minerSettings],
    ['Priest', priestSettings],
    ['Hauler', haulerSettings],
    ['Architect', architectSettings],
    ['BuildingMaintainer', buildingMaintainerSettings],
    ['FortificationMaintainer', fortificationMaintainerSettings],
    ['Reserver', reserverSettings]
]);

const calculateNumOfMinersForVassals = room =>
    _.reduce(
        room.memory.vassals,
        (numOfSources, vassal) => numOfSources + Memory.rooms[vassal].numOfSources ,
        0)

const numOfRequiredMiners = room =>
{
    const numOfMinersForRoom = room.memory.numOfSources

    const numOfMinersForVassals = calculateNumOfMinersForVassals(room)

    const numOfNeededMiners = numOfMinersForRoom + numOfMinersForVassals

    return numOfNeededMiners
}

const numOfRequiredWorkersForRole = (room, role) =>
{
    if(role == "Miner")
        return numOfRequiredMiners(room)

    return 0
}

const calculateMinerBody = room =>
{
    const maxWorkParts = 5
    const availableEnergy = room.energyCapacityAvailable

    var body = []
    var numOfWorkParts = 0
    var energyCost = 0
    var nextBodyPartCost = BODYPART_COST["work"]

    while(energyCost + nextBodyPartCost < availableEnergy && numOfWorkParts < maxWorkParts)
    {
        if(nextBodyPartCost == BODYPART_COST["work"])
        {
            body.push(WORK)
            ++numOfWorkParts
            energyCost += BODYPART_COST["work"]
            if(numOfWorkParts > 0 && numOfWorkParts % 2 != 0)
            {
                nextBodyPartCost = BODYPART_COST["move"]
            }
        }
        else
        {
            body.push(MOVE)
            energyCost += BODYPART_COST["move"]
            nextBodyPartCost = BODYPART_COST["work"]
        }
    }

    return body
}

const spawnRole = (spawn, role) => 
{
    const creepName = role + ' ' + Game.time;

    const homeRoom = spawn.room.name
    var workRoom = homeRoom == 'W32S11' ? 'W33S11' : homeRoom

    if(role == 'BuildingMaintainer' && spawn.room.find(FIND_MY_CREEPS, { filter: c => c.memory.role == 'BuildingMaintainer'}).length < roleSettingsMap.get(role).preferredNum / 2)
    {
        workRoom = homeRoom
    }

    if(role == 'Phalanx')
        workRoom = 'W33S12'

    if(role != "Miner")
    {
        if(spawn.spawnCreep(roleSettingsMap.get(role).body, creepName, {memory: {role: role, homeRoom: homeRoom, workRoom: workRoom, wait: true}}) >= 0)
            console.log(spawn.name + ' spawning new ' + role + ': ' + creepName)
    } 
    else
    {
        if(spawn.spawnCreep(calculateMinerBody(spawn.room), creepName, {memory: {role: role, homeRoom: homeRoom, workRoom: workRoom, wait: true}}) >= 0)
            console.log(spawn.name +' spawning new ' + role + ': ' + creepName)
    }
        
}






const SpawnManager = {
    
    run: () =>
    {
        for(const spawnName in Game.spawns)
        {
            const spawn = Game.spawns[spawnName]
            const roles = roleSettingsMap.keys()
            
            if(spawn.room.name == "W33S12")
            {
                const newRoomRoles = ["Slave", "Miner", "Priest", "Architect", "BuildingMaintainer", "FortificationMaintainer"]
                for(const role of newRoomRoles)
                {
                    const numOfCreepsWithRole = _.sum(Game.creeps, creep => creep.memory.role == role && creep.memory.homeRoom == spawn.room.name);
                    if(role == "BuildingMaintainer" && numOfCreepsWithRole < 3) //TODO - calculate num of building maintainers
                    {
                        spawnRole(spawn, role)
                        break
                    }
                    if(role != 'Miner' && role != "BuildingMaintainer" && numOfCreepsWithRole < roleSettingsMap.get(role).preferredNum)
                    {
                        spawnRole(spawn, role)
                        break
                    }
                    else if(role == 'Miner' && numOfCreepsWithRole < numOfRequiredWorkersForRole(spawn.room, role))
                    {
                        spawnRole(spawn, role)
                        break
                    }
                }
            }
            else
            {
                for(const role of roles)
                {
                    const numOfCreepsWithRole = _.sum(Game.creeps, creep => creep.memory.role == role && creep.memory.homeRoom == spawn.room.name);
                    if(role != 'Miner' && numOfCreepsWithRole < roleSettingsMap.get(role).preferredNum && role != 'Architect') //TODO - add check if construction site in room -> build
                    {
                        spawnRole(spawn, role)
                        break
                    }
                    else if(role == 'Miner' && numOfCreepsWithRole < numOfRequiredWorkersForRole(spawn.room, role))
                    {
                        spawnRole(spawn, role)
                        break
                    }
                }
            }
        }
    }
}

module.exports = SpawnManager