import axios from 'axios';

const instance=axios.create({
	baseURL:'https://react-my-burger-82fb6.firebaseio.com/'
});

export default instance;