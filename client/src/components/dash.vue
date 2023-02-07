
<template>
  <div style="background-color: none;">
    	<b-table  striped hover :items="getGames" :fields="fields">

       <template v-slot:cell(image)="row">
          <img :src="'https://' + getGames[row.index]['thumbUrl']" 
            width="50" height="50" alt="None" />
        </template>

      </b-table>
    </div>
</template>

<script>

export default {

  data() {
      return {
         fields: [
           { key: 'image', label: 'image' },
           { key: 'id', label: 'game_id' },
           { key: 'slug', label: 'slug' },
           { key: 'title', label: 'title' },
           { key: 'providerName', label: 'providerName' },
           { key: 'type', label: 'type' }
         ],

        alert : { msg: '', show: false },
      }
    },

  computed: {

    getGames () {
      return this.$store.state.games;
    },
    imageUrl (i) {
      let game = this.$store.state.games[i];
      //if (Object.keys(game).includes("thumbUrl")) return game.thumbUrl;
      return game;
    },
  },

  methods: {
  },

};
</script>

<style scoped>
</style>
