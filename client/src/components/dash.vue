
<template>
  <div style="background-color: none;">
    	<b-table  striped hover :items="getGames" :fields="fields">

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
           { key: 'id', label: 'game_id' },
           { key: 'slug', label: 'slug' },
           { key: 'title', label: 'title' },
           { key: 'providerName', label: 'providerName' },
           { key: 'tumbUrl', label: 'thumbUrl' }
         ],

        alert : { msg: '', show: false },
      }
    },

  computed: {

    getGames () {
      return this.$store.state.games;
    },
  },

  methods: {

    change (i) {
      let int = i;
      //console.log ('chg int \n', int);
      bus.$emit('showEditor', int);

    }
  },

};
</script>

<style scoped>
</style>
