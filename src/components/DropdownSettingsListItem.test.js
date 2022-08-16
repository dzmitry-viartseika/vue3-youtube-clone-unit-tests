import {render, screen} from '@testing-library/vue';
import DropdownSettingsListItem from './DropdownSettingsListItem';
import icons from '../icons';

const label = 'Test label';

function renderDropdownSettingsListItem(
    title = 'Test label',
    active = false,
    withSubMenu = false,
    icon = '',
) {

    const options = {
        props: {
            label,
            active,
            withSubMenu,
            icon,
        }
    }

    return render(DropdownSettingsListItem, options);
}

it('renders correctly with title', () => {
    renderDropdownSettingsListItem(label,true, false, 'check');

    screen.getByText(label);
});

it('renders with check', () => {
    renderDropdownSettingsListItem(label,true, false, 'check');

    const component = screen.getByTestId('base-icon');
    expect(component).toContainHTML(icons['check'])
});

it('renders with icon withSubMenu', () => {
    renderDropdownSettingsListItem(label,true, true, '');

    const component = screen.queryAllByTestId('base-icon')[1];
    expect(component).toContainHTML(icons['chevronRight'])
});

it('renders with BaseIcons conditions', () => {
    renderDropdownSettingsListItem(label,true, true, 'check');

    const components = screen.getAllByTestId('base-icon');
    expect(components).toHaveLength(2)
});