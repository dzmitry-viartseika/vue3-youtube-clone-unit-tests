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
    expect(component.innerHTML).toBeFalsy();
});

test('renders base icon no-exist icon', () => {
    const icon = render(BaseIcon);
    const component = screen.getByTestId('base-icon');
    expect(component.innerHTML).toBeFalsy();
})
