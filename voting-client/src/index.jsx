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
// action creator(s)
import { setState, vote } from './action_creators';
// components
import App from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => 
	store.dispatch(setState(state))
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

