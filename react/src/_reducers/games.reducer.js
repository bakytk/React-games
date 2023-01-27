import { userConstants } from '../_constants';

export function games(state = {}, action) {
  switch (action.type) {
    case userConstants.GAME_REQUEST:
      return {
        loading: true
      };
    case userConstants.GAME_SUCCESS:
      return {
        items: action.games
      };
    case userConstants.GAME_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}