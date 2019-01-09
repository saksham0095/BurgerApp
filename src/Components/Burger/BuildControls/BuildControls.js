import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls=[
{label:'Salad',type:'salad'},
{label:'Bacon',type:'bacon'},
{label:'Cheese',type:'cheese'},
{label:'Meat',type:'meat'},

];
const buildControls = (props) => (
	<div className={classes.BuildControls}>
	<p>Current Price:<strong>${props.price.toFixed(2)}</strong></p>
	{controls.map(p => (
      <BuildControl added={()=>props.ingredientAdded(p.type)} removed={()=>props.ingredientRemoved(p.type)} disabledInfo={props.disabledData[p.type]} key={p.label} label={p.label}/>

		))}
    <button disabled={!props.purchase} className={classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
	</div>
);

export default buildControls;