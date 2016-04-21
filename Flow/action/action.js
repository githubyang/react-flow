import {createActions} from 'react-flow'

const action=createActions({
	'update':(type,query)=>({
		type:'update',
		url:`http://localhost:8080/json.json?s=${type}/${query}`
	}),
	'test':()=>({
		type:'test'
	})
});

export default action