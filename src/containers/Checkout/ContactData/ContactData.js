import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
class ContactData extends Component{
state={
	orderForm:{
	name: {
		elementType:'input',
		elementConfig:{
			type:'text',
			placeholder:'Enter your name'
		},
		value:'',
		validation:{
			required:true
		},
		valid:false,
		touched:false
	},
    street: {
		elementType:'input',
		elementConfig:{
			type:'text',
			placeholder:'Enter your street'
		},
		value:'',
		validation:{
			required:true
		},
		valid:false,
		touched:false
	},
    zipCode:{
		elementType:'input',
		elementConfig:{
			type:'text',
			placeholder:'Enter your zipCode'
		},
		value:'',
		validation:{
			required:true,
			minlength:5,
			maxlength:5
		},
		valid:false,
		touched:false
	},
    country: {
		elementType:'input',
		elementConfig:{
			type:'text',
			placeholder:'Enter your country'
		},
		value:'',
		validation:{
			required:true
		},
		valid:false,
		touched:false
	},
    email: {
		elementType:'input',
		elementConfig:{
			type:'email',
			placeholder:'Enter your email'
		},
		value:'',
		validation:{
			required:true
		},
		valid:false,
		touched:false
	},
    deliveryMethod:  {
		elementType:'select',
		elementConfig:{
			options:[
			{value:'fastest', displayValue:'Fastest'},
			{value:'cheapest', displayValue:'Cheapest'}]
		},
		value:''
	}
    },
	loading:false
}

checkValidity(value,valid){
	let isValid=true;

	if(valid.required){
		isValid=value.trim()!=='' && isValid;
	}

	if(valid.minlength)
	{
		isValid=value.length >= valid.minlength && isValid;
	}

	if(valid.maxlength)
	{
		isValid=value.length <= valid.maxlength && isValid;
	}

	return isValid;
}
orderHandler=(event)=>
{
	event.preventDefault();
	const formData={};
	for(let formElementIdentifier in this.state.orderForm)
	{
		formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
	}	
	 this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
	
}
inputChangedHandler=(event,uniqueIdentifier)=>{
	const updatedForm ={...this.state.orderForm};
	const updatedInput={...updatedForm[uniqueIdentifier]};
	updatedInput.value=event.target.value;
	updatedInput.valid=this.checkValidity(updatedInput.value,updatedInput.validation);
	updatedInput.touched=true;
	updatedForm[uniqueIdentifier]=updatedInput;
	console.log(updatedForm);
	this.setState({orderForm:updatedForm});

}
render()
{
	const formElementArray=[];
	for(let key in this.state.orderForm)
	{
		formElementArray.push({
			id:key,
			config:this.state.orderForm[key]
		})
	}	
	let form=(<form onSubmit={this.orderHandler}>
		{formElementArray.map(formElement=>(
			<Input key={formElement.id} elementType={formElement.config.elementType} touched={formElement.config.touched} elementConfig={formElement.config.elementConfig} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} value={formElement.config.value} changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
			))}
		<Button btnType="Success">ORDER</Button>
		</form>);
	if(this.state.loading)
	{
		form=<Spinner/>;
	}	
	return (<div className={classes.ContactData}>
		<h4>Enter your Contact Data:</h4>
		{form}
		</div>);
}
}
const mapStateToProps=state=>{
	return{
		ings:state.ingredients,
		price:state.totalPrice
	}
}
export default connect(mapStateToProps)(ContactData);