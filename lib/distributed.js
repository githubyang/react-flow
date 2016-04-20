class distributed{
	constructor(){
		this.store={}
	}
	findIndex(store,type,callback){
		let index=-1
		store.forEach((e,i)=>{
			if(e&&e['type']===type||e.callback===callback) {
				return (index=i)
			}
		})
		return index;
	}
	
	sub(type,callback){
		if(typeof type=='string'&&typeof callback=='function'){
			if(!this.store[type]||!Array.isArray(this.store[type])){
				this.store[type]=[{type:type,callback:callback}]
			}else if(this.findIndex(this.store[type],type,callback)){
				this.store[type].push({type:type,callback:callback})
			}
		}
	}

	pub(type){
		if(typeof type=='string'){
			if(this.store[type]&&Array.isArray(this.store[type])){
				this.store[type].forEach((e,i)=>{
					e.callback.call(e.context,type)
				})
			}
		}
	}

	unsub(type,callback){
		if(typeof type=='string'){
			if (this.store[type]&&Array.isArray(this.store[type])){
				let i=this.findIndex(this.store[type],type,callback)
				i>=0?this.store[type].splice(i,1):''
			}
		}
	}
}
module.exports=new distributed;
