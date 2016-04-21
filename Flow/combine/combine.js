import {combineFlow} from 'react-flow'

combineFlow((data,store,cb)=>{
	if(data.url){
		fetch(data.url).then(function(response){
			return response.json();
		}).then(function(response){
			store[0]=response
			cb()
		})
		console.log('不是异步')
	}
});