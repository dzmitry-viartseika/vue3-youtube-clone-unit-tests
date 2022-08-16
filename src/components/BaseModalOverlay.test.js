import { render } from '@testing-library/vue';
import BaseModalOverlay from './BaseModalOverlay';

it.only('renders with snapshot', () => {
    const { html } = render(BaseModalOverlay);
    expect(html()).toMatchSnapshot();
});