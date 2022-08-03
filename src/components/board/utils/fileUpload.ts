import {ref} from "vue";

export function fileUpload() {

  const previewImage = ref(null)
  const uploadImage = (e: any | null, fn: Function) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e: any) => {
      previewImage.value = null
      previewImage.value = e.target.result;
      fn(previewImage.value)
    };
  };

  return {
      previewImage,
      uploadImage
  }
}
