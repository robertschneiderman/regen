const path = require('path');
const _ = require('lodash');
const shell = require('shelljs');
const helpers = require('./helpers');

const targetDir = path.join(helpers.getProjectRoot(), `src/pages`);

// if (shell.test('-e', targetDir)) {
//   console.log(`Error: page name existed: auth`);
//   process.exit(1);
// }

const filesToSave = [];
const toSave = helpers.getToSave(filesToSave);

[
  'auth/components/Signup.jsx',
  'auth/components/Signin.jsx',
  'auth/components/Signout.jsx',
  'auth/components/RequireAuth.jsx',
  'auth/redux/actions.js',
  'auth/redux/reducer.js',
].forEach(fileName => {
  console.log('processing file: ', fileName);
  const filePath = `${targetDir}/${fileName}`;
  const res = helpers.handleTemplate(fileName);
  toSave(filePath, res);
});

/* ===== Add reducer to rootReducer.js ===== */
console.log('Add to root reducer.');
let targetPath = path.join(helpers.getProjectRoot(), 'src/common/rootReducer.js');
let lines = helpers.getLines(targetPath);
let i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import authReducer from '../pages/auth/redux/reducer';`);
i = helpers.lastLineIndex(lines, /^\}\);$/);
lines.splice(i, 0, `  auth: authReducer,`);
toSave(targetPath, lines);

/* ===== Add middleware to store.js ===== */
console.log('Add to apply middleware.');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/store.js');
lines = helpers.getLines(targetPath);
i = helpers.lastLineIndex(lines, /^import /);
lines.splice(i + 1, 0, `import authMiddleware from '../pages/auth/redux/middleware';`);
i = helpers.lastLineIndex(lines, /^\)\(createStore\);$/);
lines.splice(i, 0, `  ,authMiddleware`);
toSave(targetPath, lines);

/* ===== Add route to routeConfig.js ===== */
console.log('Register route');
targetPath = path.join(helpers.getProjectRoot(), 'src/common/routeConfig.js');
lines = helpers.getLines(targetPath);
['Signup', 'Signin', 'Sigout'].forEach(Component => {
    i = helpers.lastLineIndex(lines, /^import /);
    lines.splice(i + 1, 0, `import ${Component} from '../pages/auth/components/${Component}';`);
    i = helpers.lineIndex(lines, 'path: \'*\'');
    lines.splice(i, 0, `    { path: '${_.kebabCase(Component)}', name: '${Component}', component: ${Component}},`);
});

toSave(targetPath, lines);


shell.mkdir(`${targetDir}/auth`);
shell.mkdir(path.join(targetDir, 'auth/redux'));
shell.mkdir(path.join(targetDir, 'auth/components'));

helpers.saveFiles(filesToSave);
console.log('Add page done: ', 'Auth');