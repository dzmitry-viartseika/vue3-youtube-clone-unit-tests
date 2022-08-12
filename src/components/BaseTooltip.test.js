import { render, screen, fireEvent } from '@testing-library/vue';
import BaseTooltip from './BaseTooltip';

const text = 'Tooltip text';
const buttonLabel = 'Click me';
const button = `<button>${buttonLabel}</button>`

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
    renderTooltip('', button);

    expect(screen.getByText(buttonLabel)).toBeVisible();
})

it('shows after hovering over owning element', async () => {
    renderTooltip(text, button);

    // parentElement т.к. на обвертке висит событие
    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();
})

it('hides after moving cursor away from owning element', async () => {
    renderTooltip(text, button);

    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();

    await fireEvent.mouseLeave(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).not.toBeVisible();
})

it('hides after clicking owning element', async () => {
    renderTooltip(text, button);

    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();

    await fireEvent.click(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).not.toBeVisible();
})