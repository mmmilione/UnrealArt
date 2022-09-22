<template>
    <div class="spinner">
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
    
    .spinner {
        width: 50px;
        height: 50px;
        position: relative;
        margin: 10px auto;
    }
    .spinner div {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border: 8px solid transparent;
        border-top-color: red;
        border-radius: 50%;
        animation: spinnerOne 1.2s linear infinite;
    }
    .spinner div:nth-child(2) {
        border: 8px solid transparent;
        border-bottom-color: red;
        animation: spinnerTwo 1.2s linear infinite;
    }

    @keyframes spinnerOne {
        0% { transform: rotate(0deg); border-width: 10px; }
        50% { transform: rotate(180deg); border-width: 1px; }
        100% { transform: rotate(360deg); border-width: 10px; }
    }

    @keyframes spinnerTwo {
        0% { transform: rotate(0deg); border-width: 1px; }
        50% { transform: rotate(180deg); border-width: 10px; }
        100% { transform: rotate(360deg); border-width: 1px; }
    }

</style>