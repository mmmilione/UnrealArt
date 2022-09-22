<template>
    <div class="container">
        <div id="animationBox" class="box"></div>
        <FloatControlBTN 
            text="Controls" 
            icon="fas fa-arrows-alt" 
        />
        <MobControls />
    </div>
</template>

<script>

    import { onMounted } from 'vue';
    import { onBeforeRouteLeave } from 'vue-router';
    import { init3JS } from '../animations/threeD';
    import FloatControlBTN  from '../components/BTNs/FloatControlBTN.vue';
    import MobControls from '../components/UI/MobControls.vue';

    export default {
        components: { FloatControlBTN, MobControls },
        setup(){
            let animation;
            onMounted(() => animation = init3JS());
            onBeforeRouteLeave(() => {
                if(animation)clearInterval(animation);
            })
        }
    }
    
</script>