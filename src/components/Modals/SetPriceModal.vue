<template>

    <div class="modal-background" v-if="isActive">

        <div class="modal-content">

            <h5 class="modal-title center">
                <b>Market NFT</b>
            </h5>

            <i class="fas fa-window-close close-modal-icon" @click="close"></i>
            <section>
                <p>
                    Set the price of your NFT and put it for sale in the marketplace.
                </p>
                
                <form>

                    <Label icon="fas fa-coins" color="white" text="Price in BNB" />
                    
                    <NumberInput 
                        :isRequired="true"
                        placeholder="0.1"
                        @change="handleChange"
                    />

                    <Feedbacks 
                        :isLoading="isLoading" 
                        :isSuccess="isSuccess"
                        :error="error"
                        successMSG="Your NFT is on the Market!"
                    />

                    <p class="center">
                        <BTN text="Sell NFT" styles="greenBG" icon="fas fa-store" @click="sell"/>
                    </p>

                </form>
                
            </section>
        </div>
    </div>
</template>

<script>

    import { ref } from 'vue';
    import Label from '../Form/Label.vue';
    import Feedbacks from '../Form/Feedbacks.vue';
    import BTN from '../BTNs/BTN.vue';
    import parseMetamaskError from '../../helpers/errors';
    import state from '../../store/state.js';
    import { ethers } from 'ethers';
    import useBoilerplate from '../../hooks/useBoilerplate';
    import NumberInput from '../Form/NumberInput.vue';

    export default {
    
    components: { Label, Feedbacks, BTN, NumberInput },
    props: ["isActive", "id"],
    emits: ["close"],

    setup(props, context) {

        const { error, isLoading, isSuccess } = useBoilerplate(false);
        const price = ref(0);

        const handleChange = value => price.value = value;
            
        const close = () => context.emit("close", price.value); 
        
        const sell = async () => {

            //Check price
            if(price.value <= 0 || isNaN(price.value)) {
                return error.value = "Set price before submitting the form";
            }

            //Reset UI
            isSuccess.value = false;
            error.value = null;
            isLoading.value = true;
            
            try {

                //Price price in WEI
                const priceInWei = ethers.utils.parseEther(price.value, "wei");
                
                //Instantiate Contract and Send TX
                const unrealContract = await state.contractInit('unrealArt');
                const txResponse = await unrealContract.setNFTforSale(props.id, priceInWei);
                await txResponse.wait();
                
                //update UI
                isLoading.value = false;
                return isSuccess.value = true;

            } catch (err) {
                error.value = parseMetamaskError(err);
                isLoading.value = false;
            }
            
        }

        return { close, handleChange, sell, isLoading, error, isSuccess };
    }
    
}
</script>

<style scoped>

.modal-content{
    color: white;
    position: relative;
    width: 40%;
    min-height: 400px;
    margin: 150px auto;
    background-color: black;
    padding: 40px;
    border-radius: 10px;
}

@media screen and (max-width: 800px){

    .modal-background{
        z-index: 21;
    }
    .modal-content{
        margin: 30px auto;
        width: 70%;
        min-height: 300px;
    }

    .modal-title{
        margin-top: -20px !important;
    }
}

</style>