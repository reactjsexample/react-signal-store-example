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
        <div className="flex w-full justify-end gap-2 items-center">
            <label>Search by:</label>
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
