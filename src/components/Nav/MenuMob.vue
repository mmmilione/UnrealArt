<template>
    <p class="mob">

        <transition name="open" mode="out-in">
            <i 
                class="fas fa-ellipsis-v red right" 
                v-if="state.isOpen == false" 
                @click="state.open">
            </i>
        </transition>

        <transition name="close" mode="out-in">
            <i 
                class="fas fa-window-close red right" 
                v-if="state.isOpen == true" 
                @click="state.close">
            </i>
        </transition>

    </p>

</template>

<script>

    import state from '../../store/state.js';

    export default {
        setup(){
            return { state };
        }
    }

</script>

<style scoped>

    .open-enter-from,
    .close-enter-from{
        transform: scale(0.6);
    }

    .open-enter-active,
    .close-enter-active{
        transition: all 0.6s ease;
    }

    .open-leave-to,
    .close-leave-to{
        opacity: 0;
    }

    .mob{
        display: none;
    }

    .fa-ellipsis-v,
    .fa-window-close{
        font-size: 22px;
        padding-top: 5px;
    }

    @media screen and (max-width: 800px){
        .mob{
            display: block !important;
        }
    }
</style>

