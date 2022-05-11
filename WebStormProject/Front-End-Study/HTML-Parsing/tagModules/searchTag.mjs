
export const searchTAG = (array) => {
  let tagSet = new Set();

  const deleteUndef = (array) =>{ //html 태그 리스트중 undefined 형 삭제
    array.forEach((value,index) => {
      if (typeof (value) === typeof undefined) {
        array.splice(index, 1)
      }
    })
  }

  const addTag = (array) =>{ //사용된 모든 태그를 서칭해 세트로 만듬
    array.forEach(value => {
      if(value.charAt() === '/'){
        tagSet.add(value.slice(1,value.length));
      }
    })
  }

  deleteUndef(array);
  addTag(array);

  return tagSet;
}

