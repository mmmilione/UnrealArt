<template>
    <div class="feedbacks">
        <p class="error" v-if="error != null">{{error}}</p>
        <p class="success" v-if="isSuccess === true">
            <i class="fas fa-check"></i> {{ successMSG }}
        </p>
        <Loader v-if="isLoading" />
    </div>
</template>

<script>
    import Loader from '../UI/Loader.vue'
    export default {
        components: { Loader },
        props: ['isLoading', 'isSuccess', 'error', 'successMSG']
    }
</script>

<style scoped>
    .feedbacks{
        min-height: 80px;
        padding: 20px;
    }
    .success{
        text-align: center;
        background-color: lightgreen;
        color: green;
        font-weight: bold;
        padding: 7px 15px;
        border-radius: 5px;
    }

    .error{
        text-align: center;
        background-color: pink;
        color: red;
        font-weight: bold;
        padding: 7px 15px;
        border-radius: 5px;
    }
</style>