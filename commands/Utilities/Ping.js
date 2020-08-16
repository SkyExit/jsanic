const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['pong']
        });
    }

    async run(message) {
        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['is this really my Ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
        const response = choices[Math.floor(Math.random() * choices.length)];

        await msg.edit(`${response} - Bot Latency \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}