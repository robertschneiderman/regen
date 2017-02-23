'use strict';

const path = require('path');
const _ = require('lodash');
const shell = require('shelljs');
const helpers = require('./helpers');

const args = process.argv;
const pageName = _.camelCase(args[2]);

if (!pageName) {
  console.log('Error: Please set the page name');
  process.exit(1);
}

const context = {
  PAGE_NAME: _.upperFirst(_.camelCase(pageName)),
  CAMEL_PAGE_NAME: _.camelCase(pageName),
  SNAKE_PAGE_NAME: _.snakeCase(pageName),
  CAPS_PAGE_NAME: pageName.toUpperCase(),
  LOWER_PAGE_NAME: pageName.toLowerCase(),
  UPPER_SNAKE_PAGE_NAME: _.kebabCase(pageName).toUpperCase(),
  ROOT_URL: 'ROOT_URL',
};

const myContext = {
  Template: _.upperFirst(_.camelCase(pageName)),
  TEMPLATE: pageName.toUpperCase(),
  template: pageName.toLowerCase(),
  templateKebab: _.kebabCase(pageName),
  templateCamel: _.camelCase(pageName),
};

const filesToSave = [];
const toSave = helpers.getToSave(filesToSave);

const targetDir = path.join(helpers.getProjectRoot(), `src/data/${context.CAMEL_PAGE_NAME}`);
if (shell.test('-e', targetDir)) {
  console.log(`Error: page name existed: ${context.CAMEL_PAGE_NAME}`);
  process.exit(1);
}

// templated files
[
  'cycle/actions.js',
  'cycle/reducer.js',
  'cycle/middleware.js',
  'cycle/api_util.js',
  'cycle/initialState.js',
].forEach(templatePath => {
  console.log('processing file: ', templatePath);
  const res = helpers.handleTemplate(templatePath, myContext);
  let fileName = templatePath.split("/")[1];
  const filePath = `${targetDir}/${fileName}`;
  toSave(filePath, res);
});

let lines;
let i;
let targetPath;

/* ===== Add reducer to rootReducer.js ===== */
console.log('Add to root reducer.');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/rootReducer.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import ${context.CAMEL_PAGE_NAME}Reducer from '../data/${context.CAMEL_PAGE_NAME}/reducer';`);
i = helpers.lastLineIndex(lines, /^\}\);$/);
lines.splice(i, 0, `  ${context.CAMEL_PAGE_NAME}: ${context.CAMEL_PAGE_NAME}Reducer,`);
toSave(targetPath, lines);

/* ===== Add middleware to store.js ===== */
console.log('Add to apply middleware.');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/store.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import ${context.CAMEL_PAGE_NAME}Middleware from '../data/${context.CAMEL_PAGE_NAME}/middleware';`);
i = helpers.lastLineIndex(lines, /^\)\(createStore\);$/);
lines.splice(i, 0, `  ,${context.CAMEL_PAGE_NAME}Middleware`);
toSave(targetPath, lines);

/* ===== Add route to routeConfig.js ===== */
// console.log('Register route');
// targetPath = path.join(helpers.getProjectRoot(), 'src/common/routeConfig.js');
// lines = helpers.getLines(targetPath);

// i = helpers.lastLineIndex(lines, /^import /);
// lines.splice(i + 1, 0, `import ${myContext.templateCamel} from '../pages/${context.CAMEL_PAGE_NAME}/components';`);
// i = helpers.lineIndex(lines, 'path: \'*\'');
// lines.splice(i, 0, `    { path: '${myContext.templateKebab}', name: '${myContext.Template}', component: ${myContext.templateCamel}},`);

// toSave(targetPath, lines);

shell.mkdir(targetDir);

helpers.saveFiles(filesToSave);
console.log('Add page done: ', pageName);

// Add page reducer test
// shell.exec(`"${process.execPath}" ${__dirname}/add_reducer_test.js ${context.CAMEL_PAGE_NAME}`);

/* ==== Add sample page and test action ===== */
// shell.exec(`"${process.execPath}" "${__dirname}/add_action.js" ${context.CAMEL_PAGE_NAME}/${context.CAMEL_PAGE_NAME}-test-action`);
// shell.exec(`"${process.execPath}" "${__dirname}/add_page_file.js" ${context.CAMEL_PAGE_NAME}/default-page`);
