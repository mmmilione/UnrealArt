<template>
    
    <div class="mint-container">

        <p class="hint">
            Click on the button below to put the NFT of this painting for sale.
        </p>
        
        <Divider />
        <Divider />
        <Divider />
        <Divider />

        <p class="center">
            <BTN text="Sell NFT" styles="greenBG" icon="fas fa-store" @click="isActive=true"/>
        </p>

        <teleport to="body">
            <SetPriceModal
                :id="index"
                :isActive="isActive"
                @close="handleClose"
            />
        </teleport>

    </div>

</template>

<script>

    import useBoilerplate from '../../hooks/useBoilerplate';
    import BTN from '../BTNs/BTN.vue';
    import Feedbacks from '../Form/Feedbacks.vue';
    import Divider from '../UI/Divider.vue';
    import SetPriceModal from '../Modals/SetPriceModal.vue';

    export default {

        components: { BTN, Feedbacks, Divider, SetPriceModal },
        props: ['index'],
        emits: ['success'],
        
        setup(props, context){
            const { isActive } = useBoilerplate(false);

            const handleClose = value => {
                isActive.value = false;
                if(value > 0) context.emit('success', value);
            }
            
            return { handleClose, isActive }
        }
    }
</script>