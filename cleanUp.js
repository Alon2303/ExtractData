const fs = require('fs');
const path = require('path');

const deleteZipFiles= dir => {
    fs.readdir(dir, 'utf8', (err, files) => {
        files.forEach(file => {
            if (path.extname(file) === ".zip") {
                fs.unlinkSync(`${dir}/${file}`)
            }
        })
    })
};

const deleteFolders= dir => {};

const cleanUp = async dir => {
    await deleteZipFiles(dir);
};

module.exports = {
    cleanUp
};
