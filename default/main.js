var spawnManager = require('SpawnManager');
var memoryManager = require('MemoryManager');
var roleManager = require('RoleManager');

module.exports.loop = function () {
    spawnManager.run();
    memoryManager.run();
    roleManager.run();
}