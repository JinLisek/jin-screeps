const RoleArchitect = require('RoleArchitect');
const RolePriest = require('RolePriest');
const RolePeon = require('RolePeon');

 const RoleManager = {

    run: function()
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(! creep.spawning)
            {
                if(creep.memory.role == 'Peon') {
                    RolePeon.run(creep);
                }
                if(creep.memory.role == 'Priest') {
                    RolePriest.run(creep);
                }
                if(creep.memory.role == 'Architect') {
                    RoleArchitect.run(creep);
                }
            }
        }
    }
};

module.exports = RoleManager;