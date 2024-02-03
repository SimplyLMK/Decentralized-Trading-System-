import { useState } from 'react';

//__writen by 104179506__Le Minh Kha
// this is similar to the filter component, but it is used to filter the assets by nam
export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
   
    const handleSearchChange = (event) => {
       setSearchTerm(event.target.value);
       onSearch(event.target.value);
    };
   
    return (
    //    <input
    //      type="text"
    //      value={searchTerm}
    //      onChange={handleSearchChange}
    //      placeholder="Search assets..."
    //    />

    <div id="cover">
  <form method="get" action="">
    <div className="tb">
      <div className="td">
        <input 
          type="text" 
          placeholder="Search" 
          required 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
      
      </div>
    </div>
  </form>
</div>
    );
}


