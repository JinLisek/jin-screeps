const RoomManager = {
    
    run: function()
    {
        if(Memory.rooms != undefined)
            for(roomName in Game.rooms)
            {
                const room = Game.rooms[roomName]
                if(Memory.rooms[room.name] == undefined)
                {
                    const sourcesInRoom = room.find(FIND_SOURCES)

                    const vassals = roomName == "W32S11" ? ["W33S11"] : []

                    room.memory.numOfSources = sourcesInRoom.length
                    room.memory.vassals = vassals
                    console.log("Created room.memory for " + roomName + " with " + JSON.stringify(room.memory))
                }
            }
    }
}

module.exports = RoomManager;