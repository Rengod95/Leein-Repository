class Node{
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor() {
        this.head = new Node('head');// 첫 노드의 값은 헤드로 지정
    }
    append(NewValue){
        let nextNode= new Node(NewValue);
        let currentNode = this.head;

       while(currentNode.next != null){ // Head노드 부터, 노드가 가리키는 다음 노드가 없을 떄 까지 (next 프로퍼티 값이 null일 때 까지)
           currentNode = currentNode.next;
       }
       currentNode.next = nextNode; // null임이 확인 되었을 때 파라미터로 들어온 노드를 next로 링크
    }

    findNode(valueData){//valueData를 value로 가지는 Node 찾기
        let currentNode = this.head;
        while (currentNode.value !== valueData){
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    findPreviousNode(valueData){
        let standard = this.head; // 헤드를 기준점으로
        while (standard.next != null && standard.next.value !== valueData){ // 다음 노드의 값이 존재하지만, value가 valueData와 다른, 즉 프로퍼티 값이 일치하지 않는 노드이면,
            standard = standard.next; // 찾고 있는 노드가 아니기에 next에 있는 노드 할당
        }
        return standard; // 다음 노드를 할당 받았는데 그 노드의 다음 노드가 조건에 부합하지 않는(value가 valueData와 일치하는 노드) 이면 그 노드가 우리가 찾는 노드이기 떄문에 next프로퍼티를 가지는 원본 노드를 반환
    }

    insertNode(newValue, valueData){
       let currentNode = this.findNode(valueData);
       let newNode = new Node(newValue);
       newNode.next = currentNode.next; // valueData를 value로 가지고 있는 노드(삽입할 위치의 왼쪽 노드)가 기존에 가리키는 다음 노드의 위치 값을 새로운 노드가 가리키도록 함
       currentNode.next = newNode; // 기존 노드가 가리키는 노드를 새로운 노드로 전환
    }

    removeNode(valueData){
        let preTargetNode = this.findPreviousNode(valueData); //삭제할 노드를 가리키는 노드를 찾기
        preTargetNode.next = preTargetNode.next.next; // 삭제할 노드가 가리키는 노드를 삭제할 노드를 가리키는 노드와 연결
    }

    printList(){
        let standard = this.head; // 헤드를 기준으로
        while (standard){ // 다음 노드가 없을 때 까지 (this.next === null)
            console.log(standard.value); //value값 출력
            standard = standard.next; // 출력 대상 노드에 다음 노드 링크
        }
    }
}

let linkedList = new LinkedList();
linkedList.append("a");
linkedList.append('b');
linkedList.append('c');
linkedList.insertNode('Insert_B','b');
linkedList.printList();
linkedList.removeNode('b');
linkedList.printList();
