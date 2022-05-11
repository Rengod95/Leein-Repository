import fetch from "node-fetch";
import { TagObject } from "./tagModules/tagObject.mjs";
import { searchTAG } from "./tagModules/searchTag.mjs";
import { seperateTag } from "./tagModules/seperate.mjs";
import { toObject } from "./tagModules/stringToObject.mjs";

const naver = "http://www.naver.com/";

const fetched = await fetch(naver)
  .then(function (response) {
    return response.text();
  })
  .then(function (response) {
    return seperateTag(response);
  });

const tagList = searchTAG(fetched);
const stack = toObject(fetched);
console.log(fetched);
console.log(stack);
