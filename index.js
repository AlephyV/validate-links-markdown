import fs from "fs";

function handlingError(error) {
    throw new Error(error);
}

function extractLinks(text) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResults = [];
    let temp;

    while( (temp = regex.exec(text)) !== null) {
        arrayResults.push({[temp[1]]: temp[2]});
    }

    return arrayResults.length == 0 ? "no links" : arrayResults;
}

async function getFile(path) {
    const encoding = "utf-8";

    try {
        const text = await fs.promises.readFile(path, encoding);
        return extractLinks(text);
    } catch (error) {
        handlingError(error);
    }
}

export {getFile};