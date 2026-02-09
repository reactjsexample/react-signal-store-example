import type {DropdownOption} from "../../appTypes.tsx";
import {FaSearch} from 'react-icons/fa';
import "./searchControl.css";
import SearchDropdown from "./SearchDropdown.tsx";

type SearchProps = {
    dropdownOptions: DropdownOption[];
    onSearchOptionChange: (event: { target: { value: string; }; }) => void;
    onSearchTextChange: (event: { target: { value: string; }; }) => void;
    searchText: string;
    selectedValue: string;
}

function SearchControl({dropdownOptions, onSearchOptionChange, onSearchTextChange, searchText, selectedValue}: SearchProps) {
    return (
        <div className="flex justify-end gap-2 items-center">
            <label className="whitespace-nowrap">Search by:</label>
            <SearchDropdown
                dropdownOptions={dropdownOptions}
                onSearchOptionChange={onSearchOptionChange}
                selectedValue={selectedValue}
            />
            <div className="search-input-wrap">
                <input
                    className="search-input bg-[whitee] border border-solid border-[black] p-1"
                    type="search"
                    onChange={onSearchTextChange}
                    value={searchText}
                />
                <FaSearch className="search-icon"/>
            </div>
        </div>
    );
}

export default SearchControl;
