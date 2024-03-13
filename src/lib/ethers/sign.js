import {ethers} from 'ethers';

export async function signMessage() {
    // Check if the Ethereum object is available in the window
    if (window.ethereum) {
        try {
            // Request wallet connection
            await window.ethereum.request({method: 'eth_requestAccounts'});

            // Create a new provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const {chainId} = await provider.getNetwork();
            if (chainId !== 1) {
                // TODO add network change here (for whatever we're using)
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                    params: [{
                        chainId: "",
                        rpcUrls: [""],
                        chainName: "",
                        nativeCurrency: {
                            name: "",
                            symbol: "",
                            decimals: 18
                        },
                        blockExplorerUrls: [""]
                    }]
                });
            }

            // Get the signer
            const signer = provider.getSigner();

            // Define the message to sign
            const message = 'This is a test message to sign';

            // Request the signer to sign the message
            const signature = await signer.signMessage(message);

            console.log('Signed message:', signature);

            return signature;
        } catch
            (error) {
            console.error('Error signing message:', error);
        }
    } else {
        console.log('Ethereum object not found, install MetaMask.');
    }
}
