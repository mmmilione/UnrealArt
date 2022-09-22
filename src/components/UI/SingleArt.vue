<template>
    <div class="artbox">
        <div class="center" :class="isSelected == true ? 'selected' : ''">
            <h5>{{art.title}}</h5>
            <img :src="picture" alt="" @click="handleSelection">
            <h6>{{art.creator}}</h6>
        </div>  
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';

    export default {
        props: ['art'],
        emits: ['add', 'remove'],
        setup(props, context){

            const isSelected = ref(false)

            const picture = computed(()=> {
                if(props.art.picture){
                    return 'http://localhost:3500' + props.art.picture.split('artworks')[1];
                }
            })

            const handleSelection = () => {
                isSelected.value = !isSelected.value;
                if(isSelected.value == true) context.emit('add', props.art);
                if(isSelected.value == false) context.emit('remove', props.art); 
            }

            return { picture, isSelected, handleSelection }
        }
    }
</script>

<style scoped>

    h5{
        height: 30px;
    }

    img{
        width: 100%;
    }
    .artbox{
        padding: 20px;
        height: 400px;
    }

    .selected{
        border: 4px solid green;
    }
</style>