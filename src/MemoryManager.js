const MemoryManager = {

    run: function()
    {
        for(const creepName in Memory.creeps) {
            if(Game.creeps[creepName] == undefined) {
                delete Memory.creeps[creepName];
                console.log('Clearing non-existing creep memory:', creepName);
            }
        }

        if(Memory.sources == undefined)
            Memory.sources = new Map()

        if(Memory.rooms == undefined)
            Memory.rooms = new Map()
    }
};

module.exports = MemoryManager;