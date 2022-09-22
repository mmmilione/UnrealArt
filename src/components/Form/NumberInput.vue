<template>
    <input 
        type="text"
        :placeholder="placeholder"
        :required="isRequired"
        v-model="field"
    >

</template>

<script>
import { ref, watch } from 'vue';

    export default {
        props: ['isRequired', 'placeholder'],
        emits: ['change'],
        setup(props, context){
            const field = ref(0);
            watch(() => field.value, () => {
                if(isNaN(field.value)) return field.value = 0;
                if(field.value.length > 1 && field.value[0] == 0 && field.value[1] != "."){
                    return field.value = field.value.substring(1);
                }
                if(field.value) context.emit("change", field.value);
            })
            return { field };  
        }
    }
</script>

<style scoped>
    input{
        display: block;
        width: 90%;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid grey;
        color: black;
    }

    input:focus{
        outline: none !important;
        border:1px solid black;
        box-shadow: 0 0 10px whitesmoke;
    }
</style>