import React, { useState, useEffect } from "react";
import { Divider, Input, RangeSlider, Drawer, Button } from "@mantine/core";
import { IconUserCircle, IconFilter } from "@tabler/icons-react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../LandingPage/DATA";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlices";
import { useMediaQuery } from "@mantine/hooks";

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter);
    const [name, setName] = useState(filter?.name || "");
    const [expRange, setExpRange] = useState<[number, number]>(filter?.exp || [0, 50]);
    const [drawerOpened, setDrawerOpened] = useState(false);

    // Detect screen sizes below 1023px
    const isBelow1023 = useMediaQuery("(max-width: 1023px)");

    useEffect(() => {
        if (filter?.name !== name) {
            dispatch(updateFilter({ name }));
        }
    }, [name, dispatch]);

    useEffect(() => {
        if (filter?.exp !== expRange) {
            dispatch(updateFilter({ exp: expRange }));
        }
    }, [expRange, dispatch]);

    return (
        <div className="flex flex-col md:flex-row px-5 py-8 items-center gap-2 container mx-auto max-w-[1280px] 2xl:max-w-[1920px]"> {/* added container and 2xl*/}
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

            {/* Talent Name Input and Filters (For screens larger than 1023px) */}
            {!isBelow1023 && (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full"> {/* Flex container for alignment */}
                    {/* Talent Name Input (Adjusted for different screen sizes) */}
                    <div className="flex items-center ml-4 md:ml-8 lg:ml-12 xl:ml-40 2xl:ml-40"> {/* Responsive margin */}
                        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
                            <IconUserCircle size={20} />
                        </div>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="[&_input]:!placeholder-mine-shaft-300"
                            variant="unstyled"
                            placeholder="Talent Name"
                        />
                    </div>

                    {/* Filters inline (Aligned vertically with Talent Name) */}
                    <div className="flex flex-wrap gap-4 items-center"> {/* Adjusted for vertical alignment */}
                        {searchFields.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="min-w-[150px]"> {/* Adjusted width for better visibility */}
                                    <MultiInput options={item.options} title={item.title} icon={item.icon} />
                                </div>
                                {index < searchFields.length - 1 && <Divider orientation="vertical" size="sm" />} {/* Vertical divider */}
                            </React.Fragment>
                        ))}

                        {/* Experience Range Slider */}
                        <div className="min-w-[200px]"> {/* Adjusted width for range slider */}
                            <div className="flex text-sm justify-between">
                                <div>Experience (Years)</div>
                                <div>{expRange[0]} - {expRange[1]}</div>
                            </div>
                            <RangeSlider
                                onChangeEnd={(e) => setExpRange(e)}
                                min={1}
                                max={50}
                                minRange={1}
                                size="xs"
                                color="brightSun.4"
                                value={expRange}
                                labelTransitionProps={{
                                    transition: "skew-down",
                                    duration: 150,
                                    timingFunction: "linear",
                                }}
                                onChange={setExpRange}
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
                title="Filter Talents"
            >
                <div className="flex flex-col gap-4 px-4">
                    {/* Talent Name Input inside Drawer (Only for screens below 1023px) */}
                    {isBelow1023 && (
                        <div className="flex items-center">
                            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
                                <IconUserCircle size={20} />
                            </div>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="[&_input]:!placeholder-mine-shaft-300"
                                variant="unstyled"
                                placeholder="Talent Name"
                            />
                        </div>
                    )}

                    {/* Other Filters */}
                    {searchFields.map((item, index) => (
                        <MultiInput key={index} options={item.options} title={item.title} icon={item.icon} />
                    ))}

                    {/* Experience Range */}
                    <div className="w-full">
                        <div className="flex text-sm justify-between">
                            <div>Experience (Years)</div>
                            <div>{expRange[0]} - {expRange[1]}</div>
                        </div>
                        <RangeSlider
                            onChangeEnd={(e) => setExpRange(e)}
                            min={1}
                            max={50}
                            minRange={1}
                            size="xs"
                            color="brightSun.4"
                            value={expRange}
                            labelTransitionProps={{
                                transition: "skew-down",
                                duration: 150,
                                timingFunction: "linear",
                            }}
                            onChange={setExpRange}
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