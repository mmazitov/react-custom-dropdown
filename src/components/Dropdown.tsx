import { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownItems, DropdownProps } from '../types/types';

/**
 * Dropdown component that supports both single and multi-select functionality
 * with customizable rendering and styling options.
 *
 * @param options - Array of selectable options with label and value
 * @param value - Currently selected value(s)
 * @param onChange - Callback function triggered when selection changes
 * @param placeholder - Text displayed when no option is selected
 * @param multiSelect - When true, allows selecting multiple options
 * @param className - Additional CSS classes for the dropdown container
 * @param emptyValue - Text displayed when options array is empty
 * @param renderOption - Custom renderer for option items
 * @param renderValue - Custom renderer for selected value(s)
 * @param disabled - When true, disables the dropdown interaction
 * @param styles - Custom styling for dropdown elements
 */
const Dropdown = ({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	multiSelect = false,
	className = '',
	emptyValue = 'No options available',
	renderOption,
	renderValue,
	disabled = false,
	styles = {
		listClass: '',
		listItemClass: '',
		listSelectedClass: '',
		buttonClass: '',
	},
}: DropdownProps) => {
	// Controls visibility of dropdown options list
	const [isOpen, setIsOpen] = useState(false);
	// Reference to the dropdown DOM element for handling outside clicks
	const dropdownRef = useRef<HTMLDivElement>(null);

	/**
	 * Toggles the dropdown open/closed state.
	 * Only works when the dropdown is not disabled.
	 */
	const handleToggler = useCallback(() => {
		if (!disabled) {
			setIsOpen((prev) => !prev);
		}
	}, [disabled]);

	/**
	 * Closes the dropdown when user clicks outside the component.
	 *
	 * @param e - Mouse event from the document listener.
	 */
	const handleOutsideClick = useCallback((e: MouseEvent) => {
		if (!dropdownRef.current?.contains(e.target as Node)) {
			setIsOpen(false);
		}
	}, []);

	/**
	 * Sets up and cleans up document event listeners for outside clicks.
	 */
	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [handleOutsideClick]);

	/**
	 * Determines if a specific option is currently selected.
	 *
	 * @param option - Option to check.
	 * @returns True if selected, false otherwise.
	 */
	const isSelected = (option: DropdownItems) => {
		if (!value) return false;
		if (multiSelect) {
			// Multi-select: value is an array
			return (value as DropdownItems[]).some(
				(item) => item.value === option.value,
			);
		}
		// Single-select: value is a single object
		return (value as DropdownItems).value === option.value;
	};

	/**
	 * Handles selection/deselection of an option.
	 * Uses type assertions to ensure type safety with the discriminated union.
	 *
	 * @param option - Option being selected/deselected.
	 */
	const handleSelect = (option: DropdownItems) => {
		if (multiSelect) {
			const selectedItems = (value as DropdownItems[]) || [];
			const updateSelected = isSelected(option)
				? selectedItems.filter((item) => item.value !== option.value)
				: [...selectedItems, option];
			// Use type assertion for multiSelect onChange
			(onChange as (value: DropdownItems[] | null) => void)(
				updateSelected.length ? updateSelected : null,
			);
		} else {
			// Use type assertion for single-select onChange
			(onChange as (value: DropdownItems | null) => void)(
				isSelected(option) ? null : option,
			);
			setIsOpen(false);
		}
	};

	/**
	 * Renders the dropdown button/trigger.
	 * Displays custom rendered value, selected option label(s), or placeholder.
	 *
	 * @returns JSX for the dropdown button.
	 */
	const renderSelectButton = () => (
		<button
			type="button"
			onClick={handleToggler}
			className={`focus:right px-3 py-2 border rounded focus:outline-none w-full text-left ${styles.buttonClass}`}
			disabled={disabled}
		>
			{renderValue
				? value !== undefined && value !== null && renderValue(value)
				: value &&
					  (!multiSelect ||
							(multiSelect && (value as DropdownItems[]).length > 0))
					? multiSelect
						? (value as DropdownItems[]).map((item) => item.label).join(', ')
						: (value as DropdownItems).label
					: placeholder}
		</button>
	);

	/**
	 * Renders the dropdown options list.
	 * Shows either option list or empty state message.
	 *
	 * @returns JSX for the dropdown list.
	 */
	const renderSelectList = () => (
		<ul
			className={`absolute z-10 w-full mt-1 overflow-auto bg-white border rounded shadow-lg max-h-60 ${styles.listClass}`}
		>
			{options.length ? (
				options.map((option: DropdownItems) => (
					<li
						key={option.value}
						onClick={() => handleSelect(option)}
						className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
							isSelected(option)
								? styles.listSelectedClass
								: styles.listItemClass
						}`}
					>
						{renderOption
							? renderOption(option, isSelected(option))
							: option.label}
					</li>
				))
			) : (
				<li className={`px-3 py-2 ${styles.listItemClass}`}>{emptyValue}</li>
			)}
		</ul>
	);

	return (
		<div className={`relative w-full ${className}`} ref={dropdownRef}>
			{renderSelectButton()}
			{isOpen && renderSelectList()}
		</div>
	);
};

export default Dropdown;
