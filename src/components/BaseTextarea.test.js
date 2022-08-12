import {render, screen, fireEvent, waitForElementToBeRemoved, getByAltText} from '@testing-library/vue';
import BaseTextarea from './BaseTextarea';

const text = 'text';

function RenderBaseTextArea(limit = 0) {
    const options = {
        props: {
            modelValue: text,
            limit,
        }
    }

    return render(BaseTextarea, options);
}

it('renders prefilled', () => {
    RenderBaseTextArea(200);
    expect(screen.getByDisplayValue(text));
});

it('shows counters', () => {
    const limit = 200;
    RenderBaseTextArea(limit);
    expect(screen.getByText(`${text.length} / ${limit}`));
});