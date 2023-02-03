<template>
	
  <div style="">
	  
	<p style="height: 50px;">
		<b-alert show variant="primary" v-if="alert.show"> {{ alert.msg }} </b-alert>
	</p>

    <b-form @submit.prevent="onSubmit">
		
      <b-form-group label="E-mail:">
		<div class="center">
			<div :style="styleObj">
        	<b-form-input class="form-input" v-model="form.id" type="email" 
					  required placeholder="" />
			</div>
		</div>
      </b-form-group>

      <b-form-group label="Password:">
		<div class="center">
			<div :style="styleObj">
			<b-form-input
			  class="form-input" v-model="form.password" type="password" 
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
	
		form: { id: '', password: ''}, 
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

      	//hash-pwd
	
		this.$axios.post('/register?id=' +this.form.id+ '&password=' +this.form.password)
		.then(resp => { 
	
			this.alert.msg = resp.data.message;
			this.alert.show = true;
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
