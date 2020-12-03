const figlet = require('figlet');
const { getBorderCharacters } = require('table');
const term = require("terminal-kit").terminal;

const start = () => {
    // console.log("\n");
    term.cyan(figlet.textSync(`welcome to:`, {
        font: 'standard',
        horizontalLayout: 'full',
        width: 100,
        whitespaceBreak: true,
    }));

    console.log("\n");
};

const exit = () => {
    console.log("\n");
    term.yellow(figlet.textSync('Thank You', {
        font: 'colossal',
        horizontalLayout: 'full',
        width: 100,
        whitespaceBreak: true
    }));

    console.log("\n");
}


// EXPORT MODULE ================================================================================
module.exports = { start, exit };