import {ethers} from 'ethers';

const metamaskInit = async () => {

        let metamaskProvider;

        //New Metamask
        if(typeof window.ethereum != undefined){
            console.log("New Metamask");
            metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        }

        //Old Metamask
        if(typeof window.web3 != undefined && typeof window.ethereum == undefined){
            console.log("Old Metamask");
            metamaskProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        }

        //Check network ID
        const networkID = await metamaskProvider.getNetwork();
        if(networkID.chainId != 56){
            throw Error("Wrong Network")
        }
    
        const accounts = await metamaskProvider.send("eth_requestAccounts", []);
                
        return { metamaskProvider,  ethereum, accounts, network: networkID.chainId };

}

const contractInit = async (contract) => {
    const { metamaskProvider } = await metamaskInit();
    if(metamaskProvider == false) return false;
    const signer = metamaskProvider.getSigner();
    const myContract = await new ethers.Contract(contracts[contract].address, contracts[contract].abi, signer);
    return myContract;
}

export { metamaskInit,  contractInit };