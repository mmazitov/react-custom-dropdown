import './App.css';

import { DropdownItems, DropdownItemsStyle } from './types/types';
import React, { useState } from 'react';

import Dropdown from './components/Dropdown';

// List of options available for selection in the dropdown
const options: DropdownItems[] = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
];

// Custom styles for the dropdown component
const dropdownStyles: DropdownItemsStyle = {
	listClass: 'custom-list-class',
	listItemClass: 'custom-list-item-class',
	listSelectedClass: 'bg-gray-100',
	buttonClass: 'custom-button-class',
};

const App: React.FC = () => {
	// State for single select dropdown
	const [selected, setSelected] = useState<DropdownItems | null>(null);
	// State for multi-select dropdown
	const [multiSelected, setMultiSelected] = useState<DropdownItems[] | null>(
		[],
	);

	return (
		<div className="space-y-6 mx-auto mt-10 max-w-md">
			<h2 className="font-semibold text-xl">Single Select</h2>
			{/* Single select dropdown */}
			<Dropdown
				options={options}
				value={selected}
				onChange={setSelected}
				placeholder="Pick a fruit..."
				emptyValue="Empty"
				styles={dropdownStyles}
			/>

			<h2 className="font-semibold text-xl">Multi Select</h2>
			{/* Multi select dropdown */}
			<Dropdown
				options={options}
				value={multiSelected}
				onChange={setMultiSelected}
				multiSelect
				placeholder="Select multiple fruits..."
				emptyValue="Empty"
				styles={dropdownStyles}
			/>
		</div>
	);
};

export default App;
