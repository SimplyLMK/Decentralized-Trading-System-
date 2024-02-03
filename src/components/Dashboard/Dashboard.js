import './dashboard.css';
import { TransactionsContext } from '../../context/TransContext';
import React, {useContext, useState, useEffect} from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import Filter from './Filter';
import Display from './Template';
import SearchBar from './Searchbar';

  
  const Dashboard = () => 
  {

    // receiving props and setups
    const {documents, error, count} = useCollection('assets');
  
    const [filter, setfilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState('');
    
    const {deleteDocument} = useFirestore('assets');
   

    //////////////////__function_toBe_Invoked__//////////////////////

    const changeFilter = (newFilter) => {
      setfilter(newFilter);
    }

    const searchAssets = (searchTerm) => {
      setSearchTerm(searchTerm);
     };
     
    
   

    // is invoked when transaction is completed, remove the displayed offer
    const handleDelete = (e) =>
     {
       deleteDocument(document.id);
     }


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

  