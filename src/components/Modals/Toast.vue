<template>

    <transition name="toast">
        <div v-if="text!=null" :class="styles">
            {{text}}
        </div>
    </transition>
    
</template>

<script>

import { watch } from 'vue';

    export default {
        emits: ['vanish'],
        props: ['text', 'styles'],
        setup(props, context){
            watch(()=> props.text, ()=> {
                if(props.text != null) setTimeout(() => context.emit('vanish'), 4000);
            });
        }
    }
</script>

<style scoped>

    div{
        position: fixed;
        top: 100px;
        right: 70px;
        max-width: 300px;
        text-align: center;
        font-weight: bold;
        border-radius: 5px;
        padding: 10px;
    }

    .successToast{
        background-color: lightgreen;
        color: green;
    }

    .errorToast{
        background-color: pink;
        color: red;
    }

    .toast-enter-active{
        animation: wobble 0.5s linear;
    }

    @keyframes wobble{
        0%{
            opacity: 0;
            transform: translateY(-150px);
        }
        50%{
            opacity: 1;
            transform: translateY(0);
        }
        60%{transform: translateX(-8px)}
        70%{transform: translateX(8px)}
        80%{transform: translateX(-4px)}
        90%{transform: translateX(4px)}
        100%{transform: translateX(0px)}
    }


</style>