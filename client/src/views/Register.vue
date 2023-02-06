<template>
  <div>
	  <div v-if="!smallDevice">
		  <div  class="web-wrapper" 
		  		:style="{ background: 'url(' + images[0]+ ') no-repeat center' }">
		  	<div style="padding-top: 20%; padding-bottom: 10%;">
				<template>
					<register></register>
			  	</template>
		  	</div>
		  </div>
	  </div>
	  <div v-if="smallDevice">
		  <div  class="mobile-wrapper" 
		  		:style="{ background: 'url(' + images[1]+ ') no-repeat center' }">
		  	<div style="padding-top: 15%; padding-bottom: 15%;">
				<template>
					<register></register>
			  	</template>
		  	</div> 
		  </div>
	  </div>
  </div>
</template>

<script>
import fetchPhoto from '@/mixins/PhotoAPI'
import register from '@/components/register.vue'
	
export default {
	
  components: {
	register,
  },

  data () {
	return {
		smallDevice: false,	
		imgID: [373076, 2528118],
		images: [],
	}
  },
	
  computed: {
	styleObj: function () {
	    return !this.smallDevice ? '{ width: 30%; }' : '{width: 80%;}'
	  }
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

.web-wrapper {
	width: 100%;
    height: 800px;
    background-size: cover;
	Z-index:0;
}
	
.mobile-wrapper {
	width: 100%;
    height: 1000px;
    background-size: cover;
	Z-index:0;
}

</style>
