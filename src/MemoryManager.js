const MemoryManager = {

    run: function()
    {
        for(const creepName in Memory.creeps) {
            if(Game.creeps[creepName] == undefined) {
                console.log('Clearing non-existing creep memory: ' + creepName + ", from: " + Memory.creeps[creepName].homeRoom);
                delete Memory.creeps[creepName];
            }
        }

        if(Memory.sources == undefined)
            Memory.sources = new Map()

        if(Memory.rooms == undefined)
            Memory.rooms = new Map()
    }
};

module.exports = MemoryManager;