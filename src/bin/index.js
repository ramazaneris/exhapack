#!/usr/bin/env node

const path = require("path");
const { create } = require("../lib/index");

const args = process.argv.slice(2);
const projectName = args[0] || "exha-app";

create(projectName);
