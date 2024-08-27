#!/usr/bin/env node

const { checkBalance, sendETHIfNeeded } = require('./src/modules/blockchainService.js');
const { sendMessage } = require('./src/modules/telegramService.js');
const { walletAddresses, senderPrivateKey, senderWalletAddress, networks } = require('./src/config');

async function monitorAndTopUpWallets() {
    // Iterate through all configured networks
    for (let [networkName, networkConfig] of Object.entries(networks)) {
        const { rpcUrl, topUpAmount, balanceThreshold } = networkConfig;

        // Set up provider for each network
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        // Check the balance of the sender wallet (faucet wallet)
        const senderBalance = await checkBalance(provider, senderWalletAddress);
        console.log(`Faucet balance on ${networkName}: ${senderBalance} ETH`);

        // Check if faucet balance is below the threshold
        if (parseFloat(senderBalance) < balanceThreshold) {
            console.log(`Faucet balance is below threshold on ${networkName}: ${senderBalance} ETH`);
            await sendMessage(`Alert: Faucet balance is low on ${networkName} (${senderBalance} ETH). Please top up.`);
        }

        // Check the balance for each monitored wallet
        for (let address of walletAddresses) {
            const balance = await checkBalance(provider, address);
            console.log(`Checking balance for ${address} on ${networkName}: ${balance} ETH`);

            if (parseFloat(balance) < balanceThreshold) {
                console.log(`Balance below threshold for ${address} on ${networkName}. Initiating top-up.`);
                await sendMessage(`Initiating top-up for ${address} on ${networkName}. Current balance: ${balance} ETH.`);
                
                try {
                    await sendETHIfNeeded(provider, senderPrivateKey, address, topUpAmount);
                    console.log(`Top-up successful for ${address} on ${networkName}`);
                    await sendMessage(`Top-up successful for ${address} on ${networkName}`);
                } catch (error) {
                    console.error(`Failed to send ETH to ${address} on ${networkName}:`, error);
                    await sendMessage(`Failed to send ETH to ${address} on ${networkName}: ${error.message}`);
                }
            } else {
                console.log(`Balance sufficient for ${address} on ${networkName} (${balance} ETH).`);
            }
        }
    }
}

monitorAndTopUpWallets().then(() => console.log('Monitoring and top-up process completed.'));
