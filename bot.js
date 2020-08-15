const JsanicClient = require('./Structures/JsanicClient');
const config = require('./cConfig.json');

const client = new JsanicClient(config);
client.start();