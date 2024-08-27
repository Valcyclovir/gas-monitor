#!/usr/bin/env node

const { checkBalance, sendTokenIfNeeded } = require('./src/modules/blockchainService.js');
const { sendMessage } = require('./src/modules/telegramService.js');
const { walletAddresses, balanceThreshold, topUpAmount, senderPrivateKey, networks } = require('./src/config');

async function monitorAndTopUpWallets() {
    for (const [networkName, networkConfig] of Object.entries(networks)) {
        const nativeCurrency = networkConfig.nativeCurrency;
        const senderBalance = await checkBalance(networkName, networkConfig.senderWalletAddress);
        console.log(`Faucet balance on ${networkName}: ${senderBalance} ${nativeCurrency}`);

        if (parseFloat(senderBalance) < parseFloat(balanceThreshold[networkName])) {
            console.log(`Faucet balance is below threshold on ${networkName}: ${senderBalance} ${nativeCurrency}`);
            await sendMessage(`Alert: Faucet balance is low on ${networkName} (${senderBalance} ${nativeCurrency}). Please top up.`);
        }

        for (let address of walletAddresses) {
            const balance = await checkBalance(networkName, address);
            console.log(`Checking balance for ${address} on ${networkName}: ${balance} ${nativeCurrency}`);

            if (parseFloat(balance) < parseFloat(balanceThreshold[networkName])) {
                console.log(`Balance below threshold for ${address} on ${networkName}. Initiating top-up.`);
                await sendMessage(`Initiating top-up for ${address} on ${networkName}. Current balance: ${balance} ${nativeCurrency}.`);
                try {
                    await sendTokenIfNeeded(networkName, senderPrivateKey, address, topUpAmount[networkName]);
                    console.log(`Top-up successful for ${address} on ${networkName}`);
                    await sendMessage(`Top-up successful for ${address} on ${networkName}`);
                } catch (error) {
                    console.error(`Failed to send ${nativeCurrency} to ${address} on ${networkName}:`, error);
                    await sendMessage(`Failed to send ${nativeCurrency} to ${address} on ${networkName}: ${error.message}`);
                }
            } else {
                console.log(`Balance sufficient for ${address} on ${networkName} (${balance} ${nativeCurrency}).`);
            }
        }
    }
}

monitorAndTopUpWallets().then(() => console.log('Monitoring and top-up process completed.'));
