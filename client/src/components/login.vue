<template>

  <div style="padding-top: 20%;; padding-bottom: 20%;">

	<p>
		<b-alert show variant="primary" v-if="alert.show"> {{ alert.msg }} </b-alert>
	</p>

	<p v-if="$route.query.redirect">
      Please re-login
    </p>
    <p v-if="error" class="error"
       style="padding-bottom: 5%;">
    	 Authorization error </p>

    <b-form @submit.prevent="onSubmit">

      <b-form-group label="E-mail:">
		<div class="center">
			<div :style="styleObj">
        	<b-form-input class="form-input" v-model="form.id" type="email"
					  required placeholder=""/>
			</div>
		</div>
      </b-form-group>

      <b-form-group label="Password:">
		<div class="center">
			<div :style="styleObj">
				<b-form-input
				  class="form-input" v-model="form.password" type="password"
							required placeholder=""/>
			</div>
		</div>
      </b-form-group>

      <b-button type="submit" variant="primary">ENTER</b-button>

    </b-form>

  </div>
</template>

<script>

import auth from '@/auth'

export default {

    data() {
      return {
      	smallDevice: false,
				form: { id: '', password: ''},
				alert: { show: false, msg: ''},
				error: false
			}
    },

    computed: {
		  styleObj: function () {
		    return !this.smallDevice ? '{ width: 40%; }' : '{width: 80%;}'
		  }
		},

    methods: {

      onSubmit() {

	      auth.login(this.form.id, this.form.password, loggedIn => {

	      	if (!loggedIn) {
	           this.error = true
	        } else {
	           this.$store.state.user = this.form.id;
	           this.$store.dispatch ('loadNotes');
	           this.$router.push('/dashboard');
	         }
	      })
	  }
    },

    mounted () {
			if (this.$mq ==='mobile' || this.$mq ==='tablet') { this.smallDevice = true; }
    },
  }
</script>


<style>

.form-input {
	width: 360px;
	background-color: rgba(0,0,255,.1)
}

.center {
	display: flex;
    justify-content: center;
    align-items: center;
}

.error {
    color: red;
  }

</style>
