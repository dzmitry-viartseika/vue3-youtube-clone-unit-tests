import { render, screen } from '@testing-library/vue';
import BaseIcon from './BaseIcon';

const DEFAULT_ICON = 'menu'

function renderIcon(name = null, classes = null) {
    const options = {
        props: {
            name,
            class: classes,
        },
    }

    return render(BaseIcon, options);
}

test('renders base icon', () => {
    renderIcon(DEFAULT_ICON);
    const component = screen.getByTestId('base-icon');
    expect(component).not.toBeEmptyDOMElement();
});

test('renders base icon no-exist icon', () => {
    renderIcon();
    const component = screen.getByTestId('base-icon');
    expect(component).toBeEmptyDOMElement();
})


test('renders base icon with default classes', () => {
    const defaultClasses = 'w-6 h-6';

    renderIcon(DEFAULT_ICON, defaultClasses);

    const component = screen.getByTestId('base-icon');
    expect(component).toHaveClass(defaultClasses);
});

test('renders base icon with custom classes', () => {
    const expectedClasses = 'w-10 h-100';

    renderIcon(DEFAULT_ICON, expectedClasses);

    const component = screen.getByTestId('base-icon');
    expect(component).toHaveClass(expectedClasses);
});
