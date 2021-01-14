import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={SignInSide} />
					<Route exact path="/signup" component={SignUp} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
