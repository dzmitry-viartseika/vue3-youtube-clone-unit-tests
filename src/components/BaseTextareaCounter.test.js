import { render } from '@testing-library/vue';
import BaseTextareaCounter from './BaseTextareaCounter.vue';

it('renders', () => {
    const options = {
        slots: {
            default: '0 / 100',
        }
    }
    const { html } = render(BaseTextareaCounter, options);
    expect(html()).toMatchSnapshot();
})