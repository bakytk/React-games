<template>
  <div>
	  
	  <div v-if="!smallDevice">
		  <div class="hero" :style="{ background: 'url(' + images[0]+ ') no-repeat center' }">

			<div class="web-text" >
				<p style="font-size: 20px; padding-top: 3%;"> {{ text }} </p>
			</div>
		  </div>
	  </div>

	  <div v-if="smallDevice">
		  <div class="mobile-text" 
		  		:style="{ background: 'url(' + images[1]+ ') no-repeat center' }">

			<div class="mobile-text" >
				<p style="font-size: 15px; padding-top: 10%;"> {{ text }} </p>
			</div>
		  </div>
	  </div>
	  
  </div>
	
</template>

<script>
	
import { bus } from '@/main'
import fetchPhoto from '@/mixins/PhotoAPI'
	
export default {

  data () {
	return {
	
		smallDevice: false,
	
		imgID: [934062, 4458553],
		images: [],
	
		text: '',
	}
  },
	
  computed: {
  },
	
  created () {
	
		try { fetchPhoto (this.imgID, this.images); } 
		catch(e) { console.error (e); }

		
		let id = this.$route.params['id'];
		//console.log('params id', id);

		if ( !id ) { this.text = 'Не указан индекс заметки'
		} else {
			this.$store.dispatch ('fetchNote', id);
		}
   },
	
  mounted () {

		if (this.$mq ==='mobile' || this.$mq ==='tablet') { 
			this.smallDevice = true; 
		}

		bus.$on('serverResponse', (msg) => {
	      this.text = msg;
	    });
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
	
	position: absolute;
    top: 40%;
    left: 40%;
	font-family: "Verdana", Geneva, sans-serif;
	font-weight: bold;
	color: #01233f;
	Z-index:777;
}

.mobile-text {
	
    top: 15%;
    height: 1000px;
    text-left: center;
	font-family: "Verdana", Geneva, sans-serif;
	font-weight: bold;
	color: #01233f;
	Z-index:777;
}

</style>
