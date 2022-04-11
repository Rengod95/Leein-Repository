class customMap {
    constructor() {
        this.table = {};
    };

    getData(key, value){
        this.key = key;
        this.value = value;
    }

    linking() {
        this.table[this.key] = this.value;
    }

}


