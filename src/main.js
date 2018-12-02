const spawnManager = require('SpawnManager')
const memoryManager = require('MemoryManager')
const roleManager = require('RoleManager')
const Tower = require('Tower')

module.exports.loop = function()
{
    Tower.run()
    spawnManager.run();
    memoryManager.run();
    roleManager.run();
}