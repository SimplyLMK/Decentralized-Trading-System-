//__writen by 104179506__Le Minh Kha

const A_Transaction = ({ addressTo, addressFrom, amount}) => {
  
    return (
      <div>
        <div>
          <div>
            <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
              <p>From: {addressFrom}</p>
            </a>
            <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
              <p>To: {addressTo}</p>  
            </a>
            <p>Amount: {amount} ETH</p>
            <br></br>
          </div>
        </div>
      </div>
    );
  };

  export default A_Transaction;