import Web3 from 'web3';
import {USDCABI, USDCAddress} from "@/lib/ethers/USDC";
import BigNumber from "bignumber.js";

const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.testnet.near.org"));

const contract = new web3.eth.Contract(USDCABI, USDCAddress);

export async function payUSDC(amount, destinationAddress) {
    if (window.ethereum) {
        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const decimals = await contract.methods.decimals().call();
            const balance = await contract.methods.balanceOf(window.ethereum.selectedAddress).call();
            console.log("USDC Balance: ", balance / (10n ** decimals));
            if (balance / (10n ** decimals) < amount) {
                throw new Error("Insufficient balance");
            }
            const value = new BigNumber(amount).mul(new BigNumber(10).pow(new BigNumber(decimals)));
            const tx = contract.methods.transfer(destinationAddress, value.toString()).encodeABI();
            const transaction = {
                "from": window.ethereum.selectedAddress,
                "to": USDCAddress,
                "gas": Web3.utils.toHex(100000),
                "data": tx
            };

            const signedTx = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transaction],
            });
            console.log(signedTx);
            return signedTx;
        } catch
            (error) {
            console.error('Error signing message:', error);
        }
    } else {
        console.log('Ethereum object not found, install MetaMask.');
    }
}
