import {payUSDC} from "@/lib/ethers/pay";

const pay = async () => {
    const txnHash = await payUSDC(1, "3266miles.testnet");
    if (!txnHash) {
        console.log("Failed to pay");
        return;
    }
    console.log(txnHash);
};

export default function PayButton() {
  return (
      <button onClick={() => pay()}>Pay</button>
  )
}
