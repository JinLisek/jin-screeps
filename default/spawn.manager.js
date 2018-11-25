var PREFERRED_NUM_OF_PEONS = 3;
var PREFERRED_NUM_OF_PRIESTS = 8;
var PREFERRED_NUM_OF_ARCHITECTS = 4;

let peonSettings = { body: [WORK, WORK, CARRY, MOVE] }
let priestSettings = { body: [WORK, CARRY, MOVE, MOVE] }
let architectSettings = { body: [WORK, CARRY, MOVE, MOVE] }

let roleSettingsMap = new Map([
    ['Peon', peonSettings],
    ['Priest', priestSettings],
    ['Architect', architectSettings]
]);

function spawnRole(role, preferredNumOfRole)
{
    if(roleSettingsMap.has(role))
    {
         var creepsWithGivenRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if(creepsWithGivenRole.length < preferredNumOfRole) {
            var newName = role + ' ' + Game.time;
            
            if(Game.spawns['Byzantium'].spawnCreep(roleSettingsMap.get(role).body, newName, {memory: {role: role}}) >= 0)
                console.log('Spawning new ' + role + ': ' + newName);
        }
        
        if(Game.spawns['Byzantium'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Byzantium'].spawning.name];
            Game.spawns['Byzantium'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Byzantium'].pos.x + 1, 
                Game.spawns['Byzantium'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
    else
    {
        console.log('ERROR: role unknown- ' + role);
    }
}

module.exports = {
    
    run: function()
    {
        spawnRole('Peon', PREFERRED_NUM_OF_PEONS);
        spawnRole('Priest', PREFERRED_NUM_OF_PRIESTS);
        spawnRole('Architect', PREFERRED_NUM_OF_ARCHITECTS);
    }

};