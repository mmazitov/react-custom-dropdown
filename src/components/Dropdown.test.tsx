import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Dropdown from '../components/Dropdown';
import { DropdownItems } from '../types/types';

const options: DropdownItems[] = [
	{ label: 'Option 1', value: 1 },
	{ label: 'Option 2', value: 2 },
];

describe('Dropdown Component', () => {
	it('should display placeholder when no value is selected', () => {
		render(
			<Dropdown
				options={options}
				value={null}
				onChange={() => {}}
				placeholder="Select an option"
			/>,
		);
		// Проверяем, что кнопка (триггер) отображает текст плейсхолдера
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Select an option');
	});

	it('should call onChange with selected option on click (single select)', async () => {
		const handleChange = vi.fn();
		render(
			<Dropdown
				options={options}
				value={null}
				onChange={handleChange}
				placeholder="Select an option"
			/>,
		);

		// Находим кнопку-триггер и кликаем по ней, чтобы открыть меню
		const button = screen.getByRole('button');
		fireEvent.click(button);

		// Ожидаем, что меню с опциями откроется
		await waitFor(() => screen.getByText('Option 1'));

		// Предполагаем, что при клике по кнопке меню с опциями отображается.
		// На основании логики компонента выбираем первую опцию.
		const optionToSelect = screen.getByText('Option 1');
		fireEvent.click(optionToSelect);

		// Проверяем, что обработчик onChange вызвался с выбранной опцией.
		expect(handleChange).toHaveBeenCalledWith(options[0]);
	});
});
