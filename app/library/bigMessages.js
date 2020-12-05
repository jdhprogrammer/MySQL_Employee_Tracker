const figlet = require('figlet');
const term = require("terminal-kit").terminal;

const welcome = () => {
    // console.log("\n");
    term.cyan(figlet.textSync(`welcome to:`, {
        font: 'standard',
        horizontalLayout: 'full',
        width: 100,
        whitespaceBreak: true,
    }));

    console.log("\n");
};

const goodbye = () => {
    console.log("\n");
    term.yellow(figlet.textSync(' Goodbye!', {
        font: 'standard',
        horizontalLayout: 'full',
        width: 100,
        whitespaceBreak: true
    }));

    console.log("\n");
}


// EXPORT MODULE ================================================================================
module.exports = {
    welcome,
    goodbye
};