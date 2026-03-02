const path = require("path");
const fs = require("fs-extra");

let createJSProject = (answers, templateDir) => {
	const templateJSPath = path.join(__dirname, "../templates/js");

	let targetDir = answers.sourceDir
		? path.join(templateDir, answers.sourceDir)
		: templateDir;
	fs.ensureDirSync(targetDir);
    
	const routeDir = path.join(targetDir, "routes");
	fs.ensureDirSync(routeDir);
	fs.copyFileSync(
		templateJSPath + "/routes/index.js",
		path.join(targetDir, answers.routeDir, "index.js"),
	);

	fs.copyFileSync(
		templateJSPath + "/index.js",
		path.join(targetDir, "index.js"),
	);

	let config = {
		routeDir: "/" + answers.routeDir,
		staticDir: "/" + answers.staticDir,
	};

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
		path.join(templateDir, "exha.config.js"),
		`exports.default = ${JSON.stringify(config, null, 4)}`,
	);
};

module.exports = {
	createJSProject,
};
