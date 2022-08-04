import {ref} from "vue";

export function result(){

    const result = ref()

    const calc = (image: any, points: any ,imgSizeFactor: number) => {

        console.log(points)

        result.value = {
           // image: image,
            labels: points.map((el: any) => {
                return {
                    x: el.x * imgSizeFactor,
                    y: el.y * imgSizeFactor
                }
            }),
            imgSizeFactor: imgSizeFactor
        }
    }

    return {
        calc,
        result
    }
}