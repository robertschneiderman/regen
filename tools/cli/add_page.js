'use strict';
// Summary:
//  Add a page: create foler structure and generate corresponding files.
// Example:
//  node add_page.js employee

const path = require('path');
const _ = require('lodash');
const shell = require('shelljs');
const helpers = require('./helpers');

const args = process.argv;
const pageName = _.kebabCase(args[2]);

if (!pageName) {
  console.log('Error: Please set the page name');
  process.exit(1);
}

const context = {
  PAGE_NAME: _.upperFirst(_.camelCase(pageName)),
  CAMEL_PAGE_NAME: _.camelCase(pageName),
  KEBAB_PAGE_NAME: _.kebabCase(pageName),
  CAPS_PAGE_NAME: pageName.toUpperCase(),
  LOWER_PAGE_NAME: pageName.toLowerCase(),
  UPPER_SNAKE_PAGE_NAME: _.kebabCase(pageName).toUpperCase(),
  ROOT_URL: 'ROOT_URL',
};

const myContext = {
  Template: _.upperFirst(_.camelCase(pageName)),
  TEMPLATE: pageName.toUpperCase(),
  template: pageName.toLowerCase(),
};

const filesToSave = [];
const toSave = helpers.getToSave(filesToSave);

const targetDir = path.join(helpers.getProjectRoot(), `src/pages/${context.KEBAB_PAGE_NAME}`);
if (shell.test('-e', targetDir)) {
  console.log(`Error: page name existed: ${context.KEBAB_PAGE_NAME}`);
  process.exit(1);
}

// templated files
//   'redux/constants.js',
[
  'components/index.js',
  'redux/actions.js',
  'redux/reducer.js',
  'redux/middleware.js',
  'redux/api_util.js',
  'redux/initialState.js',
  'redux/route.js',
].forEach(fileName => {
  console.log('processing file: ', fileName);
  const filePath = `${targetDir}/${fileName}`;
  const res = helpers.handleTemplate(fileName, myContext);
  toSave(filePath, res);
});

// // redux files
// [
//   'actions.js',
//   'constants.js',
//   'reducer.js',
// ].forEach(fileName => {
//   console.log('creating file: ', fileName);
//   const filePath = path.join(targetDir, fileName);
//   toSave(filePath, '');
// });

let lines;
let i;
let targetPath;

/* ===== Add reducer to rootReducer.js ===== */
console.log('Add to root reducer.');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/rootReducer.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import ${context.CAMEL_PAGE_NAME}Reducer from '../pages/${context.KEBAB_PAGE_NAME}/redux/reducer';`);
i = helpers.lastLineIndex(lines, /^\}\);$/);
lines.splice(i, 0, `  ${context.CAMEL_PAGE_NAME}: ${context.CAMEL_PAGE_NAME}Reducer,`);
toSave(targetPath, lines);

/* ===== Add middleware to store.js ===== */
console.log('Add to apply middleware.');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/store.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import ${context.CAMEL_PAGE_NAME}Middleware from '../pages/${context.KEBAB_PAGE_NAME}/redux/middleware';`);
i = helpers.lastLineIndex(lines, /^\)\(createStore\);$/);
lines.splice(i, 0, `  ,${context.CAMEL_PAGE_NAME}Middleware`);
toSave(targetPath, lines);

/* ===== Add route to routeConfig.js ===== */
console.log('Register route');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/routeConfig.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import ${context.CAMEL_PAGE_NAME}Route from '../pages/${context.KEBAB_PAGE_NAME}/route';`);
i = helpers.lineIndex(lines, 'path: \'*\'');
// istanbul ignore if
if (i === -1) {
  i = helpers.lastLineIndex(lines, /^ {2}\]/);
}
lines.splice(i, 0, `    ${context.CAMEL_PAGE_NAME}Route,`);
toSave(targetPath, lines);

/* ===== Add entry to styles/index.less ===== */
// console.log('Add entry to styles/index.less');
// targetPath = path.join(helpers.getProjectRoot(), 'src/styles/index.less');
// lines = helpers.getLines(targetPath);
// i = helpers.lastLineIndex(lines, /^@import/);
// lines.splice(i + 1, 0, `@import '../pages/${context.KEBAB_PAGE_NAME}/style.less';`);
// toSave(targetPath, lines);

shell.mkdir(targetDir);
shell.mkdir(path.join(targetDir, 'redux'));
shell.mkdir(path.join(targetDir, 'components'));

helpers.saveFiles(filesToSave);
console.log('Add page done: ', pageName);

// Add page reducer test
// shell.exec(`"${process.execPath}" ${__dirname}/add_reducer_test.js ${context.KEBAB_PAGE_NAME}`);

/* ==== Add sample page and test action ===== */
// shell.exec(`"${process.execPath}" "${__dirname}/add_action.js" ${context.KEBAB_PAGE_NAME}/${context.KEBAB_PAGE_NAME}-test-action`);
// shell.exec(`"${process.execPath}" "${__dirname}/add_page_file.js" ${context.KEBAB_PAGE_NAME}/default-page`);
