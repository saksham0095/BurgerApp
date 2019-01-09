import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../UI/BackDrop/BackDrop';
const sideDrawer =(props)=>{

let sideDrawerthings=[classes.SideDrawer,classes.Close];

if(props.openBackDrop)
{
	sideDrawerthings=[classes.SideDrawer,classes.Open];
}
   return(
   	<Aux>
   	<BackDrop show={props.openBackDrop}  clicked={props.closed}/>
   		<div className={sideDrawerthings.join(' ')}>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav>
        <NavigationItems/>
        </nav>
   		</div>
   		</Aux>
   	);
};

export default sideDrawer;