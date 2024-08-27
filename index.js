#!/usr/bin/env node

const {
    checkBaseBalance,
    sendTokenIfNeeded,
  } = require("./src/modules/blockchainService.js");
  const { sendMessage } = require("./src/modules/telegramService.js");
  const {
    walletAddresses,
    balanceThreshold,
    senderPrivateKey,
    senderWalletAddress,
    networkConfigs,
  } = require("./src/config");
  
  async function monitorAndTopUpWallets() {
    for (const networkName in networkConfigs) {
      const config = networkConfigs[networkName];
      const nativeCurrency = config.nativeCurrency;
  
      // Set the provider based on the network
      const provider = new ethers.providers.JsonRpcProvider(
        config.rpcUrl,
        config.chainId
      );
  
      const senderBalance = await checkBaseBalance(
        provider,
        senderWalletAddress[networkName]
      );
      console.log(`Faucet balance on ${networkName}: ${senderBalance} ${nativeCurrency}`);
  
      if (parseFloat(senderBalance) < parseFloat(balanceThreshold[networkName])) {
        console.log(
          `Faucet balance is below threshold on ${networkName}: ${senderBalance} ${nativeCurrency}`
        );
        await sendMessage(
          `Alert: Faucet balance is low on ${networkName} (${senderBalance} ${nativeCurrency}). Please top up.`
        );
      }
  
      for (let address of walletAddresses[networkName]) {
        const balance = await checkBaseBalance(provider, address);
        console.log(
          `Checking balance for ${address} on ${networkName}: ${balance} ${nativeCurrency}`
        );
  
        if (parseFloat(balance) < parseFloat(balanceThreshold[networkName])) {
          console.log(
            `Balance below threshold for ${address} on ${networkName}. Initiating top-up.`
          );
          await sendMessage(
            `Initiating top-up for ${address} on ${networkName}. Current balance: ${balance} ${nativeCurrency}.`
          );
          try {
            await sendTokenIfNeeded(
              provider,
              networkName,
              senderPrivateKey[networkName],
              address,
              config.topUpAmount
            );
            console.log(`Top-up successful for ${address} on ${networkName}`);
            await sendMessage(`Top-up successful for ${address} on ${networkName}`);
          } catch (error) {
            console.error(
              `Failed to send ${nativeCurrency} to ${address} on ${networkName}:`,
              error
            );
            await sendMessage(
              `Failed to send ${nativeCurrency} to ${address} on ${networkName}: ${error.message}`
            );
          }
        } else {
          console.log(
            `Balance sufficient for ${address} on ${networkName} (${balance} ${nativeCurrency}).`
          );
        }
      }
    }
  }
  
  monitorAndTopUpWallets().then(() =>
    console.log("Monitoring and top-up process completed.")
  );
  