var miner = {
  run: (creep) => {
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.memory["source"] == undefined) {
      for (let i = 0; i < sources.length; ++i) {
        const source = sources[i];
        const source_mem =
          Memory.rooms[creep.room.name]["sources"][source["id"]];
        if (source_mem["miner"] == null) {
          source_mem["miner"] = creep.name;
          creep.memory["source"] = source.id;
          break;
        }
      }
    }

    const source = Game.getObjectById(creep.memory["source"]);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  },
};

module.exports = miner;
