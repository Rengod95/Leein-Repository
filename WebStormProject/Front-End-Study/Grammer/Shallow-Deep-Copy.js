function getList(className, length){
    //className은 리스트의 클래스 이름
    //length는 몇번째 까지 얻을지
    var elementsArr= document.getElementsByClassName(className);
    var dataArr=[];

    //만약 길이를 넘겨받지 않았다면
    if(!length){
        length=elementsArr.length;
    }

    function getDataFromElements(){
        var Arr=[];
        for(var i=0; i<length; i++){
            Arr[i]=elementsArr[i].innerText;
        }
        return Arr;
    }

    function showData(){
        for(var i=0; i<length; i++){
            console.log(dataArr[i]);
        }
    }

    dataArr=getDataFromElements();
    showData();
}

//getList("title may-blank");//https://www.reddit.com/
//getList("ah_item",20);	//https://www.naver.com/

var doParse=getList("ah_item",20);

doParse;