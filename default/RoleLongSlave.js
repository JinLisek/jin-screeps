const RoleFunctions = require('RoleFunctions')
const EnergyStorer = require('EnergyStorer')

const isEnoughEnergyInResourceForCreep = resource => resource.amount > 0 && resource.resourceType == RESOURCE_ENERGY

const isEnoughEnergyInContainerForCreep = struct => struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0

const findClosestActiveSourceInReservedRoom = creep => creep.pos.findClosestByPath(
    FIND_SOURCES_ACTIVE,
    {filter: source => source.room.controller.reservation.username == 'JinLisek'}
)

const pickupDroppedEnergy = (creep, droppedEnergy) =>
{
    RoleFunctions.moveCreepToTarget(creep, droppedEnergy)
    creep.pickup(droppedEnergy)
}

const gatherEnergyInReservedRoom = creep =>
{
    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter : resource => isEnoughEnergyInResourceForCreep(resource) })
    if(droppedEnergy != undefined)
        pickupDroppedEnergy(creep, droppedEnergy)
    else
    {
        const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: struct => isEnoughEnergyInContainerForCreep(struct) })
        energyContainer == null ?
            RoleFunctions.harvestIfPossible(creep, findClosestActiveSourceInReservedRoom) :
            withdrawEnergy(creep, energyContainer)
    }
}



const RoleLongSlave = {
    run: function(creep) {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'
        
        if(creep.room.name == creep.memory.workRoom)
        {
            const exitRight = creep.pos.findClosestByPath(FIND_EXIT_RIGHT)
            RoleFunctions.canCreepCarryMore(creep) ?
                gatherEnergyInReservedRoom(creep) :
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