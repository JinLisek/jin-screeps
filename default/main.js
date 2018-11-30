const spawnManager = require('SpawnManager');
const memoryManager = require('MemoryManager');
const roleManager = require('RoleManager');

module.exports.loop = function () {
    spawnManager.run();
    memoryManager.run();
    roleManager.run();
}