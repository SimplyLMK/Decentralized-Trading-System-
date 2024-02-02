import './dashboard.css';
import { TransactionsContext } from '../../context/TransContext';
import React, {useContext} from 'react';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { ts } from '../../fb/config';



  
  const Dashboard = () => 
  {

    //////////////////////////////////////////////////////////
    const { account, connectAccount, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionsContext);
    
    //////////////////////////////////////////////////////////
    
    const {documents, error} = useCollection('assets');

    ///////////////////////////////////////////////////////////
    
    const docOrder = (documents) => {
      return [...documents].sort((a, b) => b.ts.toDate() - a.ts.toDate());
    };

    ///////////////////////////////////////////////////////////
    

    
return (
  <div className="library">
    <div className="title">Here are all the digital assets available for trading </div>
    <div className="flex-container">
      {documents && documents.map((doc) => (
        <Link key={doc.id} to={`/details/${doc.id}`}>

          <div className="asset-container">
            <div id="parent">
              <div className="asset-image-container">
                <div className="asset-image-overlayer2"></div>
                <img src={doc.image}/> 
              </div>

              <div className="asset-info">
                <div className="asset-image-container2">
                  <img src={doc.image}/> 
                  <h2>{doc.name}</h2>
                </div>
              </div>

              <div className="asset-image-container3">
                <div className="asset-image-overlayer1"></div>
                <img src={doc.image} /> 
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <div>Dashboard</div>
    {!account && <button onClick={connectAccount}>Connect Wallet</button>}
  </div>
);
}


  export default Dashboard;

  