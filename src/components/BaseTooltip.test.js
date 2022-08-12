import { render, screen, } from '@testing-library/vue';
import BaseTooltip from './BaseTooltip';

function renderTooltip(text, element = '') {
    const options = {
        props: {
            text,
        },
        slots: {
            default: element,
        }
    }
    return render(BaseTooltip, options);
}


it.only('renders hidden with specified text', () => {
    const text = 'Tooltip text';

    renderTooltip(text);

    expect(screen.getByText(text)).not.toBeVisible();
})

it.only('renders with target element', () => {
    const buttonLabel = 'Click me';
    const button = `<button>${buttonLabel}</button>`
    renderTooltip('', button);

    expect(screen.getByText(buttonLabel)).toBeVisible();
})