const fs = require('fs');
const StreamZip = require('node-stream-zip');


module.exports = {

    unzipArchive: async (pathToDirectory, file) => {

            //replace the extension of the file to .zip
            const pos = file.lastIndexOf(".");
            const fileRevised = file.substr(0, pos < 0 ? file.length : pos) + ".zip";

            //Rename the file on disk
            return new Promise((resolve, reject) => {
                const entryNames = [];
                fs.rename(`${pathToDirectory}/${file}`, `${pathToDirectory}/${fileRevised}`, function (err) {

                    //handle error when renaming
                    if (err) reject('ERROR: ' + err);

                    //Open a zip file
                    const zip = new StreamZip({
                        file: `${pathToDirectory}/${fileRevised}`,
                        storeEntries: true
                    });

                    // Handle errors while dealing with zip file
                    zip.on('error', err => {
                        console.error('something went wrong', err);
                    });

                    //Store the entries and file names for the sorting stage
                    zip.on('extract', (entry, file) => {
                        if(entry) {
                            entryNames.push({entry: entry.name, file});
                        }
                    });


                    // extract everything in the archive to a directory named extracted
                    zip.on('ready', () => {
                        fs.mkdirSync(`${pathToDirectory}/${file}`);
                        zip.extract(null, `${pathToDirectory}/${file}`, (err, count) => {
                            if (err) {
                                reject({
                                    message: 'Extract error',
                                    status: false
                                })
                            }
                            zip.close();
                            resolve({
                                message: `Extracted entries`,
                                status: true,
                                entries: entryNames
                            })
                        });
                    });

                });
            });
    }
};
