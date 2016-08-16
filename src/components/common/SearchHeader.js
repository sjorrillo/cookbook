import React, {PropTypes} from 'react';

const SearchHeader = ({active, filter, onToggle, onChange, onSearch}) => {
    return (
         <li className={active ? "search active": "search"}>
            {!active  && <a href="javascript:void(0);" onClick={onToggle}><i className="material-icons">search</i></a>}
            {active && <form onSubmit={onSearch}>
                <div className="input-field">
                    <input id="search" type="search" value={filter} placeholder="Search" onChange={onChange} onBlur={onToggle}/>
                    <label htmlFor="search"><i className="material-icons">search</i></label>
                </div>
            </form>}
        </li>
    );
};

SearchHeader.propTypes = {
    active: PropTypes.bool.isRequired,
    filter: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default SearchHeader;