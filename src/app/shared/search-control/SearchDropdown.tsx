import type {DropdownOption} from "../../appTypes.tsx";

type SearchDropdownProps = {
    dropdownOptions: DropdownOption[];
    onSearchOptionChange: (event: { target: { value: string; }; }) => void;
    selectedValue: string;
}

function SearchDropdown ({dropdownOptions, onSearchOptionChange, selectedValue} : SearchDropdownProps){
    return (
        <div>
            <select
                className="bg-[whitee] border border-solid border-[black] px-1 py-2"
                value={selectedValue}
                onChange={onSearchOptionChange}
            >
                {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SearchDropdown;
