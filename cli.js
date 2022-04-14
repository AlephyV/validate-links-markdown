import getFile from "./index.js";
import validateURLs from "./http-validate.js";

const path = process.argv;

async function processText(path) {
    const result = await getFile(path[2]);
    
    if(path[3] == "valid") {
        console.log("links valids ", console.log(await validateURLs(result)));
    } else {
        console.log("list of links ", result);
    }
}

processText(path);
