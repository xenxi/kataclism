#!/usr/bin/env node
const shell = require("shelljs");
const chalk = require("chalk");
const fs = require('fs-extra')
const path = require('path')
import { createPackageJson }  from "./createPackageJson"
import { templateDirectory } from '../templateDirectory'

function writePackageJson(dir: string, contentJson: any) {
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(contentJson, null, 2))
}

export function createTemplate(kata: string, options: any) {
 const templateType = options.t ? "typescript" : "javascript";
 const kataName = kata;
 const localPath = process.cwd()
 const templatePath = `${templateDirectory}/templates/${templateType}`;
 const kataPath = `${localPath}/${kataName}`;
 const packageJson = createPackageJson(kataName);

if (fs.existsSync(kataPath)) {
  console.error(`\n`)
  console.error(chalk.red(`Can't create kata project wiht name: ${kataName}.`))
  console.error(`\n`)
  console.error(chalk.red(`The directory '${kataName}' already exist.`))
  console.error(`\n`)
  process.exit(1) 
}

 console.log(chalk.yellow("Scaffolding kata structure..."));
 shell.mkdir("-p", `${kataName}`);
 shell.cp("-R", `${templatePath}/*`, kataPath);
 writePackageJson(kataPath, packageJson)
 shell.cd(kataPath);
 shell.exec("yarn");
 console.log(chalk.green(`\nKata correctly scaffolded!\n`));
 console.log(chalk.green(`You can enter the new created directory typing:\n`));
 console.log(chalk.cyan(`\tcd ${kataName}\n\n`));
};