class Queue{
 constructor(){
	this.queue=[]
	this._queue=[]
	this.type='LIFO'
 }

 Queue(type){
		this.type=(type=='LOOP')?'LOOP':'LIFO'
 }

 put(work){
	 this.type=='LOOP'?(this.queue.push(work),this._queue.push(work)):this.queue.push(work)
 }

 get(){
	 if(this.queue.length){
		 return this.queue.shift()
	 }else{
		 if(this._queue.length){
			 this.queue=this._queue
		 }
		 return false;
	 }
 }
}
module.exports=new Queue;
