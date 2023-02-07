<template>
  <div>
	  <div v-if="!smallDevice">
		  <div class="hero" :style="{ background: 'url(' + images[0]+ ') no-repeat center' }">

			<div class="web-text" >
				<div style="font-size: 30px;">
					<div style="">{{ text }}</div>
				</div>
			</div>
		  </div>
	  </div>
	  <div v-if="smallDevice">
		  <div class="hero" :style="{ background: 'url(' + images[1]+ ') no-repeat center' }">

			<div class="mobile-text" >
				<p style="font-size: 20px;"> {{ text }} </p>
			</div>
		  </div>
	  </div>
  </div>
</template>

<script>
import fetchPhoto from '@/mixins/PhotoAPI'

export default {

  data () {
  	return {
  		smallDevice: false,
  		imgID: [373076, 2528118],
  		images: [],
  		text: 'Reels machine API',
  	}
  },

  computed: {
  },

  created () {
	try {
      fetchPhoto (this.imgID, this.images);
    }
	catch(e) {
      console.error ('created err:', e);
    }
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
.web-text {

	margin-left: auto;
    margin-right: auto;
    padding-top: 30%;
	font-family: "Verdana", Geneva, sans-serif;
	font-weight: bold;
	color: #01233f;
	Z-index:777;
}


.mobile-text {

	position: absolute;
    top: 40%;
    text-align: center;
	font-family: "Verdana", Geneva, sans-serif;
	font-weight: bold;
	color: #01233f;
	Z-index:777;
}

</style>
