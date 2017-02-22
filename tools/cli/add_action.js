'use strict';
const path = require('path');
const shell = require('shelljs');
const _ = require('lodash');
const helpers = require('./helpers');

const args = process.argv;
const arr = (args[2] || '').split('/');
const pageName = _.camelCase(arr[0]);
const actionName = _.camelCase(arr[1]);
const actionType = args[3] || 'reducer';
const camelActionName = _.camelCase(actionName);

if (!actionName) {
  throw new Error('Please specify the action name.');
}

const context = {
  CAMEL_ACTION_NAME: camelActionName,
  CAPS: _.snakeCase(actionName).toUpperCase()
};

const filesToSave = [];
const toSave = helpers.getToSave(filesToSave);

const targetDir = path.join(helpers.getProjectRoot(), `src/pages/${pageName}/redux`);
const actionFile = path.join(targetDir, `${camelActionName}.js`);
if (shell.test('-e', actionFile)) {
  throw new Error(`Action '${camelActionName}'has been existed.`);
}

let targetPath;
let lines;

// ----------------------------------------------------

/* Updating actions.js */
console.log('Updating actions.js');
targetPath = path.join(targetDir, 'actions.js');

lines = helpers.getLines(targetPath);
console.log('lines: ', lines);
let i = lines.indexOf('');
console.log('i: ', i);
if (i === 0) {
    lines.splice(i, 0, `export const ${context.CAPS} = '${context.CAPS}';`);
    lines.splice(i+2, 0, `export const ${context.CAMEL_ACTION_NAME} = payload => ({`);
    lines.splice(i+3, 0, `  type: ${context.CAPS},`);
    lines.splice(i+4, 0, `  payload`);
    lines.splice(i+5, 0, `});`);
    lines.splice(i+6, 0, ``);
} else {
    lines.splice(i, 0, `export const ${context.CAPS} = '${context.CAPS}';`);
    i = helpers.lastLineIndex(lines, /\}\);/);
    lines.splice(i+2, 0, `export const ${context.CAMEL_ACTION_NAME} = payload => ({`);
    lines.splice(i+3, 0, `  type: ${context.CAPS},`);
    lines.splice(i+4, 0, `  payload`);
    lines.splice(i+5, 0, `});`);
    lines.splice(i+6, 0, ``);    
}


toSave(targetPath, lines);

// ----------------------------------------------------

/* Updating reducer.js or middleware.js */
console.log(`Add to ${actionType}.`);
targetPath = path.join(targetDir, `${actionType}.js`);
lines = helpers.getLines(targetPath);

i = helpers.lastLineIndex(lines, /\} from '.\/actions';/);
lines.splice(i, 0, `         ${context.CAPS},`);

i = helpers.lastLineIndex(lines, /default:/);
lines.splice(i, 0, `    case ${context.CAPS}:`);
if (actionType === 'reducer') {
    lines.splice(i+1, 0, `      return newState;`);
} else {
    lines.splice(i+1, 0, `      return next(action);`);
}
toSave(targetPath, lines);    

// save files
helpers.saveFiles(filesToSave);
console.log('Add action success: ', actionName);

// shell.exec(`"${process.execPath}" "${path.join(__dirname, 'add_action_test.js')}" ${pageName}/${actionName}`);
