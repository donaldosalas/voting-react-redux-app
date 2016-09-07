import { List, Map } from 'immutable';

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

export function next(state) {
	const entries = state.get('entries');
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});
}

export function vote(state, entry) {
	// updateIn() arguments:
	// 1. nested keys to get to target value
	// 2. if there is no value at the entry, assign the value 0
	// 3. if there is a value, call function with 'tally' as the present value
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
	);
}