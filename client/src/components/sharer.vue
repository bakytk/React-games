
<template>
	  
	<div style="padding-top: 1%; padding-bottom: 4%;">
		<h5 style="color: blue"> {{ link }} </h5> 
	</div>
	  
</template>

<script>

import { bus } from '@/main'
	
	
export default {

  props: {
	
	  link: {
		type: String,
		default: ''
	  },
  },
	
  data() {
      return {
	
		change_note_text: '', 
      }
    },
	
  mounted () {
  },

  methods: {
	
		changeNote () {


			this.$store.dispatch ('mutate', { 
		        action: 'edit', 
		        id: this.int,
		        txt: this.change_note_text
		    });
		    bus.$emit('hideEditor');
			
		},
  },

	
};
</script>

<style scoped>
	
	
</style>