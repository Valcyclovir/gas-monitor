# OTHub Faucet

## Overview

`OTHub Faucet` is an automated balance monitoring and top-up system designed for xDai wallets (or any other EVM wallet). It ensures that multiple wallets maintain a minimum gas balance by automatically topping them up when their balance falls below a predefined threshold. Integrated with Telegram, `OTHub Faucet` sends instant notifications for balance alerts and top-up transactions, providing users with up-to-date information on their wallet status.

## Features

- **Multi-Wallet Monitoring**: Keep track of multiple xDai wallets and their balances simultaneously.
- **Automated Top-Up**: Automatically sends xDai to wallets when their balance drops below a specified threshold.
- **Telegram Notifications**: Sends real-time alerts and transaction confirmations directly to a Telegram bot.
- **Secure and Private**: Uses environment variables to securely manage sensitive information such as private keys and Telegram bot tokens.
- **Easy to Configure**: Customize wallet addresses, balance thresholds, and notification preferences through a simple configuration.

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher recommended)
- A Telegram bot token and chat ID for notifications
- An xDai hot wallet with sufficient funds for top-ups (also works on other evm chains)

### Installation

1. Clone the repository:

```
git clone https://github.com/Valcyclovir/othub-faucet
```
```
cd xDaiTopUpBot
```
2. Install dependencies:
```
npm install
```
3. Configure your environment variables:

```
cp .env-example .env && nano .env
```

### Usage

Run the script to start monitoring and automatically top up your wallets:

```
node index.js
```

You can automate your script using crontab to run it hourly

```
0 * * * * /root/othub-faucet/index.js
```

### Disclaimer:

This project, including its scripts and services, is provided for educational and informational purposes only. The scripts and services included in this project are offered "as is", without any warranty, express or implied, regarding their accuracy, reliability, or suitability for any particular purpose.

The use of this project is at your own risk. I, the creator of this project, shall not be held responsible or liable for any loss, damage, or inconvenience caused by the use of this project, including but not limited to financial loss, data loss, or disruption of service.

This project involves dealing with user funds, and it is your responsibility to ensure the security and integrity of your wallets, private keys, and other sensitive information. Always exercise caution and perform due diligence before executing any transactions or sharing sensitive information.

By using this project, you acknowledge and agree to the terms of this disclaimer. If you do not agree with these terms, you should refrain from using this project.
