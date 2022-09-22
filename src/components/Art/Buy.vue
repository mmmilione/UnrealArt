<template>
    
    <div class="mint-container">

        <p class="hint">
            You can buy the NFT of this painting for {{ price }} BNB.
        </p>

        <Feedbacks 
            :isLoading="isLoading"
            :isSuccess="false" 
            :error="error"
            successMSG=""
        />

        <p class="center">
            <BTN text="Buy Now" styles="greenBG" icon="fas fa-check" @click="buy"/>
        </p>

    </div>

</template>

<script>

    import { ethers } from 'ethers';
    import parseMetamaskError from '../../helpers/errors';
    import useBoilerplate from '../../hooks/useBoilerplate';
    import state from '../../store/state';
    import BTN from '../BTNs/BTN.vue';
    import Feedbacks from '../Form/Feedbacks.vue';

    export default {

        components: { BTN, Feedbacks },
        props: ['art', 'index', 'price'],
        emits: ['success'],
        
        setup(props, context){

            const { isLoading, error } = useBoilerplate(false);

            const buy = async () => {

                error.value = null;
                isLoading.value = true;

                try {

                    //Instantiate contract and call function sending along the price in BNB
                    const options = { value: ethers.utils.parseEther(props.price) };
                    const unrealContract = await state.contractInit('unrealArt');
                    const txResponse = await unrealContract.buyNFT(props.index, options);
                    await txResponse.wait();
                    
                    //Update UI
                    isLoading.value = false;
                    context.emit('success', props.index);

                } catch (err) {
                    error.value = parseMetamaskError(err);
                    isLoading.value = false;
                }
            }

            return { isLoading, error, buy }
        }
    }
</script>