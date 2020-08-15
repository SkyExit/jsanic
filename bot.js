const JsanicClient = require('./Structures/JsanicClient');
const config = require('./config.json');

const client = new JsanicClient(config);
client.start();