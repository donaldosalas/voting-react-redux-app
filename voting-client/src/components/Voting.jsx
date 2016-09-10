// react
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// react-redux
import { connect } from 'react-redux';
// react components
import Winner from './Winner';
import Vote from './Vote';

// presentational component; 'pure' component;'dumb' component
export const Voting = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div>
			{ this.props.winner ?
				<Winner ref="winner" winner={this.props.winner} /> :
				<Vote {...this.props} />}
		</div>;
	}
});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		winner: state.get('winner')
	};
}

// connect creates a connected version of the Voting component; connected to redux store;
// 'connected' component;'smart' component
export const VotingContainer = connect(mapStateToProps)(Voting);