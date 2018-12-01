const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')
const EnergyGatherer = require('EnergyGatherer')

const RoleLongSlave = {
    run: function(creep) {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'
        
        if(creep.room.name == creep.memory.workRoom)
        {
            const exitRight = creep.pos.findClosestByPath(FIND_EXIT_RIGHT)
            RoleFunctions.canCreepCarryMore(creep) ?
                EnergyGatherer.gatherEnergy(creep) :
                RoleFunctions.moveCreepToTarget(creep, exitRight)

        }
        else
        {
            const exitLeft = creep.pos.findClosestByPath(FIND_EXIT_LEFT)
            creep.carry.energy > 0 ?
                EnergyStorer.storeEnergyInStructures(creep) :
                RoleFunctions.moveCreepToTarget(creep, exitLeft)    
        }
	}
};

module.exports = RoleLongSlave;