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

function mouseEnterEvent() {
    return fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
}

function mouseLeaveEvent() {
    return fireEvent.mouseLeave(screen.getByText(buttonLabel).parentElement);
}

function mouseClickEvent() {
    return fireEvent.click(screen.getByText(buttonLabel).parentElement);
}

describe('when renders', () => {
    it('renders hidden with specified text', () => {
        const text = 'Tooltip text';

        renderTooltip(text);

        expect(screen.getByText(text)).not.toBeVisible();
    })

    it('renders with target element', () => {
        renderTooltip('', button);

        expect(screen.getByText(buttonLabel)).toBeVisible();
    })
})

describe('when shows', () => {
    it('shows after hovering over owning element', async () => {
        renderTooltip(text, button);

        // parentElement т.к. на обвертке висит событие
        await mouseEnterEvent()
        expect(screen.getByText(text)).toBeVisible();
    })
})

describe('when hides', () => {

    beforeEach(async () => {
        renderTooltip(text, button);

        await mouseEnterEvent();
    })

    it('hides after moving cursor away from owning element', async () => {

        expect(screen.getByText(text)).toBeVisible();

        await mouseLeaveEvent();

    })

    it('hides after clicking owning element', async () => {
        expect(screen.getByText(text)).toBeVisible();

        await mouseClickEvent();
        expect(screen.getByText(text)).not.toBeVisible();
    })
})