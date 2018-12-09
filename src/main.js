const spawnManager = require('SpawnManager')
const memoryManager = require('MemoryManager')
const RoomManager = require('RoomManager')
const roleManager = require('RoleManager')
const Tower = require('Tower')

module.exports.loop = function()
{
    memoryManager.run()
    RoomManager.run()
    spawnManager.run()
    Tower.run()
    roleManager.run()
}