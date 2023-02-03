<template>
  <div>
	  
	  <div v-if="!smallDevice">
		  <div class="hero" v-bind:style="{ background: 'url(' + images[0]+ ') no-repeat center' }">

			<template>
				<login></login>
		  	</template>

		  </div>
	  </div>

	  <div v-if="smallDevice">
		  <div class="hero" v-bind:style="{ background: 'url(' + images[1]+ ') no-repeat center' }">

			<template>
				<login></login>
		  	</template>
			  
		  </div>
	  </div>
	  
  </div>
	
</template>

<script>
	
import fetchPhoto from '@/mixins/PhotoAPI'
import login from '@/components/login.vue'
	
export default {
	
  components: {
	login,
  },

  data () {
	return {
	
		smallDevice: false,
	
		imgID: [373076, 2528118],
		images: [],

	}
  },
	
  computed: {
  },
	
  created () {
	
		try {
			fetchPhoto (this.imgID, this.images);
	
		} catch(e) { console.error (e); }
   },
	
  mounted () {

		if (this.$mq ==='mobile' || this.$mq ==='tablet') { this.smallDevice = true; }
  },
}
	
</script>

<style scoped>
	
.hero {
	width: 100%;
    height: 800px;
    background-size: cover;
	Z-index:0;
}

</style>
