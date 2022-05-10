
const searchTAG = (array) => {
  let tagSet = new Set();

  const deleteUndef = (array) =>{
    array.forEach((value,index) => {
      if (typeof (value) === typeof undefined) {
        array.splice(index, 1)
      }
    })
  }

  const addTag = (array) =>{
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

export {searchTAG};