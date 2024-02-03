import { useState } from 'react'

const filterTag = ['all', 'yoi', 'cheapest', 'expensive', 'wjbu'];


//__writen by 104179506__Le Minh Kha
// filter component is invoked in Dashboard compoenent
export default function Filter({changeFilter}) // accept the changeFilter function as a prop
{
{
    
    // set default to 'all'
    const [currentFilter, setCurrentFilter] = useState('all')

    // when fired, calls setCurrentFilter with the newFilter value.
    // =>  updates current to new filter value passed as an arg
    const HandleClick = (newFilter) => 
    {
        setCurrentFilter(newFilter);
        changeFilter(newFilter);
    }

    return (
        <div className="filter">
            <nav>
                {/* when func is invoked, update the new state */}
                {filterTag.map(f => (
                    <button key={f} onClick={() => HandleClick(f)}
                    // if current filter active then we style it differently
                    className={currentFilter === f ? "active" : ""}>
                    
                    {f}</button>
                ))}
            </nav>
        </div>
    )
}
}