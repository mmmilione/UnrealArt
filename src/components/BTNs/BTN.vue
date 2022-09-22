<template>
    <div>
        <span class="btn" :class="styles">
            <i :class="icon" ></i> {{ text }}
        </span>
    </div>
</template>

<script>
    export default {
        props: ['text', 'styles', 'icon']
    }
</script>

<style scoped>
    .btn{
        color: white;
        padding: 10px 25px;
        border-radius: 7px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.8s ease;
        max-height: 30px;
        max-width: 70px;
    }

   .btn:hover{
        font-size: 16.5px;
        transition: all 0.6s ease;
   }

   div{ height: 30px;}
        
</style>

