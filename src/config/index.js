require('dotenv').config();

module.exports = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    messageThreadId: process.env.MESSAGE_THREAD_ID,
    networks: {
        base: {
            rpcUrl: process.env.BASE_RPC_URL,
            chainId: 8453,
            topUpAmount: 0.001,
        },
        sepolia: {
            rpcUrl: process.env.SEPOLIA_RPC_URL,
            chainId: 84532,
            topUpAmount: 0.002,
        },
        chiado: {
            rpcUrl: process.env.CHIADO_RPC_URL,
            chainId: 10200,
            topUpAmount: 0.0015,
        },
        xdaiMainnet: {
            rpcUrl: process.env.XDAI_MAINNET_RPC_URL,
            chainId: 100,
            topUpAmount: 0.003,
        },
    },
    walletAddresses: JSON.parse(process.env.WALLET_ADDRESS || '[]'),
    balanceThreshold: parseFloat(process.env.BALANCE_THRESHOLD),
    senderPrivateKey: process.env.SENDER_PRIVATE_KEY,
    senderWalletAddress: process.env.SENDER_WALLET_ADDRESS
};
