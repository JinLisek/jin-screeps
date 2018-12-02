const Architect = require('Roles_Architect')
const Priest = require('Roles_Priest')
const Slave = require('Roles_Slave');
const BuildingMaintainer = require('Roles_BuildingMaintainer')
const FortificationMaintainer = require('Roles_FortificationMaintainer')
const Miner = require('Roles_Miner')
const Reserver = require('Roles_Reserver')
const Hauler = require('Roles_Hauler')

 const RoleManager = {

    run: function()
    {
        for(const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if(creep.spawning == false)
            {
                if(creep.memory.role == 'Slave')
                    Slave.run(creep)
                else if(creep.memory.role == 'Priest')
                    Priest.run(creep)
                else if(creep.memory.role == 'Architect')
                    Architect.run(creep)
                else if(creep.memory.role == 'BuildingMaintainer')
                    BuildingMaintainer.run(creep)
                else if(creep.memory.role == 'Miner')
                    Miner.run(creep)
                else if(creep.memory.role == 'FortificationMaintainer')
                    FortificationMaintainer.run(creep)
                else if(creep.memory.role == 'Reserver')
                    Reserver.run(creep)
                else if(creep.memory.role == 'Hauler')
                    Hauler.run(creep)
                else
                    console.log("Don't know action for role: " + creep.memory.role)
            }
        }
    }
}

module.exports = RoleManager;