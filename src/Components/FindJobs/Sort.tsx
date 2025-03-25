import { useSelector, useDispatch } from "react-redux";
import { useCombobox, Combobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { updateSort } from "../../Slices/SortSlice";
import { useMediaQuery } from "@mantine/hooks";

interface SortProps {
    sortType: "job" | "talent";
}

const Sort: React.FC<SortProps> = ({ sortType }) => {
    const dispatch = useDispatch();
    const selectedItem = useSelector((state: any) => state.sort.sortBy || "Relevance");
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const sortOptions =
        sortType === "job"
            ? ["Relevance", "Most Recent", "Salary: Low to High", "Salary: High to Low"]
            : ["Relevance", "Experience: Low to High", "Experience: High to Low"];

    const options = sortOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    // Determine combobox width based on screen size
    const isExtraSmallScreen = useMediaQuery("(max-width: 375px)");
    const comboboxWidth = isExtraSmallScreen ? 150 : 180;

    return (
        <Combobox
            store={combobox}
            width={comboboxWidth} // Use the dynamic width
            position="bottom-start"
            onOptionSubmit={(val) => {
                dispatch(updateSort(val));
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <div
                    onClick={() => combobox.toggleDropdown()}
                    className="cursor-pointer border border-bright-sun-400 flex text-sm gap-2 px-2 py-1 rounded-xl items-center"
                >
                    {selectedItem} <IconAdjustments className="h-5 w-5 text-bright-sun-400" />
                </div>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default Sort;