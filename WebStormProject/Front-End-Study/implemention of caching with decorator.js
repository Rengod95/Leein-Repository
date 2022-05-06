function myPow(num){
    return Math.pow(num,num)
}

function myPowDecorator(decoratedFunction){
    let cache = new Map();
    return function(x){
        if(cache.has(x)){
            console.log("캐시 값 반환")
            return cache.get(x)
        }
        let notIncache = decoratedFunction(x);
        cache.set(x,notIncache);
        console.log("캐시에 결과 값 추가")
        return cache.get(x);
    }
}

myPow = myPowDecorator(myPow);
console.log(myPow(1));
console.log(myPow(1));
console.log(myPow(2));