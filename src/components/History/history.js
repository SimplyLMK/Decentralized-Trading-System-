import '../History/history.css'
import { useContext } from 'react'
import { TransactionsContext } from '../../context/TransContext'
import dummyData from './dummyData';
import A_Transaction from './aBlock';

//__writen by 104179506__Le Minh Kha
// dummy Data was filled by real data from the blockchain
const History = () => {
  const { transactions, account } = useContext(TransactionsContext);

  return (
    <div >
      <div >
        {account ? (<h3>Latest Transactions</h3>) : 
        (<h3>Connect your account to see the latest transactions</h3>)}

        <div >
          {/* array of transactions = dummyData concat transactions and maped out */}
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <A_Transaction key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
 };
 
 export default History;
 