import './dashboard.css';
import { TransactionsContext } from '../../context/TransContext';
import React, {useContext, useState, useEffect} from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import Filter from './Filter';
import Display from './Template';
import SearchBar from './Searchbar';

  //__writen by 104179506__Le Minh Kha
  // Dashboard is the main component that displays all the assets available for trading
  // it retrieve the collection of document pushed to firestore by the create component
  const Dashboard = () => 
  {

    // receiving props and setups
    // firebase functions turn into template to be imported as hooks
    // => greatly increase code reusibility 
    const {documents} = useCollection('assets');
    const {deleteDocument} = useFirestore('assets');
  
    const [filter, setfilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState('');

    ////////////////////////////////////////

    // state setter from useState hook
    // set the arg to the new filter
    // when invoked, it will update the filter state
    const changeFilter = (newFilter) => 
    {
      setfilter(newFilter);
    }

    const searchAssets = (searchTerm) => 
    {
      setSearchTerm(searchTerm);
     };
     

    // is invoked when transaction is completed, remove the displayed offer
    const handleDelete = (e) =>
     {
       deleteDocument(document.id);
     }


     // test case to check if the filter match the category of the document stored of Fierstore
     // this is for the requirement "Filter" function of project
     const assets = documents ? documents.filter(document => {
      let matchesFilter = true;
      switch(filter) {
         case 'all':
           break;
         case 'yoi':
         case 'cheapest':
         case 'expensive':
         case 'wjbu':
           matchesFilter = document.category === filter;
           break;
         default:
           break;
      }
      
      // check whether the document name matches the user input (searchterm)
      // this is for the requirement "Search" function of project
      const matchesSearchTerm = document.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearchTerm;
     }) : null;
     
     const assetsCount = assets ? assets.length : 0;


return (

  <div className="library">
    {/* <div className="title">Here are all the digital assets available for trading </div>
     */}
    {/* search */}
    {documents && <SearchBar onSearch={searchAssets} />}    

    {/* filtered */}
    {documents && <Filter changeFilter={changeFilter} />}
    
    {/* template */}
    {assets && <Display assets={assets} count={assetsCount} />}
    
    
  </div>
);
}


  export default Dashboard;

  