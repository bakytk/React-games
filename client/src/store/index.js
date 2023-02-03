import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
  key: 'vocab-app',
  storage: window.localStorage
})

import auth from '@/auth'
import { bus } from '@/main'
import { filterJSN } from '@/mixins'

export default new Vuex.Store({

  state: {
	  words: [],
	  user: '',
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
	  SET_WORDS (state, arg) {
      	state.words = arg;},
  },

  actions: {

	  loadNotes ({ commit, state }) {

      //getWords();

      var query = JSON.stringify({
    		query: `query POLISH { allPOLISH {
    			data {
    					form
    					english
    					polskie
    					pronunciation
    				}
    			}
    		}`
    	});

      var config = {
    	  method: 'post',
    	  url: "https://graphql.fauna.com/graphql",
    	  headers: {
    	    'Authorization': 'Bearer ' + "fnAEtOCvfNACSz_DtugvZK1JmIG4QFflwt5n3o_e",
    	    'Content-Type': 'application/json'
    	  },
    	  data : query
    	};

      Vue.axios(config)
        //.get('https://lingua.quest/polskie')
        .then(r => r.data)
			.then(d => {

        let data = d.data;
				console.log("server data", data.allPOLISH.data);

				if (data.length === 0) {
					bus.$emit('serverResponse', 'You have no words in vocabulary yet');
					commit('SET_WORDS', []);
        }

				//let list = filterJSN (data);
				commit('SET_WORDS', data.allPOLISH.data);

		  }).catch(err => {
          console.error ( err);
          bus.$emit('serverResponse', d.message);
      });

    },

    addNote ({ commit, state, dispatch }, arg) {

	  	let token = auth.getToken();
	    console.log("token", token);

      Vue.axios({

  			method: 'post',
  			url: 'https://test-bot.club/notes/add',
  			headers: {'Authorization': 'Bearer ' + token},
  			params: {
  				email: state.user,
  				text: arg,
  			}
  		})
      .then(r => {

			console.log("r add word\n", r);
			bus.$emit('serverResponse', r.data.message);
			if (r.data.message === 'Unauthorized') {
  				bus.$emit('Unauthorized'); }
  			else { dispatch('loadNotes');}
  		}).catch(err => { console.error ( err); });
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
