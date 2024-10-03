const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);

async function mongodbConnector() {
    try {
        const conn = await client.connect();
        return conn.db(process.env.MONGO_DB);
    } catch (e) {
        console.error(e);
    }
}

module.exports = mongodbConnector;