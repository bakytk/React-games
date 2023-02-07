<template>
  <div id="app" style="padding-bottom: 5%;">

	<div style="padding-top: 1%; padding-bottom: 2%;">
		<div class="text-center">
			<h5> {{ user }} </h5>
			<h5> {{ name }} </h5>
		</div>
	</div>

  <b-button @click.prevent="logout"
			  variant="danger" size="lg" class="btn-right"> Logout </b-button>

	<div style="padding-top: 4%; padding-bottom: 2%;">
		<div class="text-center">
			<h3> Games list </h3>
		</div>
	</div>

	<p>
		<b-alert show variant="primary" v-if="alert.show"> {{ alert.msg }} </b-alert>
	</p>

	<div style="padding-top: 1%; padding-bottom: 4%;">
		<b-form @submit.prevent="add">
			<b-row>
				<b-col cols="4">
			  		<b-button type="submit" variant="info"
			  			size="md"> Add new word </b-button>
			  	</b-col>
			    <b-col cols="6">
			        <b-form-input class="form-input" v-model="add_note_text" type="text" />
			    </b-col>
			</b-row>
		</b-form>
	</div>

	<b-modal ref="Editor" size="md" title="Enter text:" hide-footer>
		<editor @exit="hideEditor" :int="edit_note_id"></editor>
  	</b-modal>

	<b-modal ref="Sharer" size="md" title="Read access via link:" hide-footer>
		<sharer @exit="hideSharer" :link="shared_note_link"></sharer>
  	</b-modal>

	<template>
	  	<dash></dash>
	</template>

  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { bus } from '@/main'
import dash from '@/components/dash.vue'

export default {

	components: {
        dash,
    },

    data() {
      return {
		add_note_text: '',
		name: '',
		edit_note_id: -1,
		shared_note_link: '',
		alert: { show: false, msg: ''},
      }
    },
    computed: {
  		user () {
  			return this.$store.state.login
  		},
    },

	methods: {

     add () {
	    	this.$store.dispatch ('addNote', this.add_note_text);
		    },

		 logout () {
  			this.$store.state.user='';
  			this.$router.push('/login');
  			window.localStorage.removeItem('reels-app');
		},

		hideEditor () {
	    	this.$refs['Editor'].hide();
		},

		hideSharer () {
	    	this.$refs['Sharer'].hide();
		},
	},

	mounted () {

		//const claims = auth.parseJwt(localStorage.idToken)
    	//console.jwt(window.localStorage.idToken)
    	//this.name = claims['name']
	    bus.$on('serverResponse', (msg) => {
	      this.alert.msg = msg;
	      this.alert.show = true;
	    });

	    bus.$on('Unauthorized', () => {
	      this.logout()
	    });


      	this.$store.dispatch ('loadGames');
	}

}
</script>

<style scoped>

.center {
	display: flex;
	width: 50%;
    justify-content: center;
    align-items: center;
    color: #2c3e50;
}

</style>
