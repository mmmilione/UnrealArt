<template>
    <p :class="styles">

        <span v-if="isLoading" class="connecting">
            Connecting...
        </span>

        <div class="auth-box" v-else>

            <BTN
                text="Metamask" 
                icon="fas fa-link" 
                styles="greenBG" 
                @click="connect"
                v-if="state.accounts.length < 1 || state.network != 56"
            />
            
            <span v-else>
                <i class="fas fa-check-circle"></i> <b>Connected</b> {{cutWallet(state.accounts[0])}}
            </span>
            
        </div>

        <teleport to="body">
            <Toast :text="error" styles="errorToast" @vanish="error=null"/>
        </teleport>

    </p>

</template>

<script>
    import useBoilerPlate from '../../hooks/useBoilerplate.js';
    import state from '../../store/state.js'
    import { onMounted, watch, ref } from 'vue';
    import parseMetamaskError from '../../helpers/errors';
    import { cutWallet } from '../../helpers/help.js'
    import BTN from '../BTNs/BTN.vue'
    import Toast from '../Modals/Toast.vue';

    export default {
        components: { BTN, Toast },
        props: ['styles'],
        setup(){
            
            const { router, isLoading, route, error } = useBoilerPlate();
            const isOpen = ref(false);
            const connect = async () => {
                try {
                        isLoading.value = true;
                        const provider = await state.connect();
                        isLoading.value = false;
                        return provider;
                    } catch (err) {
                        console.log(err);
                        error.value = parseMetamaskError(err);
                        isLoading.value = false;
                    }
                }

                watch(()=> route.path, async () => {
                    state.accounts = await ethereum.request({ method:'eth_accounts' });
                    if(state.accounts.length > 0) state.connect();
                });

                onMounted(async ()=> {
                    state.accounts = await ethereum.request({ method:'eth_accounts' });
                    if(state.accounts.length > 0) state.connect();
                });

                return { router, isLoading, error, connect, state, cutWallet, isOpen };
            }
        }
</script>

<style scoped>
    p{
        text-align: center;
        padding-top: 10px;
    }

    .connecting{
        padding-right: 20px;
        font-weight: bold;
        color: black;
        animation: flash 1s linear infinite;
    }

    .fa-check-circle{
        color: green;
    }

    b{
        color: green;
    }

    .auth-box {
        padding-right: 60px;
    }

    @keyframes flash{
        0%{
            color: black;
            opacity: 1;
        }
        50%{
            color: darkgrey;
            opacity: 0.9;
        }
        100%{
            color: black;
            opacity: 1;
        }
    }

    @media screen and (max-width: 800px){

        .desk{
            display: none !important;
        }

    }
</style>