import { render, screen } from '@testing-library/vue';
import BaseCheckbox from './BaseCheckbox.vue';

test('check renders base checkbox with label', () => {
    const labelText = 'Test Label';
    const value = 1;
    // given (arrange)
    const options = {
        slots: {
            default: labelText,
        },
        props: {
            id: 'checkbox',
            modelValue: [value,2,3],
            value,
        },
    }

    //when (act)

    render(BaseCheckbox, options);

    // then (assets)
    // screen.debug();
    const checkbox = screen.getByLabelText(labelText);

    expect(checkbox.checked).toBe(true);
})

test('check renders base checkbox without label and default value', () => {
    render(BaseCheckbox);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
})
