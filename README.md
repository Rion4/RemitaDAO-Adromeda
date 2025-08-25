# RemitaDAO: Smart Automated Remittance Vaults

RemitaDAO is a decentralized application built for the aOS Global Buildathon, designed to transform how people send money to their families abroad. Instead of a simple transfer, it allows senders to program their remittances, automatically splitting each payment into different on-chain "vaults" for immediate cash, long-term savings, and yield-generating investments.

## The Problem

Cross-border remittances are a lifeline for millions of families worldwide. However, they often lack financial structure. Funds sent for daily needs can be difficult to allocate for long-term goals like education, healthcare, or investments. Senders have little control or visibility after the transfer is made, and recipients are burdened with managing complex financial planning.

## Our Solution: The "Multi-Vault" Strategy

RemitaDAO solves this by creating a powerful, on-chain financial toolkit for every user. It provides control and peace of mind for the sender, while giving the receiver a structured, automated financial plan.

Our application uses a sophisticated "Multi-Vault" architecture built on Andromeda OS, a decentralized operating system for the Cosmos ecosystem. Each vault is a separate, specialized smart contract (an Andromeda Digital Object, or ADO) that handles a specific financial job.

### Features

*   **Automated Splitting**: A core Splitter contract automatically distributes funds sent by the user according to their pre-configured rules.
*   **Long-Term Savings**: A Vesting contract acts as a secure, on-chain "Savings Vault," locking funds for a predetermined period to ensure they are available for future goals.
*   **Yield Generation**: A CW20 Staking contract and a custom CW20 token (RDSHARE) create an "Investment Vault," allowing recipients to stake their tokens and earn yield.
*   **Total Control & Transparency**: The entire system is built on-chain. Users always maintain full custody of their funds, and all transactions are transparently recorded on the blockchain.
*   **AI-Powered Suggestions**: The application includes a smart assistant that provides helpful financial suggestions to users, such as encouraging savings or highlighting investment opportunities.

## Getting Started

Follow these instructions to set up and run the project locally for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 20.19+ or 22.12+
*   **NPM**: Version 10.x or higher
*   **Keplr Wallet**: The browser extension for interacting with Cosmos blockchains.

### Installation & Setup

1.  **Clone the Repository**:
    Open your terminal and clone the project to your local machine.

    ```bash
    git clone https://github.com/Rion4/RemitaDAO.git
    ```

2.  **Navigate to the Project Directory**:

    ```bash
    cd RemitaDAO
    ```

3.  **Install Dependencies**:
    This command will install all the necessary libraries for the project, including React, Vite, and CosmJS.

    ```bash
    npm install
    ```

4.  **Configure Tailwind CSS**:
    If the configuration files are not present, initialize Tailwind CSS.

    ```bash
    npx tailwindcss init -p
    ```
    Ensure your `tailwind.config.js` is set up to scan your source files.

5.  **Run the Project**:
    Start the local development server.

    ```bash
    npm run dev
    ```
    Your application will now be running at `http://localhost:5173`.

## How It Works: The Hybrid Model

After extensive testing revealed instability and critical bugs in the official Andromeda testnets, we engineered a resilient "Hybrid Model" that is deployed on the stable Stargaze Testnet.

*   **On-Chain Logic (Splitter)**: The Splitter contract, which is configured by the user, acts as the primary manager for funds sent in the native currency (STARS). It automatically forwards portions for "Cash" (to the recipient's wallet) and "Savings" (to the Vesting contract).
*   **Frontend Orchestration (The "Brain")**: The React frontend is the intelligent orchestrator. When a user clicks "Send Funds," the application constructs a single transaction that contains multiple messages:
    *   An execute message to the Splitter contract, sending the STARS for the cash and savings portions.
    *   A second execute message to the CW20 Token contract, transferring the "Investment" portion of RDSHARE tokens directly to the recipient.

The user approves one single transaction in their Keplr wallet, but it performs multiple, sophisticated actions on the blockchain, demonstrating the full power of the Cosmos SDK and our multi-contract architecture.

## Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS
*   **Blockchain Interaction**: CosmJS, Keplr Wallet
*   **Blockchain Platform**: Stargaze Testnet
*   **Smart Contracts**: Andromeda OS Digital Objects (ADOs)
    *   Splitter
    *   Vesting
    *   CW20
    *   CW20 Staking
