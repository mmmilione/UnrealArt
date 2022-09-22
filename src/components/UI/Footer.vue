<template>
    <div class="footer" :class="isWhite == true ? 'whiteCommons' : 'none'">
        Unrealart 2022 All Rights Reserved
    </div>
</template>

<script>
    export default {
        props: ['isWhite']
    }
</script>

<style scoped>
    .footer{
        position: relative;
        background-color: rgba(250, 245, 236, 0.2);
        text-align: center;
        font-size: 12px;
        padding: 20px;
        color: red;
        font-weight: bold;
        z-index: 5;
    }

    .whiteCommons{
        background-color: white !important;
        color: black !important;
    }
</style>