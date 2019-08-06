const { Plugin } = require('powercord/entities');

let faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];
function owoifyText(v){
	return v
    .replace(/(?:r|l)/g, "w")
    .replace(/(?:R|L)/g, "W")
    .replace(/(n)([aeiou])/gi, '$1y$2')
    .replace(/ove/g, "uv")
    .replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");
}

module.exports = class Owoify extends Plugin {
  startPlugin () {
    this.registerCommand(
      'owo',
      [],
      'owoify your message...',
      '{c} [ text to owoify ]',
      (args) => ({
        send: true,
        result: owoifyText(args.join(' '))
      })
    );
  }
};
