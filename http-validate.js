import { link } from "fs";
import fetch from "node-fetch";

function generateArrayLinks(objectLinks) {
    return objectLinks.map(object => Object.values(object).join());
}

function handlingError(error) {
    throw new Error(error);
}

async function getLinkStatus(links) {
    try {
        const arrayResults = await Promise.all(links.map(async url => {
            const res = await fetch(url);
            return res.status;
        }));
    
        return arrayResults;
    } catch (error) {
        handlingError(error);
    }
    
}

async function validateURLs(objectLinks) {
    const links = generateArrayLinks(objectLinks);
    const statusLinks = await getLinkStatus(links);
    const results = objectLinks.map((object, indice) => ({
        ...object,
        status: statusLinks[indice]
      }))
    return results;
}


export default validateURLs;