<template>
  <main class="main-wrapper">
    <Tools></Tools>
    <Board @save="setData"></Board>
    <Result v-if="dataSets" :resultData="dataSets"></Result>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Board from "@/components/board/Board.vue";
import Tools from "@/components/tools/Tools.vue";
import Result from "@/components/result/Result.vue";

export default defineComponent({
  components: {
    Board,
    Tools,
    Result,
  },

  data() {
    return {
      dataSets: null,
    };
  },
  methods: {
    setData(data) {
      console.log("emit");
      this.dataSets = data;
    },
  },
});
</script>
<style lang="scss">
.main-wrapper{
  padding: 20px;
}
</style>
