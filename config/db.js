const mongoose = require('mongoose');
const log = console.log;

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://PandaStore:7bVKscu4qZMClKtv@panda-store.1n0rld2.mongodb.net/PandaStore?retryWrites=true&w=majority')
        log("| ".rainbow.bold + "Database connected!".green.underline.bold + "      |".rainbow.bold);
        log(`============================`.rainbow.bold)
    } catch (error) {
        log("Database connect failure!".red.strikethrough.bold);
    }
}
module.exports = {
    connect
};