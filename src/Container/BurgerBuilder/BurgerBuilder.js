import React,{Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE={
	 salad: 0.5,
     cheese: 0.4,
   	 meat: 1.3,
   	 bacon: 0.7
}
class BurgerBuilder extends Component{

	state={
		ingredients:{
			salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
		},
		totalPrice:4,
		purchaseAble:false,
		purchasing:false
	}

    updatePurchase(updateIngredients)
    {
    	//const ingredients={...this.state.ingredients};
        const sum=Object.keys(updateIngredients).map(igKey=>{
        	return updateIngredients[igKey];
        }).reduce((sum,el)=>{
        	return sum+el
        },0);

        this.setState({purchaseAble:sum>0});
    }
	addIngredientHandler=(type)=>{
		const oldCount=this.state.ingredients[type];
		const updatedCount=oldCount+1;
		const updateIngredients={...this.state.ingredients};
		updateIngredients[type]=updatedCount;
		const price=INGREDIENT_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const updatedPrice=price+oldPrice;
		this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
        this.updatePurchase(updateIngredients);
	}

	removeIngredientHandler=(type)=>{
		const oldCount=this.state.ingredients[type];
		if(oldCount<=0)
		{
			return;
		}
		const updatedCount=oldCount-1;
		const updateIngredients={...this.state.ingredients};
		updateIngredients[type]=updatedCount;
		const price=INGREDIENT_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const updatedPrice=oldPrice-price;
		this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
		this.updatePurchase(updateIngredients);
	}

	updatePurchaseHanlder=()=>{
	
		this.setState({purchasing:true});
	}

	updatePurchaseCancel=()=>{
       this.setState({purchasing:false});
	}

	updatePurchaseContinue=()=>{
       alert('You Continue!!!!')	
   }

	render()
	{
		const disabledInfo={...this.state.ingredients};

		for(let key in disabledInfo)
			{
				disabledInfo[key]=disabledInfo[key] <= 0;
			}
		return(
			<Auxiliary>
			<Modal show={this.state.purchasing} modalClosed={this.updatePurchaseCancel}>
              <OrderSummary ingredients={this.state.ingredients} continue={this.updatePurchaseContinue} cancel={this.updatePurchaseCancel} price={this.state.totalPrice}/>
			</Modal>
			<Burger ingredients={this.state.ingredients}/>
			<BuildControls 
			ingredientAdded={this.addIngredientHandler} 
			ingredientRemoved={this.removeIngredientHandler} 
			disabledData={disabledInfo} 
			price={this.state.totalPrice}
			purchase={this.state.purchaseAble}
			ordered={this.updatePurchaseHanlder}/>
			</Auxiliary>
			);
	}
}

export default BurgerBuilder;