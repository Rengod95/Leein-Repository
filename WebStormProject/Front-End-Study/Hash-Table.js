class Node{
    constructor(key=null,value=null,nodeLink=null) {
        this.key = key;
        this.value = value;
        this.nodeLink = nodeLink;
    }

    nodePrint(){
        console.log(`key:${this.key} | value:${this.value} | nodeLink:${this.nodeLink}`)
    }
}

class HashTable{
    constructor() {
        this.table =new Array(10000).fill(new Node);
    }; //체이닝을 위해 배열의 원소들을 배열로 할당

    setItem = (key, value) =>{ // key와 value를 받아 해쉬 함수를 거쳐 할당
        const hashedKey = this.hashFunction(key, this.table.length);
        if (this.table[hashedKey].key === null){ // 해당 노드의 키 값이 존재하지 않는다면 (충돌 x)
            this.table[hashedKey].key = key;
            this.table[hashedKey].value = value;
        }
        else if (this.table[hashedKey].key != null){ //해시 키 값이 동일해 충돌이 일어난다면
            let standard = this.table[hashedKey].nodeLink // 기존 key 인덱스의 노드가 가지는 next
            let standardValue = this.table[hashedKey].value //  기존 key인덱스의 노드가 가지는 value
            while(standard != null){
                standard = standard.nodeLink; // 연결 리스트의 끝으로 이동하여
            }
            standard = standardValue !== value ? new Node(key, value, null):null; // key가 동일한 기존의 node가 가지는 value와 입력받은 value가 다르면 새로운 노드를 링크
        }
    };

    getItem = (key) =>{
        const hashedKey = this.hashFunction(key, this.table.length);
        if (this.table[hashedKey].nodeLink === null){// 단 하나의 노드만 존재할 때
            this.table[hashedKey].nodePrint();
        }
        else{// 연결리스트 노드가 여러개 일 때
            let standard = this.table[hashedKey].nodeLink
            let standardKey = this.table[hashedKey].key
            while(standardKey !== key){// 해시 키가 다른 것이지 입력받은 키 값은 전부 다름
                standard = standard.nodeLink;
            }
            standard.nodePrint();
        }
    };

    hashFunction(key, tableSize) { // key값과 table의 총 길이를 입력받음(tableSize == table.length)
        let hashNum = 9973; // table 사이즈와 가까운 소수를 연산 숫자로 지정
        let newKey = 0;
        key = key.split(''); // map 메서드 사용을 위해 배열로 변환
        key.map((string, index) => {
            newKey += ( hashNum * string.charCodeAt(key[index])) % tableSize; // 각 배열 원소에 해쉬 연산후 모두 더함
        })
        newKey = Math.trunc((newKey / key.length)); //key의 총 길이로 나눠줌(더한 수의 평균)
        return newKey;
    }

}

let a = new HashTable();
a.setItem('John','OK');
a.setItem('John', 'IK');
a.getItem('John');
a.getItem('adf');

console.log(a.getItem('John'))