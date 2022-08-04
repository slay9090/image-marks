import {ref} from "vue";

export function fileUpload() {

  const previewImage = ref(null)

  let sizeFactor = ref(1)

  // const getSizeFactor = () => {
  //   return sizeFactor
  // }

  const uploadImage = (e: any | null, fn: Function) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e: any) => {

      previewImage.value = null
      previewImage.value = e.target.result;
      const imageSrc = new Image();
      imageSrc.src = e.target.result;
      imageSrc.onload = function () {
        console.log(imageSrc.width, imageSrc.height)
        if(imageSrc.width > 300 || imageSrc.height > 300) {
          const maxFactor = Math.max(imageSrc.width, imageSrc.height)

          sizeFactor.value = maxFactor / 300
          console.log('sizeFactor:', sizeFactor.value)

        }
        fn(previewImage.value, sizeFactor.value)
      };


    };
  };

  return {
      previewImage,
      uploadImage,
      sizeFactor
  }
}
