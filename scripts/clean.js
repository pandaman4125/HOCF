const sh = require('shelljs');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../docs');

// Remove all files except CNAME
sh.ls(`${destPath}/*`).forEach(file => {
    if (upath.basename(file) !== 'CNAME') {
        sh.rm('-rf', file);
    }
});
