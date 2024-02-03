import './details.css'
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { TransactionsContext } from '../../context/TransContext';
import { useContext } from 'react';



//__writen by 104179506__Le Minh Kha
// details is the page enable purchasing on a single asset
export default function Details() 
{       
        // main.js route :create/:id was used to enable param usage
        // params id allow us to get the specific document in the collection
        const { id } = useParams();

        // we are fetching a single document from the collection, so its 'useDocument'
        // check out the useDocument.js in the hooks folder for clarity
        const { document, error, isLoading } = useDocument('assets', id);

        // useContext hook is used to receive props from TransContext.js
        const { account, sendTransaction} = useContext(TransactionsContext);

        

        console.log("account", account);

        if (isLoading) // the doc is initially null, so we have to give it time to load
        {
            return <div>Loading...</div>;
        }
    
        if (error) 
        {
            return <div>{error}</div>;
        }

        const handleSubmit = (e) => {
            e.preventDefault();
          
            // Directly use document properties retrieved from firestore
            const addressTo = document.account;
            const amount = document.price;
            const keyword = document.name;
            const message = ''; 
          
            // pass in the args we just set aboved
            // this function exported as prop from transContext.js
            sendTransaction({ addressTo, amount, keyword, message });
          };
          

        return (
                <div className="playlist-details">
                    <div className="playlist-info">
                        <div className="cover">
                            {document && <img src={document.image} alt="../../images/play.png" />}
                        </div>
                        <strong>Offered by:</strong>
                        <p className="description">{document && document.account}</p>
                    </div>
                    <div className="one-song">
                        <div className="info">  
                            <strong className="title">{document && document.name}</strong>
                            
                            <div className='price'>
                                <p>{document && document.price} ETH</p>
                            </div>
                        </div>
                        {account ?<button className="button-77" onClick={handleSubmit}>Instant Purchase</button> :
                        <p>You need to connect account first before being able purchase</p>}

                    </div>
                </div>
            );
}
  