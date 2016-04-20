class store{
	constructor(){
		this.store={}
	}

	get(key){
		return this.store[key];
	}

	set(key,value){
		key&&value&&(this.store[key]=value);
		return key;
	}

	del(key){
		if(this.store[key]){
			delete this.store[key];
			return key;
		}else{
			return false;
		}
	}
}
module.exports=new store;
