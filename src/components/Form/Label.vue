<template>
    <span :class="color">
        <i :class="icon"></i> {{text}}
    </span>
</template>

<script>
    export default {
        props: ['icon', 'text', 'color']
    }
</script>

<style scoped>
    span{
        font-size: 12px;
        text-align: left !important;
        display: block;
    }

    .white{
        color: white;
    }

    .black{
        color: black;
    }
</style>