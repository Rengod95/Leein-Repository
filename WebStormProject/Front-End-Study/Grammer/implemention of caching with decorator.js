function myPow(num,Dnum){
    return Math.pow(num,Dnum)
}

function myPowDecorator(myPow,Hash){
    let cache = new Map();
    return function(num,Dnum){
        let hashedKey = Hash(num,Dnum)
        if(cache.has(hashedKey)){
            return cache.get(hashedKey);
        }
        let notInCache = myPow.apply(this, aguments);
    }

}