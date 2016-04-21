module.exports={
	path:'Flow',
	getComponent(location,cb){
		require.ensure([],(require)=>{
			cb(null,require('./components/index'))
		})
	}
}
