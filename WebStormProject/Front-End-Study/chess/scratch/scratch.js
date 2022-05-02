const FILES = ["A","B","C","D","E","F","G","H"];

let count = -1;
FILES.map((value,index) => {
    if("E"=== value) {
        count = index;
    }
})

console.log(count)


