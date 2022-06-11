<template>
  <div class="about">
    <h1>{{ items }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
  },
};
</script>
