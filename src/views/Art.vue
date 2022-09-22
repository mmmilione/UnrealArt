<template>
    <div class="container">
        <div class="artcontent">
            
            <DisplayArt :title="art.title" :picture="art.picture" v-once />
            
            <transition appear name="artinfo">

                <div class="artinfo">
                    
                    <OffchainData :art="art" v-once />

                    <Line />

                    <div v-if="isConnected == true">

                        <div v-if="isLoading">
                            <Divider />
                            <Divider />
                            <Divider />
                            <Loader />
                        </div>

                        <div v-else>

                            <p>NFT: <b>{{isNFT}}</b></p>
                            <p>Owner: <b>{{cutAddress(owner, 4)}}</b></p>
                            <p v-if="isForSale == true">Price: <b>{{price}} BNB</b></p>
                            
                            <Mint 
                                :art="art"
                                v-if="isNFT == 'Not Minted'"
                                @success="handleMintingSuccess"
                            />

                            <div v-else>

                                <Buy
                                    :art="art"
                                    :price="price"
                                    :index="isNFT"
                                    v-if="isForSale == true && owner.toLowerCase() != state.accounts[0]"
                                    @success="handlePurchase"
                                />

                                <NotForSale
                                    v-if="isForSale == false && owner.toLowerCase() != state.accounts[0]" 
                                />

                                <Delist
                                    :index="isNFT"
                                    v-if="isForSale == true && owner.toLowerCase() == state.accounts[0]"
                                    @success="handleDelisting" 
                                />

                                <List 
                                    :index="isNFT"
                                    v-if="isForSale == false && owner.toLowerCase() == state.accounts[0]"
                                    @success="handleListingSuccess"
                                />

                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <h5 class="connection-warning">
                            Connect your Metamask for on-chain data and action
                        </h5>
                    </div>

                    <div class="center mob">
                        <BTN 
                            text="Go Back"
                            icon="fas fa-arrow-circle-left"
                            @click="router.push({name: 'Home'})"
                        />
                    </div>
                    
                </div>
            </transition>

        </div>
        
        <teleport to="body">
            <Toast :text="toastMSG" styles="successToast" @vanish="toastMSG=null"/>
        </teleport>

    </div>
</template>

<script>

import { computed, ref } from '@vue/reactivity';
import artList from '../assets/data/art.js';
import BTN from '../components/BTNs/BTN.vue';
import useBoilerplate from '../hooks/useBoilerplate.js';
import Divider from '../components/UI/Divider.vue';
import Line from '../components/UI/Line.vue';
import Loader from '../components/UI/Loader.vue';
import state from '../store/state.js';
import { onMounted, watch } from 'vue';
import Mint from '../components/Art/Mint.vue';
import Buy from '../components/Art/Buy.vue';
import NotForSale from '../components/Art/NotForSale.vue';
import Delist from '../components/Art/Delist.vue';
import List from '../components/Art/List.vue';
import DisplayArt from '../components/Art/DisplayArt.vue';
import OffchainData from '../components/Art/OffchainData.vue';
import Toast from '../components/Modals/Toast.vue';
import { cutAddress } from '../helpers/help.js';
import { ethers } from 'ethers';
import FloatGoBackBTN from '../components/BTNs/FloatGoBackBTN.vue';

    export default {

    components: { BTN, Divider, Line, Loader, Mint, Buy, NotForSale, Delist, List, DisplayArt, OffchainData, Toast, FloatGoBackBTN },
    props: ["id"],

    setup(props) {

        const { isLoading, router } = useBoilerplate(false);
        const isNFT = ref('Not Minted');
        const owner = ref('None');
        const price = ref(0);
        const isForSale = ref(false);
        const toastMSG = ref(null);
        const onchainData = ref({});
        
        const isConnected = computed(() => state.accounts.length > 0 && state.network == 56 ? true : false);
        const art = computed(() => artList.find(item => item._id == props.id));

        const handleListingSuccess = value => {
            price.value = value;
            isForSale.value = true;
        }

        const handleMintingSuccess = value => {
            isNFT.value = value;
            owner.value = state.accounts[0].toLowerCase();
            isForSale.value = false;
            toastMSG.value = `NFT Minted! ID: ${value}`;
        }

        const handleDelisting = () => {
            isForSale.value = false;
            price.value = 0;
            toastMSG.value = `NFT Withdrawn from the Market`;
        }

        const handlePurchase = (id) => {
            owner.value = state.accounts[0];
            isForSale.value = false;
            toastMSG.value = `NFT #${id} is Now Yours!`;
        }

        const fetchOnChainData = async () => {
            
            try {

                isLoading.value = true;

                //Instantiate contract
                const unrealContract = await state.contractInit("unrealArt");
                if(unrealContract == false) throw Error("Contract Could Not Be Instantiated");
                
                //Find if NFT was minted by getting the owner 
                //If not, exetution stops here and error is thrown
                owner.value = await unrealContract.ownerOf(props.id);

                //NFT ID
                isNFT.value = props.id;

                //Fetch onchain market data (price and availability for sale)
                const txResponse = await unrealContract.getArt(props.id);
                isForSale.value = txResponse.isForSale;
                price.value = txResponse.price.toString() > 0 ? ethers.utils.formatEther(txResponse.price.toString()) : 0;
            
                return isLoading.value = false;

            } catch (err) {
                console.log(err);
                if(err.message.includes("invalid token ID")){
                    console.log("This NFT doesn't Exist");
                }
                return isLoading.value = false;
            }
        }

        watch(() => state.accounts, () => {
            if(isConnected.value == true) fetchOnChainData()
        });
        
        onMounted(async() => {
            if(isConnected.value == true) fetchOnChainData()
        })

        return { 
            art, isLoading, state, toastMSG, price, isForSale,
            isConnected, isNFT, owner, onchainData, router,
            handleListingSuccess, handleMintingSuccess,
            handleDelisting, handlePurchase, cutAddress
        };
    },
   
}
</script>

<style scoped>
    .artcontent{
        display: grid;
        grid-template-columns: 5fr 4fr;
        align-items: center;
    }
    .artinfo{
        padding: 50px;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        height: 100%;
        z-index: 0;
        color: white;
    }
    .artinfo-enter-from{
        opacity: 0;
        transform: translateX(500px);
    }
    .artinfo-enter-active{
        transition: all 1s ease-out;
    }
    
    .connection-warning{
        font-size: 16px;
        display:  inline-block;
        margin-top: 30px;
        background-color: gray;
        color: yellow;
        padding: 15px 10px;
        border-radius: 10px;
    }

    .mob{
        display: none;
    }

    @media screen and (max-width: 800px){
        .artcontent{
            display: block;
        }

        .artinfo{
            padding: 20px !important;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            height: initial;
            z-index: 0;
            color: white;
        }

        .mob{
            display: block !important;
            margin: 70px !important;
        }
    }

</style>