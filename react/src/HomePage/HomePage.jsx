
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { gameActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getGames();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users, games } = this.props;
        //console.log("props games", games);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <h3>List of games:</h3>
                {games.loading && <em> Loading games...</em>}
                {games.error && <span className="text-danger">ERROR: {games.error}</span>}
                {games.items &&
                    <ul>
                        {games.items.map((game, index) =>
                            <li key={game.id}>
                                {game.title}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, games } = state;
    const { user } = authentication;
    //console.log("mapstate games", games);
    return { user, users, games };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getGames: gameActions.getGames,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };