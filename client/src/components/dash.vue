
<template>
  <div style="background-color: none;">
    	<b-table  striped hover :items="getNotes" :fields="fields">

       <template v-slot:cell(edit)="row">
          <b-btn variant="success" size="md" class="btn-circle" @click="change (row.index)">
            <b>Change</b></b-btn>
          <!-- <b-btn variant="info" size="md" class="btn-circle" @click="share (row.index)">
            <b style="color: white">Share</b></b-btn> -->
          <b-btn variant="danger" size="md" class="btn-circle" @click="del (row.index)">
            <b>Delete</b></b-btn>
        </template>

      </b-table>
    </div>
</template>

<script>

import { bus } from '@/main'
import { mapGetters } from 'vuex';

export default {

  data() {
      return {
         fields: [
           { key: 'english', label: 'English' },
           { key: 'polskie', label: 'Polskie' },
           { key: 'form', label: 'Form' },
           { key: 'pronunciation', label: 'Pronunciation' },
           { key: 'Edit', label: 'Edit' }
         ],

        alert : { msg: '', show: false },
      }
    },

  computed: {

		//...mapGetters (['GET_NOTES']),
    getNotes () {
      return this.$store.state.words;
    },
  },

  methods: {

    change (i) {
      let int = i;
      //console.log ('chg int \n', int);
      bus.$emit('showEditor', int);

    },

    share (i) {
      let int = i;
      //console.log ('share int \n', int);
      this.$store.dispatch ('mutate', {
        action: 'share',
        id: int,
        txt: ''
      });
    },

    del (i) {
      let int = i;
      //console.log ('del int \n', int);
      this.$store.dispatch ('mutate', {
        action: 'del',
        id: int,
        txt: ''
      });
    },
  },

};
</script>

<style scoped>
</style>
