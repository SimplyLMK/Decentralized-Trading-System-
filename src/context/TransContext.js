import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../smart_contract_v2/Api/constant';


//__writen by 104179506__Le Minh Kha
// transactionContext the key to interact with the deployed contract
// the API of the contract is fetched in the constant.js, and invoked here
export const TransactionsContext = React.createContext();


// create ethereum object, this enable functions usage from the blockchain
const { ethereum } = window;  



if (window.ethereum) {
} else {
  alert('Please install MetaMask beforehand');
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


// will wrap this around the entire main.js to enable global access
export const TransactionProvider = ({ children }) => 
{

    // setting up hooks
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [account, setAccount] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);
    ;

//////////////////////////////////////////////////////////////////////////////////
    const walletState = async () => {
        try {
            if (!ethereum) return alert("Install MetaMask.");

            // sends a request to the Ethereum provider(metamask)
            const accounts = await ethereum.request({ method: "eth_accounts" });
      
            if (accounts.length) {
              setAccount(accounts[0]);
      
              getAllTransactions();
            } 
            else 
            {
              console.log("No accounts found");
            }
          } catch (error) {
            console.log(error);
          }
    }
///////////////////////////////////////////////////////////////////////////////////
    const connectAccount = async () => {
        try {
            if (!ethereum) return alert("Install MetaMask.");

            //connect metamask Ethereum account to the application
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            // update account to the first one
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
          if (ethereum) 
          {
            // instantiate a contract
            const transactionsContract = createEthereumContract();
            
            // fetches all transactions related to the contract
            // await until the promise to getAllTransaction is resolved
            const availableTransactions = await transactionsContract.getAllTransactions();
            
            //For each transaction, an object is created with properties as shown
            const structuredTransactions = (availableTransactions || []).map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              //  standard converion of the base unit 'wei' to 'ether'
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

// core function to send transaction to the blockchain
const sendTransaction = async ({ addressTo, amount, keyword, message } = {}) => {
  try {
    if (ethereum) {
      // Use the provided parameters, falling back to formData if not provided
      // the args are all will be retrieved from firestore, and pass in
      const transactionAddressTo = addressTo || formData.addressTo;
      const transactionAmount = amount || formData.amount;
      const transactionKeyword = keyword || formData.keyword;
      const transactionMessage = message || formData.message;

      // instantiate a contract, use the account ethereum balance to send the transaction
      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(transactionAmount);

      // "eth_sendTransaction" to metamask, which will pop up window to confirm the transaction
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: account,
          to: transactionAddressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        }],
      });

      // after the transaction is confirmed, added to the blockchain (check out transaction.sol)
      const transactionHash = await transactionsContract.addToBlockchain(transactionAddressTo, parsedAmount, transactionMessage, transactionKeyword);

      setIsLoading(true);
      // waiting for the transaction to be mined
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);
        
        // fetches the total number of transactions 
        const transactionsCount = await transactionsContract.getTransactionCount();
        // and sets it to the state
        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else 
      {
        console.log("didnt work");
      }
    } catch (error) {
      console.log(error);  
    }
  };

///////////////////////////////////////////////////////////////////////////////////
const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) 
      {
        // instantiate a contract
        const transactionsContract = createEthereumContract();
        // await for the promise being returned as the number of contracts
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
            formData,
            setformData,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}



