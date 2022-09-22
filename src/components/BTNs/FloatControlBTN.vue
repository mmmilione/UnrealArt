<template>
    <span ref="btn" class="center" @click="open">
        <i :class="icon"></i> <b>{{text}}</b>
    </span>
    <teleport to="body">
        <ControlModal 
            :isActive="isActive" 
            title="Controls" 
            @close="isActive=false" 
        />
    </teleport>
</template>

<script>
    import ControlModal from '../Modals/ControlModal.vue';
    import useBoilerplate from '../../hooks/useBoilerplate.js';
import { onMounted, ref } from 'vue';
    export default {
        props: ['icon', 'text'],
        components: { ControlModal },
        setup(){
            const { isActive } = useBoilerplate();
            const btn = ref(null);
            const open = () => {
                isActive.value=true;
                localStorage.setItem('control', true);
                btn.value.classList.remove('first-access');
            }
            onMounted(() => {
                if(localStorage.getItem('control') != "true"){
                    btn.value.classList.add('first-access');
                }
            })
            return { isActive, btn, open };
        }
    }
</script>

<style scoped>
    span{
        position: absolute;
        bottom: 80px;
        right: 60px;
        padding: 15px 25px;
        background-color: gray;
        color: white;
        font-size: 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.6s ease;
    }

    span:hover{
        font-size: 16.5px;
        transition: all 0.6s ease;
    }

    .first-access{
        animation: pulse linear 1.5s infinite;
    }

    @keyframes pulse {
        0% { 
            width:100px; 
            background-color: gray;
            color: white;
        } 
        50% { 
            width:105px; 
            background-color: rgb(102, 101, 101);
            color: yellow;
        } 
        100% { 
            width:100px; 
            background-color: gray;
            color: white;
        }
    }

    @media screen and (max-width: 800px) {
        span{ display: none };
    } 
</style>