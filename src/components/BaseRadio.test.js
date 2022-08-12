import { render, screen, } from '@testing-library/vue';
import BaseRadio from './BaseRadio';

const label = 'Label';
const isChecked = true;
const value = 'value';
const id = 'id';

function renderRadio(isChecked = false) {

    const options = {
        props: {
            id,
            modelValue: isChecked ? value : null,
            value,
        },
        slots: {
            default: 'Label',
        },
    }

    return render(BaseRadio, options);
};

// it.only('consists id radio button', () => {
//     renderRadio();
//     screen.debug();
//     screen.getByAltText('test-id-1')
// })

it('renders checked with label', () => {
    const isChecked = true;
    renderRadio(isChecked);
    expect(screen.getByLabelText(label)).toBeChecked();
})

it('renders unchecked with label', () => {
    const isChecked = false;
    renderRadio(isChecked);
    expect(screen.getByLabelText(label)).not.toBeChecked();
})

it('renders with value', () => {
    renderRadio();
    expect(screen.getByLabelText(label).value).toBe(value);
})