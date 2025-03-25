import React, { useState, useEffect } from "react";
import { Divider, RangeSlider, Drawer, Button } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import MultiInput from "./MultiInput";
import { dropdownData } from "../LandingPage/DATA";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlices";
import { useMediaQuery } from "@mantine/hooks";

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter);
    const [salaryRange, setSalaryRange] = useState<[number, number]>(filter?.salary || [1, 100]);
    const [drawerOpened, setDrawerOpened] = useState(false);

    // Detect screen sizes below 1023px
    const isBelow1023 = useMediaQuery("(max-width: 1023px)");

    useEffect(() => {
        if (filter?.salary !== salaryRange) {
            dispatch(updateFilter({ salary: salaryRange }));
        }
    }, [salaryRange, dispatch]);

    return (
        <div className="flex flex-col md:flex-row px-5 py-8 items-center gap-2 container mx-auto max-w-[1280px] 2xl:max-w-[1920px]"> {/* Added container and 2xl max width */}
            {/* "Filters" button for screens below 1023px */}
            {isBelow1023 && (
                <Button
                    leftSection={<IconFilter size={16} />}
                    color="brightSun.4"
                    variant="outline"
                    onClick={() => setDrawerOpened(true)}
                >
                    Filters
                </Button>
            )}

            {/* Filters inline (For screens larger than 1023px) */}
            {!isBelow1023 && (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full"> {/* Flex container for alignment */}
                    {/* Filters inline (Aligned vertically) */}
                    <div className="flex flex-wrap gap-4 items-center"> {/* Adjusted for vertical alignment */}
                        {dropdownData.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="min-w-[150px]"> {/* Adjusted width for better visibility */}
                                    <MultiInput options={item.options} title={item.title} icon={item.icon} />
                                </div>
                                {index < dropdownData.length - 1 && <Divider orientation="vertical" size="sm" />} {/* Vertical divider */}
                            </React.Fragment>
                        ))}

                        {/* Salary Range Slider */}
                        <div className="min-w-[200px]"> {/* Adjusted width for range slider */}
                            <div className="flex text-sm justify-between">
                                <div>Salary (LPA)</div>
                                <div>₹{salaryRange[0]} LPA - ₹{salaryRange[1]} LPA</div>
                            </div>
                            <RangeSlider
                                min={1}
                                max={100}
                                value={salaryRange}
                                onChange={setSalaryRange}
                                onChangeEnd={(value) => setSalaryRange(value)}
                                size="xs"
                                color="brightSun.4"
                                labelTransitionProps={{
                                    transition: "skew-down",
                                    duration: 150,
                                    timingFunction: "linear",
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Drawer (For Small & Medium Screens) */}
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                position="left"
                size="80%"
                title="Filter Jobs"
            >
                <div className="flex flex-col gap-4 px-4">
                    {/* Dropdown Filters */}
                    {dropdownData.map((item, index) => (
                        <MultiInput key={index} options={item.options} title={item.title} icon={item.icon} />
                    ))}

                    {/* Salary Range Slider */}
                    <div className="w-full">
                        <div className="flex text-sm justify-between">
                            <div>Salary (LPA)</div>
                            <div>₹{salaryRange[0]} LPA - ₹{salaryRange[1]} LPA</div>
                        </div>
                        <RangeSlider
                            min={1}
                            max={100}
                            value={salaryRange}
                            onChange={setSalaryRange}
                            onChangeEnd={(value) => setSalaryRange(value)}
                            size="xs"
                            color="brightSun.4"
                            labelTransitionProps={{
                                transition: "skew-down",
                                duration: 150,
                                timingFunction: "linear",
                            }}
                        />
                    </div>

                    {/* Apply Filters Button */}
                    <Button fullWidth color="brightSun.4" onClick={() => setDrawerOpened(false)}>
                        Apply Filters
                    </Button>
                </div>
            </Drawer>
        </div>
    );
};

export default SearchBar;