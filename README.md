<h1>Dropdown Component</h1>

<h2>Introduction</h2>

<code>Dropdown</code> is a highly customizable and accessible React dropdown component. It supports both single and multi-select modes, custom rendering, and easy styling. This package is ideal for developers looking to integrate a flexible dropdown menu into their React applications.

<h2>Installation</h2>

<code>npm install @your-scope/dropdown</code> <br />
or using Yarn: <br />
<code>yarn add @your-scope/dropdown</code>

<h2>Usage</h2>
<h3>Basic Example</h3>

```
import React, { useState } from 'react';
import Dropdown, { DropdownItems } from '@your-scope/dropdown';

const options: DropdownItems[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const App = () => {
  const [selected, setSelected] = useState<DropdownItems | null>(null);

  return (
    <Dropdown
			options={options}
			value={selected}
			onChange={setSelected}
			placeholder="Pick a fruit..."
			emptyValue="Empty"
			styles={dropdownStyles}
			clearable
		/>
  );
};

export default App;

```

<h3>Multi-Select Example</h3>

```
const [multiSelected, setMultiSelected] = useState<DropdownItems[]>([]);

<Dropdown
  options={options}
  value={multiSelected}
  onChange={setMultiSelected}
  multiSelect
  placeholder="Select multiple fruits..."
/>;

```

<h2>Props</h2>
<table>
	<tbody>
		<tr>
			<th><span>Prop Name</span></th>
			<th><span>Type</span></th>
			<th><span>Default</span></th>
			<th><span>Description</span></th>
		</tr>
		<tr>
			<td>
				<code><span>options</span></code>
			</td>
			<td>
				<code><span>DropdownItems[]</span></code>
			</td>
			<td>
				<code><span>[]</span></code>
			</td>
			<td><span>Array of dropdown options.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>value</span></code>
			</td>
			<td>
				<code><span>DropdownItems | DropdownItems[] | null</span></code>
			</td>
			<td>
				<code><span>null</span></code>
			</td>
			<td><span>The currently selected value(s).</span></td>
		</tr>
		<tr>
			<td>
				<code><span>onChange</span></code>
			</td>
			<td>
				<code
					><span
						>(value: DropdownItems | DropdownItems[] | null) =&gt; void</span
					></code
				>
			</td>
			<td>
				<code><span>undefined</span></code>
			</td>
			<td><span>Callback fired when the selection changes.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>placeholder</span></code>
			</td>
			<td>
				<code><span>string</span></code>
			</td>
			<td>
				<code><span>'Select an option'</span></code>
			</td>
			<td><span>Placeholder text when no value is selected.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>multiSelect</span></code>
			</td>
			<td>
				<code><span>boolean</span></code>
			</td>
			<td>
				<code><span>false</span></code>
			</td>
			<td><span>Enables multi-select mode.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>className</span></code>
			</td>
			<td>
				<code><span>string</span></code>
			</td>
			<td>
				<code><span>''</span></code>
			</td>
			<td><span>Custom class name for the dropdown wrapper.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>emptyValue</span></code>
			</td>
			<td>
				<code><span>string</span></code>
			</td>
			<td>
				<code><span>'No options available'</span></code>
			</td>
			<td><span>Message when options list is empty.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>disabled</span></code>
			</td>
			<td>
				<code><span>boolean</span></code>
			</td>
			<td>
				<code><span>false</span></code>
			</td>
			<td><span>Disables the dropdown.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>renderOption</span></code>
			</td>
			<td>
				<code
					><span
						>(option: DropdownItems, isSelected: boolean) =&gt;
						React.ReactNode</span
					></code
				>
			</td>
			<td>
				<code><span>undefined</span></code>
			</td>
			<td><span>Custom render function for options.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>renderValue</span></code>
			</td>
			<td>
				<code
					><span
						>(selected: DropdownItems | DropdownItems[] | null) =&gt;
						React.ReactNode</span
					></code
				>
			</td>
			<td>
				<code><span>undefined</span></code>
			</td>
			<td><span>Custom render function for the selected value.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>styles</span></code>
			</td>
			<td>
				<code><span>DropdownItemsStyle</span></code>
			</td>
			<td>
				<code><span>{}</span></code>
			</td>
			<td><span>Object for custom styles.</span></td>
		</tr>
		<tr>
			<td>
				<code><span>clearable</span></code>
			</td>
			<td>
				<code><span>boolean</span></code>
			</td>
			<td>
				<code><span>false</span></code>
			</td>
			<td><span>Enables clear button..</span></td>
		</tr>
	</tbody>
</table>

<h2>Styling</h2>

You can pass a <code>styles</code> prop to customize the dropdown appearance:

```
const dropdownStyles = {
  listClass: 'custom-list-class',
  listItemClass: 'custom-list-item-class',
  listSelectedClass: 'bg-gray-100',
  buttonClass: 'custom-button-class',
};

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  styles={dropdownStyles}
/>;
```

<h2>Contributing</h2>

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
