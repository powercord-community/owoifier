const { Plugin } = require('powercord/entities');
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { forceUpdateElement } = require('powercord/util');
const owoify = require('owoify-js').default;

const Settings = require('./components/Settings');
const previewBar = require('./components/previewBar');

module.exports = class Owoify extends Plugin {
    async startPlugin() {
        this.loadStylesheet('./style.css');
        
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Owoifier',
            render: (props) => React.createElement(Settings, {
                main: this,
                ...props
            })
        });

        let parentThis = this;

	    const channelReg = /^<#(?<id>\d{17,19})>$/;
	    const emojiReg = /<a?:\w{2,32}:\d{17,18}>/;
	    const roleReg = /^<@&(?<id>\d{17,19})>$/;
	    const userReg = /^<@!?(?<id>\d{17,19})>$/;
	    const linkReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	    const dMentionReg = /^(@everyone|@here)$/
	    function isMentionOrLink(s) {
		    return channelReg.test(s) || emojiReg.test(s) || roleReg.test(s) || userReg.test(s) || linkReg.test(s) || dMentionReg.test(s);
	    }

        function isCodeBlock(s) {
            return (s.startsWith("```") && s.endsWith("```")) || s.startsWith("`") || s.endsWith("`")
        }

        function owoifyText(v) {
            const level = parentThis.settings.get('owoLevel','owo');
            const keepCodeBlocks = parentThis.settings.get('keepCodeBlocks', true);
            return v.split(/ +/).map((s) => (keepCodeBlocks && isCodeBlock(s)) || isMentionOrLink(s) ? s : owoify(s, level).replace(/`/g, '\\`').replace(/\*/g, '\\*')).join(' ');
        }

        const messageEvents = await getModule(["sendMessage"]);
        inject("owoifierSend", messageEvents, "sendMessage", function(args) {
            if (parentThis.settings.get('owoEnabled', false) && !args[1].content.startsWith(powercord.api.commands.prefix)) {
                let text = args[1].content;
                text = owoifyText(text);
                args[1].content = text;
            }
            return args;
        }, true);

        const TypingUsers = await getModule(m => m.default && m.default.displayName === 'FluxContainer(TypingUsers)');

        inject('owoifier-text-indicator', TypingUsers.default.prototype, 'render', (args, res) => React.createElement(
            React.Fragment, null, res, React.createElement(previewBar, { 
                text: '',
                getSetting: this.settings.get
            })
        ));

        const SlateChannelTextArea = await getModuleByDisplayName('SlateChannelTextArea');

        inject('owoifier-text-hook', SlateChannelTextArea.prototype, 'render', (args, res) => {
            setTimeout(() => {
                if (parentThis.settings.get('owoEnabled', false)) { //we only need to show the preview when auto is enabled
                    const ta = document.querySelector('[data-slate-editor="true"]')?.innerText;
                    if(!ta.startsWith(powercord.api.commands.prefix) && ta) { //no commandos baby
                        parentThis.settings.set('owopreviewtext', owoifyText(ta));
                    } else {
                        parentThis.settings.set('owopreviewtext', '');
                    }
                }       
            });
            return res;
        });

        

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
        uninject("owoifier-text-hook");
        uninject("owoifier-text-indicator");
        powercord.api.commands.unregisterCommand('toggleowo');
        powercord.api.commands.unregisterCommand('owo');        
        forceUpdateElement(`.${getModule([ 'FluxContainer(TypingUsers)' ], false)}`);
    }
};
