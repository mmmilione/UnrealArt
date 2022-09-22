<template>
    
    <div class="mint-container">

        <p class="hint">
            You can mint the NFT of this painting for just 0.01 BNB.
        </p>

        <Feedbacks 
            :isLoading="isLoading" 
            :isSuccess="false" 
            :error="error"
            successMSG=""
        />

        <p class="center">
            <BTN text="Mint Now" styles="greenBG" icon="fas fa-hammer" @click="mint"/>
        </p>

    </div>

</template>

<script>
    
    import { ethers } from 'ethers';
    import parseMetamaskError from '../../helpers/errors.js'
    import useBoilerplate from '../../hooks/useBoilerplate.js';
    import BTN from '../BTNs/BTN.vue';
    import Feedbacks from '../Form/Feedbacks.vue';
    import state from '../../store/state.js';

    export default {

        components: { BTN, Feedbacks },
        props: ['art'],
        emits: ['success'],
        
        setup(props, context){

            const { isLoading, error } = useBoilerplate(false);
            
            const mint = async () => {

                error.value = null;
                isLoading.value = true;

                try {
                    
                    //Make sure user has at least 0.01 BNB of balance
                    const balance = await state.getBalance(state.accounts[0]);
                    if(Number(balance) <= 0.01 ) throw Error("You Need at least 0.01 BNB to Mint the NFT");
                    
                    //Instantiate Contract
                    const unrealContract = await state.contractInit("unrealArt");
                    if(unrealContract == false) throw Error("Contract Could Not Be Instantiated");
                    
                    //Set Amount to be sent to the contract and send tx
                    const txOptions = {value: ethers.utils.parseEther("0.01")};
                    const txResponse = await unrealContract.mintNFT(props.art._id, txOptions);
                    await txResponse.wait();
                    
                    //Update UI
                    isLoading.value = false;
                    context.emit('success', props.art._id);

                } catch (err) {
                    isLoading.value = false;
                    error.value = parseMetamaskError(err);
                }

            }

            return { isLoading, error, mint }
        }
    }
</script>