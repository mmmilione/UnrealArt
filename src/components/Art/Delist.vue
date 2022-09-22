<template>
    
    <div class="mint-container">

        <p class="hint">
            Click on the button below to withdraw the NFT from the market.
        </p>

        <Feedbacks 
            :isLoading="isLoading" 
            :isSuccess="false" 
            :error="error"
            successMSG=""
        />

        <p class="center">
            <BTN text="Stop Selling" styles="greenBG" icon="fas fa-window-close" @click="stopSelling"/>
        </p>

    </div>

</template>

<script>

    import parseMetamaskError from '../../helpers/errors.js';
    import useBoilerplate from '../../hooks/useBoilerplate.js';
    import state from '../../store/state.js';
    import BTN from '../BTNs/BTN.vue';
    import Feedbacks from '../Form/Feedbacks.vue';

    export default {

        components: { BTN, Feedbacks },
        props: ['index'],
        emits: ['success'],

        setup(props, context){

            const { isLoading, error } = useBoilerplate(false);

            const stopSelling = async () => {

                error.value = null;
                isLoading.value = true;

                try {

                    //Instantiate contract and call function
                    const unrealContract = await state.contractInit("unrealArt");
                    const txResponse = await unrealContract.delistNFT(props.index);
                    await txResponse.wait();
                    
                    //Update UI
                    isLoading.value = false;
                    context.emit('success');

                } catch (err) {
                    isLoading.value = false;
                    error.value = parseMetamaskError(err);
                }

            }

            return { isLoading, error, stopSelling }
        }
    }
</script>