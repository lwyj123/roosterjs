'use strict';

const path = require('path');
const fs = require('fs');
const {
    packagesPath,
    nodeModulesPath,
    allPackages,
    distPath,
    runNode,
} = require('./common');

function buildAmd() {
    const typescriptPath = path.join(nodeModulesPath, 'typescript/lib/tsc.js');

    runNode(
        typescriptPath +
            ` -p ${path.join(
                packagesPath,
                'tsconfig.build.json'
            )} -t es6 --moduleResolution node -m amd`,
        packagesPath
    );

    allPackages.forEach(packageName => {
        const packagePath = path.join(distPath, packageName);
        fs.renameSync(`${packagePath}/lib`, `${packagePath}/lib-amd`);
    });
}

module.exports = {
    message: 'Building packages in AMD mode...',
    callback: buildAmd,
    enabled: options => options.buildamd,
};
