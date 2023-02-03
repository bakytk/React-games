
<template>
  <ApolloQuery :query="query">
    <template slot-scope="{ result: { loading, error, data } }">
      <span v-if="loading">Loading...</span>
      <span v-else-if="error">An error occured</span>

      <section v-if="data">
        <ul v-if="data.allNameses.length">
            <li :key="name.id" v-for="name in data.allNameses" >
              {{name.name}}
            </li>
          </ul>

           <span v-else>No names, oh no :(</span>
      </section>
    </template>
  </ApolloQuery>
</template>

<script>
import { GET_WORDS } from "../mixins/gql_queries.js";
export default {
  name: "Words",
  data() {
    return {
      query: GET_WORDS
    };
  }
};
</script>

<style scoped>
</style>
