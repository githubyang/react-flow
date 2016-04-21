import {createStore} from 'react-flow'

const store=createStore({
	'update':(store,action)=>{
		console.log(store,action);
		return 'update';
	},
	'test':(store,action)=>{
		console.log(store,action);
		return 'test';
	}
});
export default store;