<template>
    <div class="container">
        <div class="content">

            <h1>FAQ</h1>
            
            <h5 class="red">What's the purpose of this project?</h5>
            <p>
                The purpose of this project is purely demonstrative of the author's ability to build advanced tech, which can include blockchain and 3D animations.
            </p>

            <h5 class="red">What's the address of the NFTs' smart contract?</h5>
            <p>
                The address of the contract is:<br>
                <b><a :href="bscScanUrl" target="_blank">{{ address }}</a></b><br>
                Click on the address to check it on BSCSCAN.
            </p>

            <h5 class="red">How much does it cost to mint and NFT of the artworks shown in the gallery?</h5>
            <p>
                It costs only 0.01 BNB.
            </p>

            <h5 class="red">Can I resell my NFTs?</h5>
            <p>
                Yes, you can resell it in this platform. When you own the NFT of a painting, you can decide to put it for sale at the price you want.
            </p>

            <h5 class="red">Can I use a wallet which is not Metamask?</h5>
            <p>
                Yes, you can use different wallets, including TrustWallet. However, the application has been fully tested with Metamask only (browser extension and mobile). That's why we strongly suggest you to go for Metamask.
            </p>

            <h5 class="red">How can I see my NFTs in my Metamask?</h5>
            <p>
                This is possible only on the mobile version of Metamask. In order to accomplish this, you will need to specify the ID of the NFT you want to display (it must belong to you) and you must copy and paste in the relevant field, the address of the Smart Contract you find below:<br><br>
                <b><a :href="bscScanUrl" target="_blank">{{ address }}</a></b><br>
                Click on the address to check it on BSCSCAN.<br><br>
                If you can see the NFT but the picture and/or metadata do not show, then you need to switch the IPFS gateway in the advanced settings in Metamask. The wallet provides several gateway options which can be easily selected on a dropdown menu.
            </p>

            <h5 class="red">Is there any royalties system on NFT resale?</h5>
            <p>
                Yes, on any sale on the secondary market, 5% of the slae price goes to the platform.
            </p>

            <h5 class="red">Should I invest in NFTs of AI generated art?</h5>
            <p>
                Purchase NFTs just for fun and to test the functionality of the app. By no means you should take this as an investment.
            </p>

            <h5 class="red">On which blockchain does the application run?</h5>
            <p>
                The whole project run on the Binance Smart Chain (MAINNET). This means that you need to connect your metamask to interact with the NFTs.<br>
                Your wallet should be set on the Binance Smart Chain.
            </p>

            <h5 class="red">How do I add the Binance Smart Chain Network to my Metamask?</h5>
            <p>
                Please refer to the <a href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" class="red" target="_blank">Binance Official Website</a> to perform this task.
            </p>

        </div>

        <FloatGoBackBTN icon="fas fa-arrow-circle-left" @click="router.go(-1)" />

        <teleport to="body">
            <Toast styles="successToast" :text="toastMSG" @vanish="toastMSG=null"/>
        </teleport>

    </div>
</template>

<script>

    import { ref } from 'vue';
    import FloatGoBackBTN from '../components/BTNs/FloatGoBackBTN.vue';
    import contracts from '../helpers/contracts.js';
    import { cutAddress } from '../helpers/help.js';
    import Toast from '../components/Modals/Toast.vue';
    import useBoilerplate from '../hooks/useBoilerplate';
    import { computed } from '@vue/reactivity';

    export default {
        components: { FloatGoBackBTN, Toast },
        setup(){
            const { router } = useBoilerplate();
            const toastMSG = ref(null);
            const address = ref(cutAddress(contracts.unrealArt.address, 4));
            const bscScanUrl = computed(() => `https://bscscan.com/address/${contracts.unrealArt.address}`)
            return { address, toastMSG, router, bscScanUrl };
        }
    }
</script>