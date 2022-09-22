<template>
    <textarea 
        v-model="field"
        :placeholder="placeholder" 
        :required="isRequired"
    ></textarea>
</template>

<script>
    
    import { ref, watch } from 'vue';

    export default {
        props: ['isRequired', 'placeholder'],
        emits: ['change'],
        setup(props, context){
            const field = ref('');
            watch(() => field.value, () => context.emit("change", field.value))
            return { field };  
        }
    }
    
</script>

<style scoped>
    textarea{
        display: block;
        width: 90%;
        height: 100px;
        margin: 20px auto !important;
        padding: 10px;
        border: 1px solid grey;
        color: black;
        resize: none;
    }

    textarea:focus{
        outline: none !important;
        border:1px solid black;
        box-shadow: 0 0 10px whitesmoke;
    }
</style>