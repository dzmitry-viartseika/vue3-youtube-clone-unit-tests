import { render, screen } from '@testing-library/vue';
import BaseCheckbox from './BaseCheckbox.vue';

test('check renders base checkbox with label', () => {
    const labelText = 'Test Label'
    // given (arrange)
    const options = {
        slots: {
            default: labelText,
        },
        props: {
            id: 'checkbox',
            modelValue: [1,2,3],
            value: 1,
        },
    }

    //when (act)

    render(BaseCheckbox, options);

    // then (assets)
    screen.debug();
    const checkbox = screen.getByLabelText(labelText);

    expect(checkbox.checked).toBe(true);
})
