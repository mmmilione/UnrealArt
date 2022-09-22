<template>
    <h1>
        <i :class="icon"></i>
    </h1>
</template>

<script>
        
    export default {
        props: ['icon']
    }

</script>

<style scoped>
    h1{
        position: fixed;
        bottom: 60px;
        right: 60px;
        padding: 10px 20px;
        background-color: red;
        color: white;
        font-size: 24px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.6s ease;
    }

    h1:hover{
        font-size: 25px;
        transition: all 0.6s ease;
    }

    @media screen and (max-width: 800px) {
        h1{
            bottom: 0px;
            right: 10px;
            z-index: 18;
            font-size: 20px;
        }
    }

</style>