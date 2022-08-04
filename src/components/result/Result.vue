<template>
  <pre class="result">
      <code class="result_code">
          {{ resultData }}
      </code>
    </pre>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    resultData: {
      type: Object,
      default: null
    }
  }
})

</script>

<style scoped lang="scss">
.result{
  height: 40%;
  &_code{
    max-width: 60vw;
    display: block;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow-y: auto;
    max-height: 36vh;
    background-color: antiquewhite;
  }
}
</style>
