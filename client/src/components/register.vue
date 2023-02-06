<template>
	
  <div style="">	  
	<p style="height: 50px;">
		<b-alert show variant="primary" v-if="alert.show"> {{ alert.msg }} </b-alert>
	</p>

    <b-form @submit.prevent="onSubmit" v-if="display">		
      <b-form-group label="Username">
		<div class="center">
			<div :style="styleObj">
        	<b-form-input class="form-input" v-model="form.username" type="text" 
				required placeholder="" />
			</div>
		</div>
      </b-form-group>
      <b-form-group label="Password">
		<div class="center">
			<div :style="styleObj">
			<b-form-input
			  	class="form-input" v-model="form.password" type="password" 
				description="min 6-max 10 characters" required placeholder="min 6-max 10 characters" />
			</div>
		</div>
      </b-form-group>
	  <b-form-group label="Country">
		<div class="center">
			<div :style="styleObj">
			<b-form-input
			  	class="form-input" v-model="form.country" type="text" 
				required placeholder="" />
			</div>
		</div>
      </b-form-group>
	  <b-form-group label="Firstname">
		<div class="center">
			<div :style="styleObj">
			<b-form-input
			  	class="form-input" v-model="form.firstName" type="text" 
				required placeholder="" />
			</div>
		</div>
      </b-form-group>
	  <b-form-group label="Lastname">
		<div class="center">
			<div :style="styleObj">
			<b-form-input
			  	class="form-input" v-model="form.lastName" type="text" 
			  	required placeholder="" />
			</div>
		</div>
      </b-form-group>

      <b-button type="submit" variant="primary">REGISTER </b-button>
    </b-form>


  </div>
</template>

<script>	
	
export default {
	
    data() {
      return { 

      	smallDevice: false,
		display: true,
		form: { username: '', password: '', country:'', firstName:'', lastName:''}, 
		alert: { show: false, msg: ''}
	  }
    },

    computed: {
	  styleObj: function () {
	    return !this.smallDevice ? '{ width: 40%; }' : '{width: 80%;}'
	  }
	},
	
    methods: {
	
      onSubmit() {
		this.$axios.post('/user', {
			username: this.form.username,
			password: this.form.password,
			country: this.form.country,
			firstName: this.form.firstName,
			lastName: this.form.lastName
		})
		.then(resp => { 
			console.log("reg response:", resp);
			this.alert.msg = resp.data.message;
			this.alert.show = true;
			if (resp.status === 200) {
				this.display = false
			}
		}); 
      },

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
</style>
