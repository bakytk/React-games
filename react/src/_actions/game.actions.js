import { userConstants } from '../_constants';
import { gameService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const gameActions = {
    getGames,
};


function getGames() {
    return dispatch => {
        dispatch(request());

        gameService.getGames()
            .then(
                games => {
                    dispatch(success(games));
                    //console.log("gameService", games);
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GAME_REQUEST } }
    function success(games) { return { type: userConstants.GAME_SUCCESS, games } }
    function failure(error) { return { type: userConstants.GAME_FAILURE, error } }
}
