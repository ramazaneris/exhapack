const inquirer = require("inquirer");

let prompts = [
    {
        type: "confirm",
        name: "typescript",
        message: "Would you like to use Typescript?",
        default: true,
    },
    {
        type: "input",
        name: "routeDir",
        message: "What is your route path name?",
        default: "routes",
    },
    {
        type: "input",
        name: "staticDir",
        message: "What is your static folder name?",
        default: "public",
    },
    {
        type: "confirm",
        name: "parseForm",
        message: "Would you like to parse forms?",
        default: true,
    },
    {
        type: "confirm",
        name: "imageUploader",
        message: "Would you like to image uploader?",
        default: true,
    },
];

const prompt = inquirer.createPromptModule();

async function getPrompts() {
    return await prompt(prompts);
}

module.exports = { getPrompts };
