import Queue from './lib/queue';
import Distributed from './lib/distributed';
import Store from './lib/store';

class Flow{
	constructor(){
		this.version='1.0.3';
		this.actionTypes={};
		this.storeQueue=[];
		Queue.Queue('LOOP');
	}

	createActions(actionCreators){
		let name,creator,[actionsId,self,actions]=[(this.id++).toString(32),this,{}];
    for (name in actionCreators){
      creator=actionCreators[name];
      actions[name]=((creator,actionsId)=>{
        return (...args)=>{
          self.__dispatch__(actionsId,()=>{
            return creator.apply(null, Array.prototype.slice.call(args));
          });
        };
      })(creator,actionsId);
    }
    return actions;
	}

	createStore(callbacks){
		if(!callbacks){throw new Error('callbacks不能为空')}
		let proxyMethon={};
		proxyMethon.get=Store.get.bind(Store);
		proxyMethon.set=Store.set.bind(Store);
		proxyMethon.sub=Distributed.sub.bind(Distributed);
		proxyMethon.unsub=Distributed.unsub.bind(Distributed);
		this.storeQueue.push({
			store:Store,
			callbacks:callbacks
		});
		return proxyMethon;
	}

	combineFlow(middleware){
		typeof middleware==='function'&&Queue.put(middleware);
	}

	__callback__(bear){
		this.storeQueue.forEach((item)=>{
			let callback=item.callbacks[bear.type],result,changeKey;
			if(typeof callback==='function'){
				result=callback(item.store,bear);
				if(result!==undefined){
					Distributed.pub(result);
				}
			}
		})
	}

	__dispatch__(actionsId,action){
		let self=this,bear=action(),actionTypes=this.actionTypes,actionType=payload.type,lastId;
		if(!actionType) throw new Error('action指令不存在 \n'+JSON.stringify(payload,null,2));
		lastId=actionTypes[actionType];
		if(!lastId){
			actionTypes[actionType]=actionsId;
		}else if(lastId!==actionsId){
			throw new Error('action类型 "' + actionType + '" 重复');
		}
		let cb=(bear)=>{
			let result=Queue.get();
			;(result&&(result(bear,Store.store[bear.type],cb.bind(this,bear))));
			!result&&this.__callback__(bear);
		}
		cb(bear);
	}

}
let flow=new Flow;
flow.combineFlow((data,store,next)=>{
	next()
});
module.exports={combineFlow:flow.combineFlow.bind(flow),createActions:flow.createActions.bind(flow),createStore:flow.createStore.bind(flow)}