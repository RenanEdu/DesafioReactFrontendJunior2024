import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
    it('renders without crashing', () => {
        render(<TodoApp />);
    });

    it('adds a new todo when the add button is clicked', () => {
        const { getByLabelText, getByText } = render(<TodoApp />);
        const input = getByLabelText('Todo');
        const addButton = getByText('Add');

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        expect(getByText('New Todo')).toBeInTheDocument();
    });

    it('marks a todo as completed when the checkbox is clicked', () => {
        const { getByLabelText } = render(<TodoApp />);
        const checkbox = getByLabelText('Complete');

        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    it('deletes a todo when the delete button is clicked', () => {
        const { getByText, queryByText } = render(<TodoApp />);
        const deleteButton = getByText('Delete');

        fireEvent.click(deleteButton);

        expect(queryByText('New Todo')).not.toBeInTheDocument();
    });
});
