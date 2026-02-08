import type {DropdownOption} from "../appTypes.tsx";
import SearchDropdown from "./SearchDropdown.tsx";

type SearchProps = {
    dropdownOptions: DropdownOption[];
    onSearchOptionChange: (event: { target: { value: string; }; }) => void;
    onSearchTextChange: (event: { target: { value: string; }; }) => void;
    searchText: string;
    selectedValue: string;
}

function Search ({dropdownOptions, onSearchOptionChange, onSearchTextChange, searchText,  selectedValue} : SearchProps){
    return (
        <div>
            <SearchDropdown
                dropdownOptions={dropdownOptions}
                onSearchOptionChange={onSearchOptionChange}
                selectedValue={selectedValue}
            />
            <input
                className="bg-[whitee] border border-solid border-[black] p-1"
                type="search"
                onChange={onSearchTextChange}
                value={searchText}
            />
        </div>
    );
}

export default Search;
