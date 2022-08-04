<template>
<div>


  <input type="file" accept="image/jpeg" @change="file.uploadImage($event, markup.setImage)">

  <canvas id="canvas" width=300 height=300></canvas>
  <div class="emp"></div>
  <button @click="markup.undo"> back </button>
  <button @click="markup.setMarks"> setLabels </button>
  <button @click="markup.closePath"> closePath </button>
  <button @click="dataSet.calc(file.previewImage, markup.pointsData.value, file.sizeFactor.value)"> saveDataSet </button>
  {{markup.pointsData}}
  {{dataSet.result}}
  ---------
  {{file.sizeFactor}}

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {markuper, fileUpload, result} from "./utils"

export default defineComponent( {



  setup(){
    const markup = {...markuper()}
    const file = {...fileUpload()}
    const dataSet = { ...result() }
    return {
      markup,
      file,
      dataSet
    }
  }

})




</script>

<style scoped lang="scss">
#canvas{
  border:1px solid black;
}
.emp{
  width: 100%;
  height: 200px;
}
</style>