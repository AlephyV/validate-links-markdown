import { promises } from "fs";

function handlingError(error) {
    throw new Error(error);
}

function extractLinks(text) {
    const regex =  /\[([^$#\s.\]\[\)\(]*)\]\((https?:\/\/[^\s.#?].[^\s\/]*)*\/?\)/gm;
    const arrayResults = [];
    let temp;

    while( (temp = regex.exec(text)) !== null) {
        arrayResults.push({[temp[0]]: temp[1]});
    }

    return arrayResults.length == 0 ? "no links" : arrayResults;
}



async function getFile(path) {
    const encoding = "utf-8";

    try {
        const text = await promises.readFile(path, encoding);
        return extractLinks(text);
    } catch (error) {
        handlingError(error);
    }
}

getFile("arquivos/text.md");