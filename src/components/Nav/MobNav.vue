<template>
    
    <div class="mob-nav" :class="state.isOpen == true ? 'open' : ''">
        <p>
            <router-link to="/FAQ">
                <i class="fas fa-question-circle"></i> FAQs
            </router-link>
        </p>
        <p>
            <router-link to="/contacts">
                <i class="fas fa-envelope"></i> Contacts
            </router-link>
        </p>
        <p>
            <a href="https://github.com/mmmilione/UnrealArt" target="_blank">
                <i class="fab fa-github"></i> GitHub
            </a>
        </p>
        <Divider />
        <Divider />
        <transition name="fadein">
            <Connect styles="center" v-if="state.isOpen == true"/>
        </transition>
        
    </div>
    
</template>

<script>
    import state from '../../store/state.js';
    import { cutWallet } from '../../helpers/help.js';
    import Connect from './Connect.vue';
import Divider from '../UI/Divider.vue';
    
    export default {
        components: { Connect, Divider },
        setup() {
            return { state, cutWallet };
        }
    }
</script>

<style scoped>

    p{
        padding-bottom: 40px;
    }

    a{
        font-size: 20px;
    }
    .mob-nav{
        display: none;
        position: fixed;
        z-index: 19;
        background-color: white;
        color: black;
        width: 100%;
        height: 0vh;
        padding-left: 30px;
        padding-top: 100px;
    }

    .open {
        display: block;
        animation: open 0.6s alternate;
        animation-fill-mode:forwards;
        animation-iteration-count: 1;
    }

    .fa-check-circle{
        color: green;
    }

    @keyframes open {
        0%{ height: 0vh;}
        20%{ height: 20vh;}
        50%{ height: 50vh;}
        70%{ height: 70vh;}
        100%{ height: 100vh;}
    }

    .fadein-enter-from{
        opacity: 0;
    }

    .fadein-enter-active{
        transition: all 1s ease;
        transition-delay: 0.8s;
    }
    
</style>