import React, {Component} from 'react';
import testStore from '../store/store';
import testActions from '../action/action';
import '../combine/combine'

class App extends React.Component {
		constructor(name){
			super(name)
			testStore.set('update',[{id:1,text:'2131adasd'}])
			this.state={update:testStore.get('update')}
		}
    hanldeFetch(a,b){
            testActions.update.call(this,a,b)
        };
    hanldeData(){
            testActions.test.call(this)
        };

    componentDidMount () {
				testStore.sub('update',()=>{console.log('异步操作')});
                testStore.sub('test',()=>{console.log('正常读取数据')});
    };

    render () {

        return (
            <div>
                <a onClick={this.hanldeFetch.bind(this,'s','a')}>服务器取数据</a><br />
                <a onClick={this.hanldeData.bind(this)}>正常读取数据</a>
            </div>
        );
    };
};

export default App;
