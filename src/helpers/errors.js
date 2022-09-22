const parseMetamaskError = err => {
    console.log(err);
    let errorMSG;
    if(err.message.includes('Minting Costs 0.01')) {
        errorMSG = "You must send 0.01 BNB to mint the NFT"
    }else if(err.message.includes("Only 14")){
        errorMSG = "Only 14 NFTs can be minted";
    }else if(err.message.includes("has been minted")){
        errorMSG = "This NFT has been minted already";
    }else if(err.message.includes('All NFTs')){
        errorMSG = "All NFTs were minted"
    }else if(err.message.includes("user rejected transaction")){
        errorMSG = "Transaction Rejected by the User"
    }else if(err.message.includes("Not Authorized")){
        errorMSG = "You are NOT Authorized to perform this action"
    }else if(err.message.includes("Not For Sale")){
        errorMSG = "This painting is NOT for sale"
    }else if(err.message.includes("Insufficient")){
        errorMSG = "You should pay the full price to buy this painting"
    }else if(err.message.includes('window.ethereum') || err.message.includes("missing provider")){
        errorMSG = "Please Install Metamask in your Browser";
    }else if(err.message.includes('Already processing')){
        errorMSG = "You are already in the process of opening Metamask.";
    }else if (err.message.includes("Wrong Network")) {
        errorMSG = "Connect Metamask to the Binance Smart Chain Network";
    }else if(err.data && err.data.message.includes("insufficient funds")){
        errorMSG = "Not Enough BNB to pay for gas fees"
    }else{
        errorMSG = err.message ? err.message : "Error"
    }
    return errorMSG;
}

export default parseMetamaskError;