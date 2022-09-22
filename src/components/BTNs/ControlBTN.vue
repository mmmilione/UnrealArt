<template>
    <i :class="arrow" class="controlBTN" :id="id"></i>
</template>

<script>
    export default {
        props: ['arrow', 'id']
    }
</script>

<style scoped>
    .controlBTN {
        position: relative;
        margin: 5px auto;
        display: inline-block;
        text-align: center;
        font-weight: bold;
        color: lightgray;
        font-size: 28px;
        background-color: gray;
        border-radius: 50%;
        border: 1px solid black;
    }

    .active{
        font-size: 42px !important;
        color: yellow !important;
    }

</style>