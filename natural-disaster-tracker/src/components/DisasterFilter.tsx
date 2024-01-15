import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setDisasterFilters } from "@/actions";

import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

const DisasterFilter = () => {
    const dispatch = useDispatch();

    const options: Option[] = [
        { id: 8, label: 'Wildfires' },
        { id: 10, label: 'Severe Storms' },
        { id: 12, label: 'Volcanoes' },
        { id: 15, label: 'Iceberg' },
    ];

    const [selectedOptions, setSelectedOptions] = useState<number[]>([8, 10, 12, 15]);

    const handleCheckboxChange = (optionId: number) => {
      setSelectedOptions((prevSelectedOptions: any) => {
        if (prevSelectedOptions.includes(optionId)) {
            const newOptions = prevSelectedOptions.filter((id: any) => id !== optionId);
            const wildfires = newOptions.includes(8);
            const severeStorms = newOptions.includes(10);
            const volcanoes = newOptions.includes(12);
            const icebergs = newOptions.includes(15);
            dispatch(setDisasterFilters({wildfires: wildfires, severeStorms: severeStorms, volcanoes: volcanoes, icebergs: icebergs}))
            return newOptions;
        } else {
            const wildfires = [...prevSelectedOptions, optionId].includes(8);
            const severeStorms = [...prevSelectedOptions, optionId].includes(10);
            const volcanoes = [...prevSelectedOptions, optionId].includes(12);
            const icebergs = [...prevSelectedOptions, optionId].includes(15);      
            dispatch(setDisasterFilters({wildfires: wildfires, severeStorms: severeStorms, volcanoes: volcanoes, icebergs: icebergs}))
            return [...prevSelectedOptions, optionId];
        }
      });
    };



    return (
        <Accordion className="absolute top-16 left-16 w-60 p-0 mt-12 bg-opacity-70 text-lg text-white hover:bg-black ">
            <AccordionPanel className="hover:bg-black  bg-opacity-70">
                <AccordionTitle className="text-xl h-12 text-white hover:bg-black bg-black bg-opacity-70 rounded-sm">Filter Disaster Types</AccordionTitle>
                <AccordionContent className="hover:bg-black bg-black bg-opacity-70 p-4 py-3">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center">
                        <input
                        type="checkbox"
                        id={`option-${option.id}`}
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => handleCheckboxChange(option.id)}
                        className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={`option-${option.id}`}>{option.label}</label>
                    </div>

                    ))}
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
)
}

export default DisasterFilter;