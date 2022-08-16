import {render, screen} from '@testing-library/vue';
import DropdownAppsListItem from './DropdownAppsListItem.vue';

const label = 'Test Label';

function renderCategoryItem() {
    const options = {
        props: {
            label,
        }
    }

    return render(DropdownAppsListItem, options);
}

it('renders with label', () => {
    renderCategoryItem();

    screen.getByText(label)
});

it('renders correctly', () => {
    const { html } = render(DropdownAppsListItem);
    expect(html()).toMatchInlineSnapshot(`
"<li><a href=\\"#\\" class=\\"flex items-center px-3 py-2 text-sm hover:bg-gray-100\\"><svg class=\\"w-6 h-6 mr-3 text-red-500\\" fill=\\"currentColor\\" viewBox=\\"0 0 20 20\\" xmlns=\\"http://www.w3.org/2000/svg\\" data-testid=\\"base-icon\\">
      <path fill-rule=\\"evenodd\\" d=\\"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z\\" clip-rule=\\"evenodd\\"></path>
    </svg><span></span></a></li>"
`);
});