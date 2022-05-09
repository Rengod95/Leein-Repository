// function show(a,b){
//     console.dir(arguments);
//     console.log(a,b);
//     console.dir(arguments.length);
// }
// show(1,2)

let a = 1; // 전역 컨텍스트
function outer () { // outer 컨텍스트
    function inner () { // inner 컨텍스트
        console.log(a); // undefined
        let a = 3;
        console.log(a); // 3
    }
    inner();
    console.log(a); // 1
}
outer();
console.log(a); // 1