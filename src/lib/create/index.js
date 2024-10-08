const path = require("path");
let fs = require("fs-extra");
const { packInstaller } = require("./packInstaller");

let createProject = (answers, targetDir, projectName) => {
    let packageJson = {
        name: projectName ? projectName : "exha-app",
        version: "1.0.0",
        description: "",
        main: answers.typescript ? "index.ts" : "index.js",
        scripts: {
            start: answers.typescript ? "ts-node index.ts" : "node index.js",
            dev: answers.typescript
                ? "ts-node-dev index.ts"
                : "nodemon index.js",
        },
        lisence: "MIT",
        keywords: [],
    };

    fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
    );

    console.log("◌ Installing dependencies...");
    packInstaller(["express", "exha"], { cwd: targetDir });

    if (answers.imageUploader) {
        packInstaller(["multer"], { cwd: targetDir });
    }

    if (answers.typescript) {
        console.log("◌ Installing typescript dependencies...");
        packInstaller(["typescript", "ts-node", "ts-node-dev"], {
            cwd: targetDir,
        });

        packInstaller(["@types/node", "@types/express", "--save-dev"], {
            cwd: targetDir,
        });
    } else {
        packInstaller(["nodemon", "--save-dev"], { cwd: targetDir });
    }

    console.log("✓ Project created successfully!");
    console.log("✓ To start the project, run the following commands:");
    if (projectName) {
        console.log(`\ncd ${projectName}`);
    }
    console.log("\npnpm start");
};

module.exports = { createProject };
