
<template>
	  
	<div style="padding-top: 1%; padding-bottom: 4%;">
		<b-form @submit.prevent="changeNote">
			<b-row>
				<b-col cols="4">
			  		<b-button type="submit" variant="info" 
			  			size="md"> Изменить </b-button>
			  	</b-col>
			    <b-col cols="6">
			        <b-form-input class="form-input" 
			        	v-model="change_note_text" type="text" />
			    </b-col>
			</b-row>
		</b-form> 
	</div>
	  
</template>

<script>

import { bus } from '@/main'
	
	
export default {

  props: {
	
	  int: {
		type: Number,
		default: -1
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