import { useEffect, useState } from "react";
import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";

const SelectInput = (props: any) => {
    console.log("SelectInput props:", props);
    console.log("props.form:", props.form);
    console.log("props.form.getInputProps:", props.form?.getInputProps);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!props.form?.getInputProps) {
            console.error("Error: props.form or getInputProps is undefined");
            return;
        }

        setData(props.options || []);
        const initialValue = props.form.getInputProps(props.name)?.value || "";
        setValue(initialValue);
        setSearch(initialValue);
    }, [props.name, props.form, props.options]);

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) =>
            item.toLowerCase().includes(search?.toLowerCase().trim())
        );

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === "$create") {
                    setData((current) => [...current, search]);
                    setValue(search);
                    props.form?.setFieldValue(props.name, search); // ✅ Fixed here
                } else {
                    setValue(val);
                    setSearch(val);
                    props.form?.setFieldValue(props.name, val); // ✅ Fixed here
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    withAsterisk
                    {...(props.form?.getInputProps ? props.form.getInputProps(props.name) : {})}
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || "");
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}
                        {!exactOptionMatch && search?.trim().length > 0 && (
                            <Combobox.Option value="$create">
                                + Create {search}
                            </Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default SelectInput;