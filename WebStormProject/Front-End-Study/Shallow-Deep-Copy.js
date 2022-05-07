let array = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
let shallow = Array.prototype.slice.call(array);

console.log(shallow)