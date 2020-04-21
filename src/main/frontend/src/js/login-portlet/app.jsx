import styles from '../../css/login.css';
import LoginActions from './actions/login-actions';
import LoginContainer from './components/login-container.jsx';

export default class App extends React.Component{
	constructor(){
		super();
		let initialData = JSON.parse(jQuery('#data-container').text());
		LoginActions.registerCsrfToken(initialData.csrf);
	}

	render(){
		return <LoginContainer />;
	}
}