import { render, screen, fireEvent } from '@testing-library/vue';
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


it('renders hidden with specified text', () => {
    const text = 'Tooltip text';

    renderTooltip(text);

    expect(screen.getByText(text)).not.toBeVisible();
})

it('renders with target element', () => {
    const buttonLabel = 'Click me';
    const button = `<button>${buttonLabel}</button>`
    renderTooltip('', button);

    expect(screen.getByText(buttonLabel)).toBeVisible();
})

it.only('shows after hovering over owning element', async () => {
    const text = 'Tooltip text';
    const buttonLabel = 'Click me';
    const button = `<button>${buttonLabel}</button>`
    renderTooltip(text, button);

    // parentElement т.к. на обвертке висит событие
    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();

})