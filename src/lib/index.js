const fs = require("fs-extra");
const { getPrompts } = require("./cli/prompts");
const { createTSProject } = require("./create/typescript");
const { createJSProject } = require("./create/javascript");
const { createProject } = require("./create");
const path = require("path");

async function create(projectName) {
    const answers = await getPrompts();
    let targetDir = path.join(process.cwd(), projectName ? projectName : ".");

    fs.ensureDirSync(targetDir);

    if (answers.typescript) {
        createTSProject(answers, targetDir);
    } else {
        createJSProject(answers, targetDir);
    }

    createProject(answers, targetDir, projectName);
}

module.exports = { create };
