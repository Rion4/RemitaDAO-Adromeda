// src/App.jsx

import "./App.css";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Wallet,
  LogOut,
  RefreshCw,
  BarChart,
  Lock,
  GitBranch,
  Send,
  Github,
  Home,
  DollarSign,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { StargateClient } from "@cosmjs/stargate";
import World from "./components/Globe.jsx";
import ChatBot from "./components/ChatBot.jsx";

// --- FINAL, VERIFIED SMART CONTRACT ADDRESSES (STARGAZE TESTNET) ---
const SPLITTER_CONTRACT_ADDRESS =
  "stars1ahn7smatk0h9hulfys2nn8gqnv0ppksg5ram7uw45mqhx9e62r6qmm7960";
const VESTING_CONTRACT_ADDRESS =
  "stars1qn73rezv2uhkl2u0vrf9zwnmf65ehxqq62eym27a99aedrm0pnzsp8n5s3";
const TOKEN_CONTRACT_ADDRESS =
  "stars1ht55vh6t04l073yjyyumf03yqzek8jj4c40k5a8xdwanznn0069qyxucwz";
const RECIPIENT_ADDRESS = "stars1wmfht39848mrnyz7xpx33tadmz4n3py6pj3h05";

// --- Helper Components ---
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg",
    secondary:
      "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 border border-gray-600",
  };
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-6 hover:bg-white/15 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// Skeleton Loading Component
const SkeletonLoader = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-600/30 rounded-lg h-4 w-full"></div>
  </div>
);

const SkeletonNumber = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-600/40 rounded-lg h-8 w-24 mx-auto"></div>
  </div>
);

const NavigationBar = ({ onLaunchApp, showHomeButton = false, onGoHome }) => (
  <header className="absolute top-0 left-0 right-0 z-20 p-4">
    <div className="container mx-auto flex justify-between items-center bg-black/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          RemitaDAO
        </div>
        {showHomeButton && (
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </button>
        )}
      </div>
      <nav className="hidden md:flex items-center gap-8 text-gray-300">
        <a
          href="#get-started"
          className="hover:text-white transition-colors duration-300 font-medium"
        >
          Get Started
        </a>
        <a
          href="#features"
          className="hover:text-white transition-colors duration-300 font-medium"
        >
          Features
        </a>
      </nav>
      <Button
        onClick={onLaunchApp}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        Launch App <ArrowRight className="inline ml-2 h-4 w-4" />
      </Button>
    </div>
  </header>
);

const HeroSection = ({ onLaunchApp }) => (
  <section className="relative text-center py-32 md:py-48 px-4 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen flex items-center">
    <div className="absolute inset-0 z-0">
      <World />
    </div>
    <div className="absolute inset-0 bg-black/40 z-5"></div>

    {/* Animated Grid Background */}
    <div className="absolute inset-0 z-5 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      ></div>
    </div>
    <div className="relative z-10 container mx-auto">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
          🚀 Built for aOS Global Buildathon
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
        Send Money Home,{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Smarter
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-4xl mx-auto leading-relaxed">
        Automate your family's financial future. Split, save, and invest your
        cross-border payments with zero fees and complete control.
      </p>
      <div className="mt-12 flex justify-center">
        <Button
          onClick={onLaunchApp}
          className="px-12 py-5 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-110 transition-all duration-300"
        >
          Launch App <ArrowRight className="inline ml-3 h-6 w-6" />
        </Button>
      </div>

      {/* Interactive Floating Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto stagger-animation">
        <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="text-2xl md:text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
            $2M+
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Total Processed
          </div>
          <div className="w-full h-1 bg-blue-400/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </div>
        </div>
        <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="text-2xl md:text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
            50K+
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Transactions
          </div>
          <div className="w-full h-1 bg-purple-400/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-100"></div>
          </div>
        </div>
        <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="text-2xl md:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
            99.9%
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Uptime
          </div>
          <div className="w-full h-1 bg-green-400/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-200"></div>
          </div>
        </div>
        <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
            0%
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Fees
          </div>
          <div className="w-full h-1 bg-yellow-400/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const GetStartedSection = () => (
  <section
    id="get-started"
    className="relative py-24 px-4 z-20 scroll-animate overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
  >
    <div className="container mx-auto text-center relative z-30">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 fade-in-up">
        Get Started
      </h2>
      <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto fade-in-up delay-100">
        Three simple steps to revolutionize your cross-border payments
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center p-8 hover:scale-105 transition-transform duration-300 relative z-40 fade-in-up delay-200">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Wallet size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            1. Connect Wallet
          </h3>
          <p className="text-gray-400">
            Connect your Keplr wallet to get started with secure blockchain
            transactions
          </p>
        </Card>
        <Card className="text-center p-8 hover:scale-105 transition-transform duration-300 relative z-40 fade-in-up delay-300">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <GitBranch size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">2. Fund</h3>
          <p className="text-gray-400">
            Automatically split into cash, savings, and investments
          </p>
        </Card>
        <Card className="text-center p-8 hover:scale-105 transition-transform duration-300 relative z-40 fade-in-up delay-400">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
            <Send size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            3. Approve & Forget
          </h3>
          <p className="text-gray-400">
            Send funds once and let smart contracts handle the rest
            automatically
          </p>
        </Card>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: GitBranch,
      title: "Automated Splitting",
      desc: "Smart contracts automatically split your funds",
    },
    {
      icon: Lock,
      title: "Scheduled Savings",
      desc: "Time-locked savings with guaranteed returns",
    },
    {
      icon: BarChart,
      title: "Earn Yield",
      desc: "Generate passive income on your investments",
    },
    {
      icon: Wallet,
      title: "Total Control",
      desc: "You maintain full control of your funds",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 px-4 z-20 scroll-animate overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto relative z-30">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 fade-in-up">
          Features
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto fade-in-up delay-100">
          Powerful tools to manage your cross-border payments
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`text-center hover:scale-105 transition-transform duration-300 relative z-40 fade-in-up delay-${
                200 + index * 100
              }`}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mx-auto mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl text-gray-400 py-12 px-4 border-t border-gray-800/50 z-20">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            RemitaDAO
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Revolutionizing cross-border payments with blockchain technology.
            Send money home smarter, not harder.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Rion4/RemitaDAO-Adromeda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <Github size={20} />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className="hover:text-white transition-colors"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-500">
          © 2025 RemitaDAO. Built for the aOS Global Buildathon. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ onLaunchApp }) => {
  useEffect(() => {
    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animate class with a slight delay for smoother effect
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, 50);

          // Handle staggered animations for child elements
          if (entry.target.classList.contains("stagger-animation")) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-child");
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animateElements = document.querySelectorAll(
      ".scroll-animate, .fade-in-up, .stagger-animation"
    );
    animateElements.forEach((el) => observer.observe(el));

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <NavigationBar onLaunchApp={onLaunchApp} />
      <main>
        <HeroSection onLaunchApp={onLaunchApp} />
        <GetStartedSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

// Dashboard Components
const DashboardNav = ({ onDisconnect, onGoHome, address }) => (
  <header className="p-4 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          RemitaDAO
        </div>
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/10">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Wallet className="text-white" size={16} />
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-400">Hello</div>
            <div className="text-sm text-gray-300 font-mono">
              {address
                ? `${address.substring(0, 10)}...${address.substring(
                    address.length - 6
                  )}`
                : "Not Connected"}
            </div>
          </div>
          <button
            onClick={onDisconnect}
            className="text-gray-400 hover:text-white ml-2"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

// --- THE BRAIN: Transaction Logic ---
const createSplitMessages = (senderAddress, recipientAddress, totalAmount) => {
  const messages = [];

  // Calculate splits
  const cashAmount = Math.floor(totalAmount * 0.4); // 40% for cash
  const savingsAmount = Math.floor(totalAmount * 0.3); // 30% for savings
  const investmentAmount = Math.floor(totalAmount * 0.3); // 30% for investment

  // Send cash portion directly to recipient
  if (cashAmount > 0) {
    messages.push({
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [{ denom: "ustars", amount: cashAmount.toString() }],
      },
    });
  }

  // Send savings portion to vesting contract
  if (savingsAmount > 0) {
    messages.push({
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: VESTING_CONTRACT_ADDRESS,
        amount: [{ denom: "ustars", amount: savingsAmount.toString() }],
      },
    });
  }

  // Send investment portion to recipient (for now, until we have proper investment logic)
  if (investmentAmount > 0) {
    messages.push({
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [{ denom: "ustars", amount: investmentAmount.toString() }],
      },
    });
  }

  return messages;
};

// --- Enhanced Dashboard Component ---
// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-xl transform transition-all duration-300 ${
      type === "success"
        ? "bg-green-900/90 border-green-500/50 text-green-100"
        : type === "error"
        ? "bg-red-900/90 border-red-500/50 text-red-100"
        : "bg-blue-900/90 border-blue-500/50 text-blue-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        {type === "success" && (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            ✓
          </div>
        )}
        {type === "error" && (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            ✕
          </div>
        )}
        {type === "info" && (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            i
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-300 hover:text-white">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);

const Dashboard = ({
  onDisconnect,
  onGoHome,
  address,
  signingClient,
  client,
}) => {
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Helper function to get persisted balance or default value
  const getPersistedBalance = (key, defaultValue) => {
    if (!address) return defaultValue;
    const stored = localStorage.getItem(`${address}_${key}`);
    console.log(
      `Getting persisted ${key} for ${address}:`,
      stored || defaultValue
    );
    return stored ? stored : defaultValue;
  };

  // Helper function to set persisted balance
  const setPersistedBalance = (key, value) => {
    if (!address) return;
    localStorage.setItem(`${address}_${key}`, value);
  };

  const [walletBalance, setWalletBalance] = useState("0");
  const [cashBalance, setCashBalance] = useState("0");
  const [savingsBalance, setSavingsBalance] = useState(() =>
    getPersistedBalance("savingsBalance", "0")
  );
  const [investmentBalance, setInvestmentBalance] = useState(() =>
    getPersistedBalance("investmentBalance", "0")
  );
  const [isLoading, setIsLoading] = useState(true);

  // Real-time date and time state
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Toast and Transaction History State
  const [toast, setToast] = useState(null);
  const [transactions, setTransactions] = useState(() => {
    if (!address) return [];
    const stored = localStorage.getItem(`${address}_transactions`);
    return stored ? JSON.parse(stored) : [];
  });

  const fetchBalances = async () => {
    if (!client || !address || !signingClient) return;

    setIsLoading(true);
    try {
      // Only fetch wallet balance from blockchain (real balance)
      const user = await client.getBalance(address, "ustars");
      const newWalletBalance = (parseInt(user.amount) / 10 ** 6).toFixed(1);
      setWalletBalance(newWalletBalance);
      setPersistedBalance("walletBalance", newWalletBalance);

      // Only fetch cash balance from recipient address
      const cash = await client.getBalance(RECIPIENT_ADDRESS, "ustars");
      const newCashBalance = (parseInt(cash.amount) / 10 ** 6).toFixed(0);
      setCashBalance(newCashBalance);
      setPersistedBalance("cashBalance", newCashBalance);

      // Don't fetch savings and investment from blockchain - keep persisted transaction totals
      // These represent accumulated amounts from user transactions, not actual contract balances
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (client && address && signingClient) {
      // Only clear wallet balance to ensure fresh fetch from blockchain
      // Keep savings and investment balances as they represent transaction history
      localStorage.removeItem(`${address}_walletBalance`);
      localStorage.removeItem(`${address}_cashBalance`);

      // Always fetch fresh balance from blockchain when wallet connects
      // This ensures the displayed balance matches the actual wallet balance
      fetchBalances();
    }
  }, [client, address, signingClient]);

  // Real-time date and time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toast utility functions
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const closeToast = () => setToast(null);

  const addTransaction = (amount, hash, status = "Success") => {
    const newTransaction = {
      id: Date.now(),
      amount,
      type: "Fund Vaults",
      status,
      hash: hash
        ? `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`
        : "Pending",
      date: new Date().toISOString(),
    };
    const updatedTransactions = [newTransaction, ...transactions.slice(0, 9)]; // Keep only 10 most recent
    setTransactions(updatedTransactions);

    // Persist transactions to localStorage
    if (address) {
      localStorage.setItem(
        `${address}_transactions`,
        JSON.stringify(updatedTransactions)
      );
    }
  };

  const handleFund = async () => {
    if (!signingClient || !address || !amount || parseFloat(amount) <= 0) {
      showToast("Please enter a valid amount.", "error");
      return;
    }

    // Check if user has sufficient balance
    const requestedAmount = parseFloat(amount);
    const currentBalance = parseFloat(walletBalance);
    if (requestedAmount > currentBalance) {
      showToast(
        `Insufficient balance. You have ${currentBalance} STARS but trying to send ${requestedAmount} STARS.`,
        "error"
      );
      return;
    }
    setIsBroadcasting(true);
    setTxHash("");

    const totalStarsAmount = parseFloat(amount) * 10 ** 6;

    const messages = createSplitMessages(
      address,
      RECIPIENT_ADDRESS,
      totalStarsAmount
    );
    if (messages.length === 0) {
      showToast("No funds to send.", "error");
      return;
    }

    const fee = {
      amount: [{ denom: "ustars", amount: "7500" }],
      gas: "500000",
    };

    try {
      console.log("Sending transaction with messages:", messages);
      const result = await signingClient.signAndBroadcast(
        address,
        messages,
        fee,
        `Funding RemitaDAO`
      );
      console.log("Transaction result:", result);
      setTxHash(result.transactionHash);

      const sentAmount = parseFloat(amount);

      // Update balances based on the actual splits (40% cash, 30% savings, 30% investment)
      const newWalletBalance = (parseFloat(walletBalance) - sentAmount).toFixed(
        2
      );
      const newCashBalance = (
        parseFloat(cashBalance) +
        sentAmount * 0.4
      ).toFixed(2);
      const newSavingsBalance = (
        parseFloat(savingsBalance) +
        sentAmount * 0.3
      ).toFixed(2);
      const newInvestmentBalance = (
        parseFloat(investmentBalance) +
        sentAmount * 0.3
      ).toFixed(2);

      setWalletBalance(newWalletBalance);
      setCashBalance(newCashBalance);
      setSavingsBalance(newSavingsBalance);
      setInvestmentBalance(newInvestmentBalance);

      // Persist the updated balances
      setPersistedBalance("walletBalance", newWalletBalance);
      setPersistedBalance("cashBalance", newCashBalance);
      setPersistedBalance("savingsBalance", newSavingsBalance);
      setPersistedBalance("investmentBalance", newInvestmentBalance);

      // Add transaction to history and show success toast
      addTransaction(amount, result.transactionHash, "Success");
      showToast(
        `Successfully sent ${amount} STARS! Funds have been split across your vaults.`,
        "success"
      );
      setAmount(""); // Clear input after successful transaction
    } catch (error) {
      addTransaction(amount, null, "Failed");
      showToast(`Transaction failed: ${error.message}`, "error");
    } finally {
      setIsBroadcasting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <DashboardNav
        onDisconnect={onDisconnect}
        onGoHome={onGoHome}
        address={address}
      />

      <main className="container mx-auto p-4 md:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  👋
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Hello</h1>
                  <p className="text-gray-400">RemitaDAO Dashboard</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {currentDateTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-500">
                {currentDateTime.toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Status Card */}
            <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">
                  +8.2% this month
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Your smart remittance system is active and performing well.
              </p>
              <div className="text-right">
                {isLoading ? (
                  <SkeletonNumber className="mb-1" />
                ) : (
                  <div className="text-3xl font-bold text-white">
                    ${walletBalance}
                  </div>
                )}
                <div className="text-sm text-gray-400">Total Balance</div>
              </div>
            </Card>

            {/* Family Goal Card */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Family Goal
                </h3>
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  🏠
                </div>
              </div>
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">$37,500 / $50,000</span>
                  <span className="text-purple-400">75%</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-purple-400 font-semibold">
                  $12,500 to go
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <DollarSign className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Your Wallet Balance
            </h3>
            {isLoading ? (
              <SkeletonNumber className="mb-2" />
            ) : (
              <p className="text-4xl font-bold text-white mb-2">
                {walletBalance} STARS
              </p>
            )}
            <p className="text-green-400 text-sm">Available Balance</p>
          </Card>

          <Card className="text-center bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <PiggyBank className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              On-Chain Savings Vault
            </h3>
            {isLoading ? (
              <SkeletonNumber className="mb-2" />
            ) : (
              <p className="text-4xl font-bold text-white mb-2">
                ${savingsBalance}
              </p>
            )}
            <p className="text-blue-400 text-sm">STARS</p>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Recipient's Investment Tokens
            </h3>
            {isLoading ? (
              <SkeletonNumber className="mb-2" />
            ) : (
              <p className="text-4xl font-bold text-white mb-2">
                ${investmentBalance}
              </p>
            )}
            <p className="text-purple-400 text-sm">RDSHARE</p>
          </Card>
        </div>

        {/* Fund Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Fund Your Vaults
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Total Amount in STARS"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <Button
              onClick={handleFund}
              disabled={isBroadcasting}
              className="w-full sm:w-auto shrink-0 px-8 py-4"
            >
              {isBroadcasting ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                "Send Funds"
              )}
            </Button>
            <Button
              onClick={fetchBalances}
              variant="secondary"
              className="p-4"
              title="Refresh balances from blockchain"
            >
              <RefreshCw size={18} />
            </Button>
          </div>
        </Card>

        {/* Transaction History Section */}
        <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Transaction History
          </h2>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                  📋
                </div>
                <p>No transactions yet. Start by funding your vaults!</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.status === "Success"
                          ? "bg-green-500/20 text-green-400"
                          : tx.status === "Failed"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {tx.status === "Success"
                        ? "✓"
                        : tx.status === "Failed"
                        ? "✕"
                        : "⏳"}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{tx.type}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(tx.date).toLocaleDateString()} at{" "}
                        {new Date(tx.date).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">
                      {tx.amount} STARS
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {tx.hash}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <Footer />
    </div>
  );
};

// --- The Main App Component ---
export default function App() {
  const [address, setAddress] = useState("");
  const [signingClient, setSigningClient] = useState(null);
  const [client, setClient] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const chainId = "elgafar-1";
  const rpcEndpoint = "https://rpc.elgafar-1.stargaze-apis.com";

  const connectWallet = async () => {
    if (!window.keplr) {
      alert("Please install the Keplr wallet extension.");
      return;
    }
    try {
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);

      const signingClient = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner
      );
      const client = await StargateClient.connect(rpcEndpoint);
      setSigningClient(signingClient);
      setClient(client);
      setShowDashboard(true);
    } catch (error) {
      alert(`Failed to connect wallet: ${error.message}`);
    }
  };

  const handleDisconnect = () => {
    // Clear only wallet and cash balances (keep savings, investment, and transaction history)
    if (address) {
      localStorage.removeItem(`${address}_walletBalance`);
      localStorage.removeItem(`${address}_cashBalance`);
      // Keep savings and investment balances: localStorage.removeItem(`${address}_savingsBalance`);
      // Keep investment balance: localStorage.removeItem(`${address}_investmentBalance`);
      // Keep transaction history: localStorage.removeItem(`${address}_transactions`);
      sessionStorage.removeItem(`${address}_connected`);
    }

    if (signingClient) {
      signingClient.disconnect();
    }
    setSigningClient(null);
    setClient(null);
    setAddress("");
    setShowDashboard(false);
  };

  const handleGoHome = () => {
    setShowDashboard(false);
  };

  if (showDashboard && signingClient && address) {
    return (
      <>
        <Dashboard
          onDisconnect={handleDisconnect}
          onGoHome={handleGoHome}
          address={address}
          signingClient={signingClient}
          client={client}
        />
        <ChatBot />
      </>
    );
  }

  return (
    <>
      <LandingPage onLaunchApp={connectWallet} />
      <ChatBot />
    </>
  );
}
