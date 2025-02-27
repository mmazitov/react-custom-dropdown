/**
 * Defines the structure of an individual dropdown option.
 *
 * @property label - The text displayed to the user in the dropdown.
 * @property value - The underlying value used for selection logic (can be string or number).
 */
export interface DropdownItems {
	label: string;
	value: string | number;
}

/**
 * Interface for customizing dropdown component styling.
 *
 * @property listClass - CSS class for the dropdown options container.
 * @property listItemClass - CSS class for individual option items.
 * @property listSelectedClass - CSS class applied to selected option items.
 * @property buttonClass - CSS class for the dropdown trigger button.
 */
export interface DropdownItemsStyle {
	listClass: string;
	listItemClass: string;
	listSelectedClass: string;
	buttonClass: string;
}

/**
 * Base props common for both single-select and multi-select scenarios.
 * This defines properties shared between both dropdown variants.
 */
export interface BaseDropdownProps {
	options: DropdownItems[];
	placeholder?: string;
	className?: string;
	emptyValue?: string;
	disabled?: boolean;
	renderOption?: (
		option: DropdownItems,
		isSelected: boolean,
	) => React.ReactNode;
	/* Note: for renderValue, we use a union type since it will be used in either case */
	renderValue?: (
		selected: DropdownItems | DropdownItems[] | null,
	) => React.ReactNode;
	styles?: DropdownItemsStyle;
	clearable?: boolean; // Optional clear selection button
}

/**
 * Props for single-select dropdown.
 * Extends BaseDropdownProps with single-select specific properties.
 * The multiSelect flag is explicitly set to false to create a discriminated union.
 */
export interface SingleSelectProps extends BaseDropdownProps {
	multiSelect?: false;
	value?: DropdownItems | null;
	onChange: (value: DropdownItems | null) => void;
}

/**
 * Props for multi-select dropdown.
 * Extends BaseDropdownProps with multi-select specific properties.
 * The multiSelect flag is explicitly set to true to create a discriminated union.
 */
export interface MultiSelectProps extends BaseDropdownProps {
	multiSelect: true;
	value?: DropdownItems[] | null;
	onChange: (value: DropdownItems[] | null) => void;
}

/**
 * Discriminated union type for DropdownProps.
 * This allows TypeScript to properly type-check based on the multiSelect flag.
 * When multiSelect is true, the MultiSelectProps interface is used.
 * When multiSelect is false or undefined, the SingleSelectProps interface is used.
 */
export type DropdownProps = SingleSelectProps | MultiSelectProps;
