var spawnManager = require('spawn.manager');
var memoryManager = require('memory.manager');
var roleManager = require('role.manager');

module.exports.loop = function () {
    spawnManager.run();
    memoryManager.run();
    roleManager.run();
}