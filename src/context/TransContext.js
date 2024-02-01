import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAPI, contractAddress } from '../smart_contract_v2/Api/constant';

export const TransactionsContext = React.createContext();


// create ethereum object, this enable functions usage from the blockchain
const { ethereum } = window;  



const createEthereumContract = () => 
{ 
    // create provider and signer objects 
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // create contract object 
    const contract = new ethers.Contract(contractAddress, contractAPI, signer);

    return contract;
}


export const TransactionProvider = ({ children }) => 
{

    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [account, setAccount] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };
    
    

//////////////////////////////////////////////////////////////////////////////////
    const walletState = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
      
            const accounts = await ethereum.request({ method: "eth_accounts" });
      
            if (accounts.length) {
              setAccount(accounts[0]);
      
              getAllTransactions();
            } else {
              console.log("No accounts found");
            }
          } catch (error) {
            console.log(error);
          }
    }
///////////////////////////////////////////////////////////////////////////////////
    const connectAccount = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
      
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      
            setAccount(accounts[0]);
            window.location.reload();
          } catch (error) 
          
          {
            console.log(error);
            throw new Error("No ethereum object");
          }
        };
///////////////////////////////////////////////////////////////////////////////////
    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };
///////////////////////////////////////////////////////////////////////////////////

const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: account,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

///////////////////////////////////////////////////////////////////////////////////
const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };    

///////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        try {
            walletState();
            checkIfTransactionsExists();
        } catch (error) 
        {
            console.error(error);
        }
    },  [transactionCount]);


///////////////////////////////////////////////////////////////////////////////////
    // wrap the react app with the all the data from provider and render the props
    // check out index.js to see how it is implemented
    return (
        // pass in the connectAccount as a prop to all of our component
        // especially the dashboard and create component
        <TransactionsContext.Provider value={{ connectAccount, account,  transactionCount,transactions,
            isLoading,
            sendTransaction,
            handleChange,
            formData,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}
