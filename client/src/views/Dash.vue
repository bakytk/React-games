<template>
  <div id="app" style="padding-bottom: 5%;">

  <b-button @click.prevent="logout"
			  variant="danger" size="lg" class="btn-right"> Logout </b-button>

	<div style="padding-top: 4%; padding-bottom: 2%;">
		<div class="text-center">
			<h3> Games list </h3>
		</div>
	</div>

	<div style="padding-top: 1%; padding-bottom: 4%;">
		<b-row>
			<b-col cols="4">
			  	<b-button type="submit" variant="info"
			  		size="md" @click="deposit"
					> Deposit: 20 coins to slot machine 
				</b-button>
			</b-col>
			<b-col cols="4">
			  	<p> 
					CURRENT PLYAER BALANCE: {{  balance }}
				</p>
			</b-col>
		</b-row>
	</div>

	<template>
	  	<dash></dash>
	</template>

  </div>
</template>

<script>

import Vue from 'vue'
import dash from '@/components/dash.vue'

export default {

	components: {
        dash,
    },

    data() {
      return {
      }
    },
    computed: {
  		user () {
  			return this.$store.state.login
  		},
		balance () {
  			return this.$store.state.balance
  		},
    },

	methods: {

		deposit() {
			this.$axios.post('/deposit', { "coin": 20})
			.then(resp => { 
				if (resp.status === 200) {
					let balance = resp.data.data.balance;
					console.log("balance", balance);
					this.$store.dispatch ('setBalance', balance);
				} else {
					console.log("deposit non-200 response:", resp)
				}
			}).catch(e => {
				console.log("deposit error:", e);
			})
	},

	logout () {
  			this.$store.state.user='';
  			this.$router.push('/login');
  			window.localStorage.removeItem('reels-app');
		},

	},

	mounted () {
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
