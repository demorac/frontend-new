import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlices';

interface MultiInputProps {
    options?: string[]; // Options for the dropdown
    title?: string;     // Title for the input
    icon?: React.ElementType;
}
const MultiInput: React.FC<MultiInputProps> = (props) => {
    const { options = [], title = "Job Title", icon: Icon = IconSearch } = props; // Default values


    const dispatch = useDispatch();

    useEffect(() => {
        setData(options);
    }, [options]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<string[]>(options);
    const [value, setValue] = useState<string[]>([]);

    const exactOptionMatch = data ? data.some((item) => item === search) : false;

    const handleValueSelect = (val: string) => {
        setSearch('');

        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue((current) => [...current, search]);
            if (!props.title) {
                console.error("Error: props.title is undefined");
                return;
            }

            dispatch(updateFilter({ [props.title]: [...(value || []), search] }));

        } else {
            if (!props.title) {
                console.error("Error: props.title is undefined");
                return;
            }
            dispatch(updateFilter({ [props.title]: value.includes(val) ? value.filter((v) => v !== val) : [...value, val] }));
            setValue((current) =>
                current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
            );
        }
    };

    const handleValueRemove = (val: string) => {
        if (!props.title) {
            console.error("Error: props.title is undefined");
            return;
        }
        dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
        setValue((current) => current.filter((v) => v !== val));
    }

    const values = value
        .slice(0, 1)
        .map((item) => (
            <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
                {item}
            </Pill>
        ));

    const optionsList = data
        .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item) => (
            <Combobox.Option value={item} key={item} active={value.includes(item)}>
                <Group gap="sm">
                    <Checkbox
                        size="xs"
                        color="brightSun.4"
                        checked={value.includes(item)}
                        onChange={() => { }}
                        aria-hidden
                        tabIndex={-1}
                        style={{ pointerEvents: 'none' }}
                    />
                    <span className="!text-mine-shaft-300">{item}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput
                    variant="unstyled"
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        <div className="text-bright-sun-400 p-1 bg-slate-900 rounded-full mr-2">
                            <Icon size={16} />
                        </div>
                    }
                >
                    <Pill.Group>
                        {value.length > 0 ? (
                            <>
                                {values}
                                {value.length > 1 && <Pill>+{value.length - 1} more</Pill>}
                            </>
                        ) : (
                            <Input.Placeholder className="!text-mine-shaft-200">{title}</Input.Placeholder>
                        )}
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder={`Search ${title.toLowerCase()}`} // Dynamic placeholder
                />
                <Combobox.Options>
                    {optionsList}

                    {!exactOptionMatch && search.trim().length > 0 && (
                        <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                    )}

                    {exactOptionMatch && search.trim().length > 0 && optionsList.length === 0 && (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default MultiInput;