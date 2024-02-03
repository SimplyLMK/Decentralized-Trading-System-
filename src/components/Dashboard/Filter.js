import { useState } from 'react'

const filterTag = ['all', 'yoi', 'cheapest', 'expensive', 'wjbu'];

export default function Filter({changeFilter}) {
{
    
    const [currentFilter, setCurrentFilter] = useState('all')

    const HandleClick = (newFilter) => {
        setCurrentFilter(newFilter)
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