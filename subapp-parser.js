const fs = require("fs")
const path = require("path")

 
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
 
  arrayOfFiles = arrayOfFiles || []
 
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })
 
  return arrayOfFiles
}



const basePath = process.cwd();

const srcDir = process.env.NODE_ENV === 'PRODUCTION' ? 'lib' : 'subapps'; //src'; //production' : 'development';

const subapps = getAllFiles("src");
console.log(subapps);
async function  main(){

  const server = await require("@xarc/fastify-server")({ deferStart: true }); 
  subapps.forEach(subapp=>{
    const url = subapp.replace("basePath","");
    console.log(url);  
  })
}


main();
