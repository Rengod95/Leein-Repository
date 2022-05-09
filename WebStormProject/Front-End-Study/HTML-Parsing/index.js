import fetch from "node-fetch";

const openTagRegEx =/<[.*]*>/g
const flexibleRegEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
const closeTagRegEx = /<\/[a-zA-Z]*>/g
const naver = "http://www.naver.com/"

function separatorRegex(response,regex){ // string으로 변환된 promise 객체에서 태그 추출
  return Array.from(String(response).matchAll(regex)).map(value => [value[0],value.index]);
}

const response = await fetch(naver).then(function(response){
  return response.text()
})

console.log(...separatorRegex(response,flexibleRegEx),...separatorRegex(response,closeTagRegEx))

