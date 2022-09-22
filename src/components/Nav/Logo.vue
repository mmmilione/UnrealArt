<template>
    <h1 @click="router.push({name: 'Home'})">
        Unreal<span class="a">A</span><span class="r">R</span><span class="t">T</span>
    </h1>
</template>

<script>
import useBoilerplate from '../../hooks/useBoilerplate';

    export default {
        setup(){
            const { router } = useBoilerplate();
            return { router }
        }
    }
</script>

<style scoped>
    h1{
        font-family: Sedgwick Ave Display;
        color: black;
        padding-left: 7vw;
        cursor: pointer;
    }

    .a{
        color: red;
    }

    .r{
        color: red;
    }

    .t{
        color: red
    }
</style>