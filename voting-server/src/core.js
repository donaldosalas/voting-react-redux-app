import { List, Map } from 'immutable';

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

export const INITIAL_STATE = Map();

function getWinners(vote) {
	if (!vote) return [];
	
	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);
	
	if 			(aVotes > bVotes) return [a];
	else if (aVotes < bVotes) return [b];
	else									 return [a, b];
}

export function next(state) {
	// gets array from entries; concatenates the array values of the winners from getWinners
	const entries = state.get('entries')
											 .concat(getWinners(state.get('vote')));
	if (entries.size === 1) {
		return state.remove('vote')
								.remove('entries')
								.set('winner', entries.first());
	} else {
		return state.merge({
			vote: Map({pair: entries.take(2)}),
			entries: entries.skip(2)
		});
	}
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