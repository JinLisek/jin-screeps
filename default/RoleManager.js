const RoleArchitect = require('RoleArchitect');
const RolePriest = require('RolePriest');
const RoleSlave = require('RoleSlave');
const RoleBuildingMaintainer = require('RoleBuildingMaintainer');
const RoleFortificationMaintainer = require('RoleFortificationMaintainer');
const RoleMiner = require('RoleMiner');
const RoleReserver = require('RoleReserver');
const RoleLongMiner = require('RoleLongMiner');
const RoleLongSlave = require('RoleLongSlave')

 const RoleManager = {

    run: function()
    {
        for(const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if(creep.spawning == false)
            {
                if(creep.memory.role == 'Slave') {
                    RoleSlave.run(creep);
                }
                if(creep.memory.role == 'Priest') {
                    RolePriest.run(creep);
                }
                if(creep.memory.role == 'Architect') {
                    RoleArchitect.run(creep);
                }
                if(creep.memory.role == 'StructureMaintainer') {
                    RoleBuildingMaintainer.run(creep);
                }
                if(creep.memory.role == 'Miner') {
                    RoleMiner.run(creep);
                }
                if(creep.memory.role == 'WallMaintainer') {
                    RoleFortificationMaintainer.run(creep);
                }
                if(creep.memory.role == 'Reserver') {
                    RoleReserver.run(creep);
                }
                if(creep.memory.role == 'LongMiner') {
                    RoleLongMiner.run(creep);
                }
                if(creep.memory.role == 'LongSlave') {
                    RoleLongSlave.run(creep);
                }
            }
        }
    }
};

module.exports = RoleManager;