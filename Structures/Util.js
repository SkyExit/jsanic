const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command');

module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

        isClass(input) {
            return typeof input === 'function' &&
                typeof input.prototype === 'object' &&
                input.toString().substring(0, 5) === 'class';
        }

        get directory() {
            return `${path.dirname(require.main.filename)}${path.sep}`;
        }

    trimArray(arr, maxLen = 10) {
        if(arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    formatBytes(bytes) {
        if(bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YTB'];
        const i = Math.floor((Math.log(bytes) / Math.log(1024)));
        return `${parseFloat((bytes / Math.pow(1024, 1)).toFixed(2))} ${sizes[1]}`;
    }

        async loadCommands() {
        return glob(`${this.directory}commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete  require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if(!this.isClass(File)) throw TypeError(`Command ${name} doesn't export a class.`);
                const command = new File(this.client, name.toLowerCase());
                if(!(command instanceof Command)) throw new TypeError(`Command ${name} doesn't belong in Commands.`);
                this.client.commands.set(command.name, command);
                if(command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command);
                    }
                }
            }
        });
    }


}