const costOfBody = (body) =>
  body.reduce((cost, part) => cost + BODYPART_COST[part], 0);

const calculateAvailableBodyInRoom = (body, room) => {
  let bodyParts = body.slice();
  while (costOfBody(bodyParts) > room.energyCapacityAvailable) {
    bodyParts.pop();
  }
  return bodyParts;
};

const defaultShouldSpawn = (room, unitConfig) => {
  const numOfUnitsInRoom = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.role == unitConfig["role"] &&
      creep.memory.homeRoom == room.name
  ).length;

  return numOfUnitsInRoom < unitConfig["max_num"];
};

const unit_configs = [
  {
    parts: [WORK, WORK, CARRY, MOVE],
    role: "harvester",
    max_num: 2,
    shouldSpawn: (room, unitConfig) => {
      const numOfAllUnitsInRoom = _.filter(
        Game.creeps,
        (creep) => creep.memory.homeRoom == room.name
      ).length;

      return numOfAllUnitsInRoom < unitConfig["max_num"];
    },
  },
  {
    parts: [MOVE, WORK, WORK, WORK, WORK, WORK],
    role: "miner",
    max_num: 2,
    shouldSpawn: (room, unitConfig) => {
      const numOfMinersInRoom = _.filter(
        Game.creeps,
        (creep) =>
          creep.memory.role == unitConfig["role"] &&
          creep.memory.homeRoom == room.name
      ).length;

      return numOfMinersInRoom < Object.keys(room.memory["sources"]).length;
    },
  },
  {
    parts: [CARRY, CARRY, MOVE, MOVE],
    role: "hauler",
    max_num: 3,
    shouldSpawn: defaultShouldSpawn,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "upgrader",
    max_num: 3,
    shouldSpawn: defaultShouldSpawn,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "repairer",
    max_num: 2,
    shouldSpawn: defaultShouldSpawn,
  },
  {
    parts: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    role: "builder",
    max_num: 2,
    shouldSpawn: defaultShouldSpawn,
  },
  {
    parts: [CLAIM, MOVE],
    role: "claimer",
    max_num: 4,
    shouldSpawn: defaultShouldSpawn,
  },
];

const spawner = () => {
  const spawns = [
    Game.spawns["Spawn1"],
    Game.spawns["Emperoria"],
    Game.spawns["Caesaria"],
  ];

  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      if (Memory.creeps[name]["role"] == "miner") {
        const sourceId = Memory.creeps[name]["source"];
        Memory["rooms"][Memory.creeps[name]["homeRoom"]]["sources"][sourceId][
          "miner"
        ] = null;
      }

      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  spawns.forEach((spawn) => {
    for (let i = 0; i < unit_configs.length; ++i) {
      const unit = unit_configs[i];

      if (unit["shouldSpawn"](spawn.room, unit)) {
        const bodyParts = calculateAvailableBodyInRoom(
          unit["parts"],
          spawn.room
        );
        if (bodyParts.length < 1) {
          break;
        }
        if (costOfBody(bodyParts) <= spawn.room.energyAvailable) {
          if (unit["role"] == "claimer") {
            const num_of_claimersForE15N42 = _.filter(
              Game.creeps,
              (creep) =>
                creep.memory.role == unit["role"] &&
                creep.memory.homeRoom == spawn.room.name &&
                creep.memory.destination == "E15N42"
            ).length;
            const newName = unit["role"] + Game.time;
            const destinationRoom =
              num_of_claimersForE15N42 < 2 ? "E15N42" : "E16N41";
            console.log(
              spawn.room.name + ": spawning new " + newName + " " + bodyParts
            );
            spawn.spawnCreep(bodyParts, newName, {
              memory: {
                role: unit["role"],
                destination: destinationRoom,
                homeRoom: spawn.room.name,
              },
            });
          } else {
            const newName = unit["role"] + Game.time;
            console.log(spawn.room.name + ": spawning new " + newName);
            spawn.spawnCreep(bodyParts, newName, {
              memory: { role: unit["role"], homeRoom: spawn.room.name },
            });
          }
        }
        break;
      }
    }

    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  });
};

module.exports = spawner;
