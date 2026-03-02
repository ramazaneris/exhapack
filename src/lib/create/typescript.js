const path = require("path");
const fs = require("fs-extra");

let createTSProject = (answers, templateDir) => {
	const templateTSPath = path.join(__dirname, "../templates/ts");

	fs.copyFileSync(
		templateTSPath + "/tsconfig.json",
		path.join(templateDir, "tsconfig.json"),
	);

	let targetDir = answers.sourceDir
		? path.join(templateDir, answers.sourceDir)
		: templateDir;
	fs.ensureDirSync(targetDir);
	const routeDir = path.join(targetDir, "routes");
	fs.ensureDirSync(routeDir);
	fs.copyFileSync(
		templateTSPath + "/routes/index.ts",
		path.join(targetDir, answers.routeDir, "index.ts"),
	);

	fs.copyFileSync(
		templateTSPath + "/index.ts",
		path.join(targetDir, "index.ts"),
	);

	let config = {
		routeDir: "/" + answers.routeDir,
	};

	if (answers.staticDir) {
		config.staticDir = "/" + answers.staticDir;
		fs.ensureDirSync(path.join(targetDir, answers.staticDir));
	}

	if (answers.parseForm) {
		config.parseForm = true;
	}

	if (answers.imageUploader) {
		config.imageUploader = true;
	}

	if (answers.middlewareDir) {
		config.middlewareDir = "/" + answers.middlewareDir;
		fs.ensureDirSync(path.join(targetDir, answers.middlewareDir));
	}

	if (answers.pluginDir) {
		config.pluginDir = "/" + answers.pluginDir;
		fs.ensureDirSync(path.join(targetDir, answers.pluginDir));
	}

    if (answers.sourceDir) {
        config.sourceDir = answers.sourceDir + "/";
    }

	fs.writeFileSync(
		path.join(templateDir, "exha.config.ts"),
		`export default ${JSON.stringify(config, null, 4)}`,
	);
};

module.exports = {
	createTSProject,
};
