function FilterBar({filters,onChange,categories}){
    return(
    <div className="filter-bar-container">
        <select value={filters.category} onChange={(e)=>onChange("category",e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}
        </select>
    </div>
    )
}
export default FilterBar;
