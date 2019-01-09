import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) =>{

const orderIngredients=Object.keys(props.ingredients).map(igKey=>{

	return <li key={igKey}><span style={{textTransform:'captialize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>;

});

return(
	<Aux>
	<h3>Your Order</h3>
	<p>A delicious burger with following ingredients:</p>
	<ul>
	{orderIngredients}
	</ul>
	<p>Total Price:<strong>{props.price.toFixed(2)}</strong></p>
	<p>Continue to Checkout?</p>
	<Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
	<Button btnType="Success" clicked={props.continue}>Continue</Button>
	</Aux>
);
}

export default orderSummary;