const Command = require('./../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['hello']
        });
    }

    async run(message, args) {
        message.channel.send('Hello!');
    }
}