var roleArchitect = require('role.architect');
var rolePriest = require('role.priest');
var rolePeon = require('role.peon');

module.exports = {

    run: function()
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(! creep.spawning)
            {
                if(creep.memory.role == 'Peon') {
                    rolePeon.run(creep);
                }
                if(creep.memory.role == 'Priest') {
                    rolePriest.run(creep);
                }
                if(creep.memory.role == 'Architect') {
                    roleArchitect.run(creep);
                }
            }
        }
    }
};