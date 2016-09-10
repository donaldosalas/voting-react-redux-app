import makeStore from './src/store';
import { startServer } from './src/server';

export const store = makeStore();
startServer(store);

// loads the initial entries from a json file
store.dispatch({
	type: 'SET_ENTRIES',
	entries: require('./entries.json')
});
// initiates the first vote pair
store.dispatch({type: 'NEXT'});