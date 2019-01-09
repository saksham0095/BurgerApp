import React,{Component}from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
state={
	showSideDrawer:false
}

showSideDrawerHandler=()=>{
	this.setState({showSideDrawer:false});
}

sideDrawerToggleHandler=()=>{
	this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer}
	});
}

render(){
return(
<Auxiliary>
<Toolbar drawToggleClicked={this.sideDrawerToggleHandler}/>
<SideDrawer openBackDrop={this.state.showSideDrawer} closed={this.showSideDrawerHandler}/>
<main className={classes.Content}>
{this.props.children}
</main>
</Auxiliary>
);
}
}

export default Layout;