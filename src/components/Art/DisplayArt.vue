<template>
    <div>

        <transition-group appear name="fadein">
            <h2 key="1">{{title.toUpperCase()}}</h2>
            <img key="2" :src="picture">
        </transition-group>

        <Divider />
        <Divider />
        <Divider />
        <Divider />

        <div class="center desk" id="backDesk">
            <BTN 
                text="Go Back" 
                icon="fas fa-arrow-circle-left"
                @click="router.push({name: 'Home'})"
            />
        </div>
        
    </div>

</template>

<script>

    import Divider from '../UI/Divider.vue';
    import useBoilerplate from '../../hooks/useBoilerplate.js';
    import BTN from '../BTNs/BTN.vue';

    export default {

        components: { Divider, BTN },
        props: ['title', 'picture'],

        setup() {
            const { router } = useBoilerplate(false);
            return { router };
        },
}
</script>

<style scoped>

    h2{
        color: white;
        padding: 60px;
    }

    img{
        display: block;
        width: 256px;
        height: 256px;
        margin: auto;
        border: 60px solid white;
    }

    .fadein-enter-from{
        opacity: 0;
        transform: scale(0.6);
    }

    .fadein-enter-active{
        transition: all 1s ease;
    }

    @media screen and (max-width: 800px){

        .desk{
            display: none !important;
        }

        img{
            display: block;
            width: 256px;
            height: 256px;
            border: 20px solid white !important;
        }

        h2{
            color: white;
            padding-top: 80px;
            padding-left: 20px;
        }
    }
</style>