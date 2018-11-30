const RoleArchitect = require('RoleArchitect');
const RolePriest = require('RolePriest');
const RolePeon = require('RolePeon');
const RoleStructureMaintainer = require('RoleStructureMaintainer');
const RoleMiner = require('RoleMiner');

 const RoleManager = {

    run: function()
    {
        for(const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if(creep.spawning == false)
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
                if(creep.memory.role == 'StructureMaintainer') {
                    RoleStructureMaintainer.run(creep);
                }
                if(creep.memory.role == 'Miner') {
                    RoleMiner.run(creep);
                }
            }
        }
    }
};

module.exports = RoleManager;