import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setDisasterFilters } from "@/actions";

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
        <div className="absolute top-16 left-16 w-64 min-h-48 p-5 mt-12 bg-black bg-opacity-70 rounded-lg text-lg text-white border-2 border-white">
            <h2 className="text-xl">Select Disaster Type:</h2>
            {options.map((option) => (
            <div key={option.id} className="flex items-center">
                <input
                type="checkbox"
                id={`option-${option.id}`}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="mr-2"
                />
                <label htmlFor={`option-${option.id}`}>{option.label}</label>
            </div>

            ))}
      </div>
    )
}

export default DisasterFilter;