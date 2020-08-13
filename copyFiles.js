const fs = require('fs');

module.exports = {
    copyFiles: (dirPath, filesToCopy) => {
        fs.mkdirSync(`${dirPath}/fileCopies`);
        for (let i = 0; i< filesToCopy.length; i++) {
            fs.copyFileSync(`${dirPath}/${filesToCopy[i]}`, `${dirPath}/fileCopies/${filesToCopy[i]}`)
        }
    }
};

