import fetch from "node-fetch";
import { TagObject, Parser } from "./tagModules/TagObject.mjs";
import {
  seperateTag,
  delVoidTag,
  deleteTag,
  findTag,
} from "./tagModules/Seperator.mjs";
import { toObject } from "./tagModules/ArrayToObject.mjs";

const naver = "http://www.naver.com/";

let promise = await fetch(naver).then(function (response) {
  return response.text();
});

let fetched = findTag(deleteTag(delVoidTag(seperateTag(promise)), undefined));
console.log(fetched);
let tagObj = Parser(toObject(fetched));
