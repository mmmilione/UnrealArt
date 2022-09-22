import {ethers} from 'ethers';
import { reactive } from 'vue';
import contracts from '../helpers/contracts.js';

const state = reactive({

    isOpen: false,
    close(){
        this.isOpen = false;
    },
    open(){
        this.isOpen = true;
    },
    accounts: [],
    ethereum: null,
    provider: null,
    network: 0,

    async getAccounts () {
        this.accounts = await this.ethereum.request({ method: 'eth_accounts' });
    },

    setNetwork (id) {
        this.network = id;
        this.getAccounts();
    },

    setProvider () {

        let provider;

        if(typeof window.ethereum != undefined){
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        //Old Metamask
        if(typeof window.web3 != undefined && typeof window.ethereum == undefined){
            provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        }

        return provider;
    },

    setEthereum () {

        let ethereum;

        if(typeof window.ethereum != undefined){
            ethereum = window.ethereum;
        }

        //Old Metamask
        if(typeof window.web3 != undefined && typeof window.ethereum == undefined){
            ethereum = window.web3;
        }

        return ethereum;

    },

    async connect () {

        this.provider = this.setProvider();
        this.ethereum = this.setEthereum();
            
        //Check network ID
        const networkID = await this.provider.detectNetwork();
        if(networkID.chainId != 56) throw Error("Wrong Network")
        this.network = networkID.chainId;
        
        this.accounts = await this.provider.send("eth_requestAccounts", []);
        
        this.ethereum.on('accountsChanged', () => this.getAccounts());
        this.ethereum.on('chainChanged', (chainId) => this.setNetwork(chainId));
        
        return this.provider;
    },

    contractInit (contract) {
        const provider = this.setProvider();
        const signer = provider.getSigner();
        const myContract = new ethers.Contract(contracts[contract].address, contracts[contract].abi, signer);
        return myContract;
    },

    async getBalance (address) {
        const provider = this.setProvider();
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        return balanceInEth;
    }

});

export default state; 