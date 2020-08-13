const fs = require('fs');
const {cleanUp} = require("./cleanUp");
const {unzipArchive}  = require('./unzip');
const {copyFiles} = require('./copyFiles');


const extractData =  pathToDirectory => {

    //Check The directory path
    if(!pathToDirectory) throw new Error('You must provide a path');
    if(!(typeof pathToDirectory == "string")) throw new Error('Path must be a string');

    fs.readdir(pathToDirectory, 'utf8', async (err, files) => {
        //Handle error while reading the directory
        if (err) console.error('Process failed due to: ', err.message);
        const resultsArray = [];
        const errorsArray = [];
        //copy files to new directory
        copyFiles(pathToDirectory, files);
        
         for (let i = 0; i <files.length; i++){
             const res = await unzipArchive(pathToDirectory, files[i]);
             if(!res.status) {
                 errorsArray.push(res);
             }
             resultsArray.push(res);
         }
         // fix bad archive error
        //sort data --> sort images, sort text per file
        //clean up --> delete redundant data
        await cleanUp(pathToDirectory); //
    });
};

module.exports = extractData;

