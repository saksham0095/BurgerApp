import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';
const modal =(props)=>(
	<Aux>
	<BackDrop show={props.show} modalStop={props.modalClosed}/>
	<div  style={{
		transform:props.show?'translateY(0)':'translateY(-100vh)',
		opacity:props.show?'1':'0'
	}} 
	className={classes.Modal}>
		{props.children}
	</div>
	</Aux>
);

export default modal;