import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
  key: 'reels-app',
  storage: window.localStorage
})

import { bus } from '@/main'
import { filterJSN } from '@/mixins'

export default new Vuex.Store({

  state: {
	  games: [],
	  token: '',
	  login: false,
	  balance: 0
  },

  getters: {
	  USER: state => () => {
     	return state.user
    },
	  GET_WORDS: state => () => {
     	return state.notes
    },
  },

  mutations: {
	SET_GAMES (state, arg) {
      	state.games = arg;
	},
	SET_TOKEN (state, arg) {
		state.token = arg;
  	},
	TOGGLE_LOGIN (state, arg) {
		state.login = arg;
  	},
	SET_BALANCE (state, arg) {
		state.balance = arg;
  	},
  },

  actions: {

	loadGames ({ commit, state }) {

		var config = {
			method: 'get',
			url: "https://reels.fly.dev/allGames",
			headers: {
				'Authorization': 'Bearer ' + state.token,
				'Content-Type': 'application/json'
			}
			};

		Vue.axios(config)
			.then(r => {
				console.log("allGames response: ", r.data)
				let data = r.data.data;
				if (data.length === 0) {
					bus.$emit('serverResponse', 'You have no words in vocabulary yet');
				}
				//let list = filterJSN (data);
				commit('SET_GAMES', data);
			}).catch(err => {
			console.error (err);
			bus.$emit('servereError!');
		});

	},

	setToken ({ commit, state }, arg) {
		commit('SET_TOKEN', arg);
	},

	setBalance ({ commit, state }, arg) {
		commit('SET_BALANCE', arg);
	},

	toggleLogin ({ commit, state }, arg) {
		commit('TOGGLE_LOGIN', arg);
	},

    fetchNote ({ commit, state }, arg) {

      	Vue.axios({
    			method: 'get',
    			url: 'https://test-bot.club/notes/fetch',
    			params: {
    				id: arg,
    			}
    		})
        .then(r => {
    			bus.$emit('serverResponse', r.data.message);
    		}).catch(err => { console.error ( err); });
    },

    mutate ({ commit, state, dispatch }, obj) {

	  	//console.log("obj", obj);
	  	let token = auth.getToken();
	  	let id = state.notes[obj.id]['note_id'];

      Vue.axios({
    			method: 'post',
    			url: 'https://test-bot.club/notes/mutate',
    			headers: {'Authorization': 'Bearer ' + token},
    			params: {
    				action: obj.action,
    				noteid: id,
    				txt: obj.txt
    			  }
    	})
      .then(r => {
        //console.log("r mutate\n", r);
  			bus.$emit('serverResponse', r.data.message);
  			if (r.data.shared) bus.$emit('noteShared', r.data.link);
  			if (r.data.message === 'Unauthorized') {

  				bus.$emit('Unauthorized'); }
  			else { dispatch('loadNotes'); }

  		}).catch(err => { console.error ( err); });
    }, //end-mutate

  },

  modules: {
  },

  plugins: [vuexPersist.plugin]
})
