function* standardIterator(start=0,end=0){
    while(!(start === end)){
        yield  start++;
    }
    return start;
}

let gen = standardIterator(0,10);
let arr = ['a', ...gen];
console.log(arr)