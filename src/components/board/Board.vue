<template>
<div>


  <input type="file" accept="image/jpeg" @change="file.uploadImage($event, markup.setImage)">

  <canvas id="canvas" width=300 height=300></canvas>
  <div class="emp"></div>
  <button @click="markup.undo"> back </button>
  <button @click="markup.setMarks"> setLabels </button>
  <button @click="markup.closePath"> closePath </button>
  {{markup.pointsData}}

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {markuper, fileUpload} from "./utils"

export default defineComponent( {



  setup(){

    const markup = {...markuper()}
    const file = {...fileUpload()}
    return {
      markup,
      file
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