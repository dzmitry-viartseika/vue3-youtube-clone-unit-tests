import { render, screen } from '@testing-library/vue';
import BaseIcon from './BaseIcon';

test('renders base icon', () => {
    // given (arrange)
    const options = {
        props: {
            name: 'menu',
        },
    }
    // when (act)
    const icon = render(BaseIcon, options);
    // then (assets)
    screen.debug();
    const component = screen.getByTestId('base-icon');
    expect(component.innerHTML).toBeTruthy();
});

test('renders base icon no-exist icon', () => {
    const icon = render(BaseIcon);
    const component = screen.getByTestId('base-icon');
    expect(component.innerHTML).toBeFalsy();
})


test('rendes base icon with default classes', () => {
    const defaultClasses = 'w-6 h-6';

    const options = {
        props: {
            name: 'menu',
        },
    };

    render(BaseIcon, options);
    const component = screen.getByTestId('base-icon');
    expect(component.getAttribute('class')).toBe(defaultClasses);
});

test('rendes base icon with custom classes', () => {
    const classes = 'w-10 h-100';

    const options = {
        props: {
            name: 'menu',
            class: classes,
        },
    };

    render(BaseIcon, options);
    const component = screen.getByTestId('base-icon');
    expect(component.getAttribute('class')).toBe(classes);
});
