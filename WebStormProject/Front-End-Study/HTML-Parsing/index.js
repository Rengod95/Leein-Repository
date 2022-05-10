import fetch from "node-fetch";
import { TagObject } from "./tagModules/tagObject.mjs";
import {searchTAG} from "./tagModules/searchTag.mjs";
import {seperateTag} from "./tagModules/seperate.mjs";}

const openTagRegEx = /<[.*]*>/g;
const flexibleRegEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
const closeTagRegEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+(?<!\\s*)>/g;
const naver = "http://www.naver.com/";

const fetched = await fetch(naver).then(function(response){
  return response.text();
  }).then(function(response){
    return seperateTag(response);
})

const tagList = searchTAG(fetched);

console.log(fetched);
console.log(tagList)











