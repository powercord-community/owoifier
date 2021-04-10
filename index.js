const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const owoify = require('owoify-js').default;

const Settings = require('./components/Settings');

module.exports = class Owoify extends Plugin {
    async startPlugin() {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Owoifier',
            render: (props) => React.createElement(Settings, {
                main: this,
                ...props
            })
        });
        
        let parentThis = this;

        function owoifyText(v) {
            var words = v.split(' ');
            var output = '';            
            const level = parentThis.settings.get('owoLevel','owo');

            for (let index = 0; index < words.length; index++) {
                const element = words[index];
                if (!element.startsWith('<@') && !element.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    let format_string = owoify(element, level)
                        .replace(/`/g, '\\`')
                        .replace(/\*/g, '\\*');

                    output += format_string + ' '
                } else {
                    output += element + ' '
                }
            }

            return output
        }

        const messageEvents = await getModule(["sendMessage"]);
        inject("owoifierSend", messageEvents, "sendMessage", function(args) {
            if (parentThis.settings.get('owoEnabled', false)) {
                let text = args[1].content;
                text = owoifyText(text);
                args[1].content = text;
            }
            return args;
        }, true);

        powercord.api.commands.registerCommand({
            command: 'owo',
            description: 'owoify your message',
            usage: '{c} [ text ]',
            executor: (args) => ({ send: true, result: owoifyText(args.join(' ')) })
        });
        powercord.api.commands.registerCommand({
            command: 'toggleowo',
            description: `owoify all of your messages`,
            executor: () => {
                let owoifierAutoToggle = this.settings.get('owoEnabled', false); 
                this.settings.set('owoEnabled', !owoifierAutoToggle);
            }
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        uninject("owoifierSend");
        powercord.api.commands.unregisterCommand('toggleowo');
        powercord.api.commands.unregisterCommand('owo');
    }    
};