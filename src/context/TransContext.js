import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../smart_contract_v2/Api/constant';

export const TransactionsContext = React.createContext();


// create ethereum object, this enable functions usage from the blockchain
const { ethereum } = window;  



if (window.ethereum) {
  // Use the ethereum object here
} else {
  alert('Please install MetaMask or another Ethereum-enabled browser!');
}


const createEthereumContract = () => 
{ 
    // create provider and signer objects 
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // create contract object 
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
}


export const TransactionProvider = ({ children }) => 
{

    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [account, setAccount] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);


    // dynamically update form data
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
            
          }
        };
///////////////////////////////////////////////////////////////////////////////////
    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = (availableTransactions || []).map((transaction) => ({
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

const sendTransaction = async ({ addressTo, amount, keyword, message } = {}) => {
  try {
    if (ethereum) {
      // Use the provided parameters, falling back to formData if not provided
      const transactionAddressTo = addressTo || formData.addressTo;
      const transactionAmount = amount || formData.amount;
      const transactionKeyword = keyword || formData.keyword;
      const transactionMessage = message || formData.message;

      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(transactionAmount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: account,
          to: transactionAddressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        }],
      });

      const transactionHash = await transactionsContract.addToBlockchain(transactionAddressTo, parsedAmount, transactionMessage, transactionKeyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);
        

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("didnt work");
      }
    } catch (error) {
      console.log(error);

      
    }
    // try{
    //   const {addressTo, amount, keyword, message} = formData;
    //   createEthereumContract();
    // }

    // catch (error) {

    //   console.log(error);
    // }
    

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
        <TransactionsContext.Provider value={{ connectAccount, account, transactionCount,transactions,
            isLoading,
            sendTransaction,
            handleChange,
            formData,
            setformData,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}



