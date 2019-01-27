import React,{Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
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
		purchasing:false,
		loading:false
	}
	componentDidMount()
	{
		axios.get('https://react-my-burger-82fb6.firebaseio.com/orders/ingredients.json').then(response=>{
			this.setState({ingredients:response.data});
		}).catch(error=>{});
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
      // alert('You Continue!!!!')
      this.setState({loading:true});
      const orders={
      	ingredients:this.state.ingredients,
      	price:this.state.totalPrice,
      	customer:{
      		name:"Max Muller",
      		address:{
      			street:"Test Street",
      			zipcode:'110062',
      			country:'India'

      		},
      		email:'abced123@gmail.com'

      	},
      	deliveryMethod:'fastest'

      }	
      axios.post('/orders.json',orders).then(response=>
      	{
      		this.setState({loading:false,purchasing:false});
      	}
      ).catch(error=>{
      	this.setState({loading:false,purchasing:false});
      });
   }

	render()
	{
	
		const disabledInfo={...this.state.ingredients};

		for(let key in disabledInfo)
			{
				disabledInfo[key]=disabledInfo[key] <= 0;
			}
		
		
		let orderSummary=null;
		let burger=<Spinner/>;
			if(this.state.ingredients)
			{
			burger=(
			<Auxiliary>
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

			orderSummary=<OrderSummary ingredients={this.state.ingredients} continue={this.updatePurchaseContinue} cancel={this.updatePurchaseCancel} price={this.state.totalPrice}/> ;
			}	

			if(this.state.loading)
			{
			orderSummary=<Spinner/>;
			}
		return(
			<Auxiliary>
			<Modal show={this.state.purchasing} modalClosed={this.updatePurchaseCancel}>
            {orderSummary}
			</Modal>
			{burger}
			</Auxiliary>
			);
	}
}

export default ErrorHandler(BurgerBuilder,axios);