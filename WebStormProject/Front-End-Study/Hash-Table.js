class Node{
    constructor(key=null,value=null,nodeLink=null) {
        this.key = key;
        this.value = value;
        this.nodeLink = nodeLink;// 연결리스트의 링크 노드
    }
}

class HashTable{
    constructor() {
        this.table =new Array(10000).fill(null).map(() => (new Node)); //체이닝을 위해 배열의 원소를 Null로 초기화 하고 새로운 node object 할당
        this.keyList = []; // key값의 중복을 막기 위함
    };

    checkOverlap(key){
        if (typeof(key) !== typeof('')){
            key = key.toString();
        }
        const keys = this.keyList;
        let truthy = keys.find((element) => element === key);
        if (!truthy){
            this.keyList.push(key);
            return true;
        }
        else {console.log('key에 중복되는 값을 할당할 수 없습니다.')
            console.log('-----------------------------SETTING-------------------------------');
            return false;
        }
    };

    setItem(key, value){ // key와 value를 받아 해쉬 함수를 거쳐 할당
        if (this.checkOverlap(key)) { // 중복이 없으면 undefined가 반환 되기 때문에 ! 연산자 사용
            const hashedKey = this.hashFunction(key, this.table.length);
            console.log('Key Of Functioned:', hashedKey);
            if (this.table[hashedKey].key === null) { // 해당 노드의 키 값이 존재하지 않는다면 (충돌 x)
                this.table[hashedKey].key = key;
                this.table[hashedKey].value = value;

                console.log('First Node :', this.table[hashedKey])
                console.log('-----------------------------SETTING-------------------------------');
            } else if (this.table[hashedKey].key != null) { //해시 키 값이 동일해 충돌이 일어난다면
                let standardValue = this.table[hashedKey].value //  기존 key인덱스의 노드가 가지는 value
                let targetNode = this.table[hashedKey];
                while (targetNode.nodeLink != null) {
                    targetNode = targetNode.nodeLink; // 연결 리스트의 끝으로 이동하여
                    console.log("---TAIL 찾는 중---");
                }
                console.log('Value Of Tail Node :', standardValue);
                console.log('Value Of Linking Node :', value);
                targetNode.nodeLink = standardValue !== value ? new Node(key, value, null) : null;
                console.log('Linking Completed Node :', this.table[hashedKey])// key가 동일한 기존의 node가 가지는 value와 입력받은 value가 다르면 새로운 노드를 링크
                console.log('-----------------------------SETTING-------------------------------');
            }
        }

    };

    getItem(key){// 같은 functioned key 여도 원본 key값은 다름 => 연결리스트 노드들 중 입력된 key값과 해당 노드의 key값이 일치하는 노드를 반환해야 함
        const hashedKey = this.hashFunction(key, this.table.length);
        let targetNode = this.table[hashedKey]
        //console.log('기본타겟:', targetNode);
        while (targetNode.nodeLink !== null) {
            if (targetNode.key === key) {
                console.log('You got :', targetNode);
                break;
            } else targetNode = targetNode.nodeLink;
        }
       if(targetNode.nodeLink === null){
           console.log( targetNode.key === key ? (targetNode):'해당 key에 대한 value를 가지는 노드가 존재하지 않습니다.');
        }
        console.log('-----------------------------GETTING-------------------------------');
    };

    hashFunction(key, tableSize) { // key값과 table의 총 길이를 입력받음(tableSize == table.length)
        let hashNum = 9973; // table 사이즈와 가까운 소수를 연산 숫자로 지정
        let newKey = 0;
        if (typeof(key) !== typeof('')){
            //key가 string 타입이 아니면 string으로 전환하기
            key = key.toString();
        }
        key = key.split(''); // map 메서드 사용을 위해 배열로 변환
        console.log(key)
        key.map(element => {
            if (element === Number(element)) return Number(element);
        })
        key.map((string, index) => {
            newKey += ( hashNum * string.charCodeAt(0)) % tableSize; // 각 배열 원소에 해쉬 연산후 모두 더함
        })
        newKey = Math.trunc((newKey / key.length)); //key의 총 길이로 나눠줌(더한 수의 평균)
        return newKey;
    };

    printNode(key){ // 해당 인덱스에 있는 모든 노드를 출력하는 함수
        const hashedKey = this.hashFunction(key, this.table.length);
        let standard = this.table[hashedKey];
        while(standard.nodeLink !==null){
            console.log(`${key}에 대한 Return :`,this.table[hashedKey]);
            standard = this.table[hashedKey].nodeLink;
        }
        console.log('-----------------------------PRINT NODES-------------------------------')
    }



}

let a = new HashTable();
a.setItem('Test',1)
a.setItem(901,2)
a.setItem('put',3)
a.setItem('h','sfsdf')
a.setItem('h','44444')
a.setItem('h','1111144')
a.setItem('Test',6)
a.getItem('Test')
