export const seperateTag = (string) =>{
  let tmpArray = string.split('>').map(value => value.replaceAll('\n',' ').split('<')[1])
  return tmpArray.slice(1, tmpArray.length);
}

