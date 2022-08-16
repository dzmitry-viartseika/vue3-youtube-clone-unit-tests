import {render, screen} from '@testing-library/vue';
import DropdownSettingsHeader from './DropdownSettingsHeader';

const title = 'Test title';

function renderDropdownSettingsHeader() {

    const options = {
        props: {
            title,
        }
    }

    return render(DropdownSettingsHeader, options);
}

it('renders with label' ,() => {
    renderDropdownSettingsHeader();

    screen.getByText(title);
});