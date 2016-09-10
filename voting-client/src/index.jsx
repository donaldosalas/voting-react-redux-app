// react
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// socket.io
import io from 'socket.io-client';
// reducer
import reducer from './reducer';
// components
import App from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';

const store = createStore(reducer);
store.dispatch({
	type: 'SET_STATE',
	state: {
		vote: {
			pair: ['Sunshine', '28 Days Later'],
			tally: { Sunshine: 2}
		}
	}
});

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => 
	store.dispatch({ type: 'SET_STATE', state })
);

const routes = <Route component={ App }>
	<Route path="/results" component={ ResultsContainer } />
	<Route path="/" component={ VotingContainer } />
</Route>;

ReactDOM.render(
	<Provider store={ store }>
		<Router history={hashHistory}>{ routes }</Router>
	</Provider>,
	document.getElementById('app')
);

