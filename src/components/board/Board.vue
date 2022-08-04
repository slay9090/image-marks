<template>
  <div class="markup">
    <div class="markup_head">
      <input
        type="file"
        accept="image/jpeg"
        @change="file.uploadImage($event, markup.setImage)"
      />
    </div>

    <div class="markup_dashboard">
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
    <div class="markup_footer">
      <button @click="markup.undo">back</button>
      <button @click="markup.setMarks">setLabels</button>
      <button @click="markup.closePath">closePath</button>
      <button
        @click="
          dataSet.calc(
            file.previewImage,
            markup.pointsData.value,
            file.sizeFactor.value
          )
        "
      >
        saveDataSet
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { markuper, fileUpload, result } from "./utils";

export default defineComponent({
  setup(props, { emit }) {
    const markup = { ...markuper() };
    const file = { ...fileUpload() };
    const dataSet = { ...result(emit) };
    return {
      markup,
      file,
      dataSet,
    };
  },
});
</script>

<style scoped lang="scss">
#canvas {
  border: 1px solid black;
}
button, input {
  padding: 5px;
  margin: 5px;
}
.markup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
