import { render, screen, fireEvent } from '@testing-library/vue';
import BaseModalOverlay from './BaseModalOverlay';

it.only('renders with snapshot', () => {
    const { html } = render(BaseModalOverlay);

    console.log('container', html());
    // первый раз создаст снимок
    expect(html()).toMatchSnapshot();
});