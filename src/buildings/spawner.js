const unit_configs = [
  {
    parts: [MOVE, WORK, WORK, WORK, WORK, WORK],
    role: "miner",
    max_num: 2,
  },
  {
    parts: [CARRY, CARRY, MOVE, MOVE],
    role: "hauler",
    max_num: 2,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "upgrader",
    max_num: 4,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "repairer",
    max_num: 2,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "builder",
    max_num: 4,
  },
  {
    parts: [CLAIM, MOVE],
    role: "claimer",
    max_num: 2,
  },
];

const harvester_config = {
  parts: [WORK, WORK, CARRY, MOVE],
  role: "harvester",
  max_num: 1,
};

const costOfBody = (body) => {
  return body.reduce(function (cost, part) {
    return cost + BODYPART_COST[part];
  }, 0);
};

const spawner = {
  run: function () {
    const spawns = [
      Game.spawns["Spawn1"],
      Game.spawns["Emperoria"],
      Game.spawns["Caesaria"],
    ];

    spawns.forEach((spawn) => {
      for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
          if (Memory.creeps[name]["role"] == "miner") {
            const sourceId = Memory.creeps[name]["source"];
            Memory["rooms"][spawn.room.name]["sources"][sourceId][
              "miner"
            ] = null;
          }

          delete Memory.creeps[name];
          console.log("Clearing non-existing creep memory:", name);
        }
      }

      const numOfCreeps = Object.keys(Game.creeps).length;
      if (numOfCreeps < 1) {
        var newName = harvester_config["role"] + Game.time;
        spawn.spawnCreep(harvester_config["parts"], newName, {
          memory: { role: harvester_config["role"] },
        });
      } else {
        for (let i = 0; i < unit_configs.length; ++i) {
          const unit = unit_configs[i];
          let num_of_units = _.filter(
            Game.creeps,
            (creep) =>
              creep.memory.role == unit["role"] &&
              creep.memory.homeRoom == spawn.room.name
          ).length;

          if (num_of_units < unit["max_num"]) {
            var bodyParts = unit["parts"];
            while (costOfBody(bodyParts) > spawn.room.energyCapacityAvailable) {
              bodyParts.pop();
            }
            if (costOfBody(unit["parts"]) <= spawn.room.energyAvailable) {
              if (unit["role"] == "claimer") {
                var newName = unit["role"] + Game.time;
                const destinationRoom = num_of_units < 1 ? "E15N42" : "E16N41";
                console.log("Spawning new " + newName);
                spawn.spawnCreep(unit["parts"], newName, {
                  memory: { role: unit["role"], destination: destinationRoom },
                });
              } else {
                var newName = unit["role"] + Game.time;
                console.log("Spawning new " + newName);
                spawn.spawnCreep(unit["parts"], newName, {
                  memory: { role: unit["role"] },
                });
              }
            }
            break;
          }
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
    });
  },
};

module.exports = spawner;
