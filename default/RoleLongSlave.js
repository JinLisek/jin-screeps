const RoleFunctions = require('RoleFunctions')

const SlaveRestPos = new RoomPosition(37, 3, "W32S11")

const isEnoughEnergyInResourceForCreep = resource => resource.amount > 0 && resource.resourceType == RESOURCE_ENERGY

const isEnoughEnergyInContainerForCreep = struct => struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0

const hasStructureEnergySpace = struct => struct.energy < struct.energyCapacity

const isStructureEnergyBased = struct =>
	struct.structureType == STRUCTURE_EXTENSION ||
	struct.structureType == STRUCTURE_SPAWN ||
	struct.structureType == STRUCTURE_TOWER

const canStructureBeFilledWithEnergy = struct => isStructureEnergyBased(struct) && hasStructureEnergySpace(struct)

const transferEnergy = (creep, target) =>
{
    const transferResult = creep.transfer(target, RESOURCE_ENERGY)
    transferResult == ERR_NOT_IN_RANGE ?
        RoleFunctions.moveCreepToTarget(creep, target) :
        RoleFunctions.ifNotZero(transferResult, console.log, "ERROR: creep.transfer: " + transferResult)
}

const storeEnergy = creep =>
{
	const target = creep.room.find(
		FIND_STRUCTURES, 
		{filter: struct => struct.structureType == STRUCTURE_STORAGE && hasStructureEnergySpace(struct)})[0];
	
	target != undefined ? transferEnergy(creep, target) : RoleFunctions.moveCreepToTarget(creep, SlaveRestPos)
}

const transferEnergyOrRest = creep => 
{
	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: canStructureBeFilledWithEnergy});
	target != undefined ? transferEnergy(creep, target) : storeEnergy(creep);
}

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
                transferEnergyOrRest(creep, SlaveRestPos) :
                RoleFunctions.moveCreepToTarget(creep, exitLeft)    
        }
	}
};

module.exports = RoleLongSlave;