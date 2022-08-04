import {ref} from "vue";

export function result(emit: any){

    const result = ref()

    const calc = (image: any, points: any ,imgSizeFactor: number) => {

        console.log(points)

        result.value = {
            image: image,
            labels: points.map((el: any) => {
                return {
                    x: el.x * imgSizeFactor,
                    y: el.y * imgSizeFactor
                }
            }),
            imgSizeFactor: imgSizeFactor
        }
        emit('save', result.value)
    }

    return {
        calc,
        result
    }
}