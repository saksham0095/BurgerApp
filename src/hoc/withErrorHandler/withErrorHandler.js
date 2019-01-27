import React,{Component} from 'react';
import Aux from '../Auxiliary';
import Modal from '../../Components/UI/Modal/Modal';

const errorInstance=(WrappedComponent,axios)=>{

return class extends Component{

	state={
		error:null
	}

	componentDidMount()
	{
		this.reqInterceptor=axios.interceptors.request.use(req=>{
            this.setState({error:null});
            return req;
		});

		this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{ 
            this.setState({error:error});
	});

	}

	componentWillUnMount()
	{
		console.log("Will UnMount",this.reqInterceptor,this.resInterceptor);
		axios.interceptors.request.eject(this.reqInterceptor);
		axios.interceptors.request.eject(this.resInterceptor);
	}

	errorConfirmHandler=()=>{
		this.setState({error:null});
	}
	render()
	{
		return(
			<Aux>
			<Modal show={this.state.error} clicked={this.errorConfirmHandler}>
			{this.state.error?this.state.error.message:null}
			</Modal>
			<WrappedComponent {...this.props}/>

			</Aux>
			);
	}

}
}

export default errorInstance;
