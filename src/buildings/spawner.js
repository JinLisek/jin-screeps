const unit_configs = [
  {
    parts: [WORK, WORK, WORK, MOVE, MOVE],
    role: "miner",
    max_num: 2,
  },
  {
    parts: [WORK, CARRY, CARRY, MOVE, MOVE],
    role: "hauler",
    max_num: 2,
  },

  {
    parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    role: "upgrader",
    max_num: 2,
  },

  {
    parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    role: "builder",
    max_num: 4,
  },
];

const costOfBody = (body) => {
  return body.reduce(function (cost, part) {
    return cost + BODYPART_COST[part];
  }, 0);
};

const spawner = {
  run: function () {
    const spawn = Game.spawns["Spawn1"];

    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        if (Memory.creeps[name]["role"] == "miner") {
          const sourceId = Memory.creeps[name]["source"];
          Memory["rooms"][spawn.room.name]["sources"][sourceId]["miner"] = null;
        }

        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    for (let i = 0; i < unit_configs.length; ++i) {
      const unit = unit_configs[i];
      let num_of_units = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == unit["role"]
      ).length;

      if (num_of_units < unit["max_num"]) {
        if (costOfBody(unit["parts"]) <= spawn.room.energyAvailable) {
          var newName = unit["role"] + Game.time;
          console.log("Spawning new " + newName);
          spawn.spawnCreep(unit["parts"], newName, {
            memory: { role: unit["role"] },
          });
        }
        break;
      }
    }

    if (spawn.spawning) {
      var spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  },
};

module.exports = spawner;
