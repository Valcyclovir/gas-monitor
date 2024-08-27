require('dotenv').config();

module.exports = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    messageThreadId: process.env.MESSAGE_THREAD_ID,
    networks: {
        base: {
            rpcUrl: process.env.BASE_RPC_URL,
            chainId: 8453,
            topUpAmount: parseFloat(process.env.BASE_TOP_UP_AMOUNT), 
            balanceThreshold: parseFloat(process.env.BASE_BALANCE_THRESHOLD),
            nativeCurrency: 'ETH'
        },
        sepolia: {
            rpcUrl: process.env.SEPOLIA_RPC_URL,
            chainId: 84532,
            topUpAmount: parseFloat(process.env.SEPOLIA_TOP_UP_AMOUNT),
            balanceThreshold: parseFloat(process.env.SEPOLIA_BALANCE_THRESHOLD),
            nativeCurrency: 'ETH'
        },
        chiado: {
            rpcUrl: process.env.CHIADO_RPC_URL,
            chainId: 10200,
            topUpAmount: parseFloat(process.env.CHIADO_TOP_UP_AMOUNT),
            balanceThreshold: parseFloat(process.env.CHIADO_BALANCE_THRESHOLD),
            nativeCurrency: 'xDAI'
        },
        xdaiMainnet: {
            rpcUrl: process.env.XDAI_MAINNET_RPC_URL,
            chainId: 100,
            topUpAmount: parseFloat(process.env.XDAI_MAINNET_TOP_UP_AMOUNT),
            balanceThreshold: parseFloat(process.env.XDAI_MAINNET_BALANCE_THRESHOLD),
            nativeCurrency: 'xDAI'
        },
    },
    walletAddresses: JSON.parse(process.env.WALLET_ADDRESS || '[]'),
    senderPrivateKey: process.env.SENDER_PRIVATE_KEY,
    senderWalletAddress: process.env.SENDER_WALLET_ADDRESS
};
