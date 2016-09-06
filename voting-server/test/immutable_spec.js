import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
	// show that incrementing a number is an immutable process
	describe('a number', () => {
		// pure function
		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});

	});

	describe('A List', () => {
		//pure function with lists
		function addMovie (currentState, movie) {
			return currentState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Trainspotting', '28 Days Later');
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.equal(List.of(
				'Trainspotting',
        '28 Days Later',
        'Sunshine'
				));
			
			expect(state).to.equal(List.of(
				'Trainspotting',
        '28 Days Later'
			));
		});

	});

	describe('a tree', () => {
		// // pure function
		// function addMovie(currentState, movie) {
		// 	return currentState.set(
		// 		'movies',
		// 		currentState.get('movies').push(movie)
		// 	);
		// }
		
		// pure function; using immutables helper function to reach nested structures
		function addMovie(currentState, movie) {
			return currentState.update(
				'movies',
				movies => movies.push(movie)
			);
		}
		
		it('is immutable', () => {
			let state = Map({
				movies: List.of('Trainspotting', '28 Days Later')
			});
			let nextState = addMovie(state, 'Sunshine');
			// expect the new state to be a new object
			expect(nextState).to.equal(Map({
				movies: List.of(
					'Trainspotting',
					'28 Days Later',
					'Sunshine'
					)
			}));
			// expect the previous state to remain unmodified
			expect(state).to.equal(Map({
				movies: List.of(
					'Trainspotting',
					'28 Days Later'
					)
			}));
		});

	});

});