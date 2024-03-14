//__writen by 104179506__Le Minh Kha
// edited by Thanh Thao Bui - 104170172 
// I used <tr> and <td> for each transaction will return a row in the table 

import '../History/history.css'

const A_Transaction = ({ transactionHash, addressTo, addressFrom, amount}) => {
  
    return (
      <tr>
        <td>
          <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer">
            <p className="data-in-row">{transactionHash.substring(0, 24) + "..."}</p>
          </a>
        </td>
        <td>
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="data-in-row">{addressFrom.substring(0, 12) + "..." + addressFrom.substring(addressFrom.length - 12)}</p>
          </a>
        </td>
        <td>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="data-in-row">{addressTo.substring(0, 12) + "..." + addressTo.substring(addressTo.length - 12)}</p>  
          </a>
        </td>
        <td>
          <p className="data-in-row">{amount} ETH</p>
        </td>
      </tr>
    );
  };

  export default A_Transaction;