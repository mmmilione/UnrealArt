<template>
    <h3>Style: <b class="styleApplied">{{art.style}}</b></h3>
    <p>Creator: <b>{{art.creator}}</b></p>
    <p>Iterations: <b>{{art.iterations}}</b></p>
    <p>Size: <b>{{art.size}}</b></p>
    <p>Creation Date: <b>{{time}}</b></p>
</template>

<script>

import { computed } from '@vue/reactivity';

    export default {
        props: ['art'],
        setup(props){
            const time = computed(() => {
                const date = new Date(props.art.timestamp);
                return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
            });
            return { time }
        }
    }

</script>

<style scoped>
    h3{
        margin-top: 120px;
    }
    .styleApplied{
        color: white;
        background-color: red;
        margin-left: 10px;
        padding: 3px 10px;
        border-radius: 5px;
    }

    @media screen and (max-width: 800px){
        h3{margin-top: 30px}
    }
</style>