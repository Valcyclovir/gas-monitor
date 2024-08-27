const { ethers } = require('ethers');
const { networks } = require('../config/index.js');

function getProvider(networkName) {
    const networkConfig = networks[networkName];
    return new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl, networkConfig.chainId);
}

async function checkBalance(networkName, address) {
    const provider = getProvider(networkName);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}

async function getCurrentGasPrice(networkName) {
    const provider = getProvider(networkName);
    const gasPrice = await provider.getGasPrice();
    return ethers.utils.formatUnits(gasPrice, 'gwei');
}

async function sendTokenIfNeeded(networkName, senderPrivateKey, toAddress, amountInEther) {
    const provider = getProvider(networkName);
    const wallet = new ethers.Wallet(senderPrivateKey, provider);
    const currentGasPrice = await getCurrentGasPrice(networkName);
    const tx = {
        to: toAddress,
        value: ethers.utils.parseEther(amountInEther.toString()),
        gasPrice: ethers.utils.parseUnits(currentGasPrice, 'gwei')
    };

    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();
    return transaction;
}

module.exports = { checkBalance, sendTokenIfNeeded, getCurrentGasPrice };
