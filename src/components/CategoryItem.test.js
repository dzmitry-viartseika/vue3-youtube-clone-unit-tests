import {render, screen} from '@testing-library/vue';
import CategoryItem from './CategoryItem';

const category = 'Category';

function renderCategoryItem(isActive = false) {
    const options = {
        props: {
            category,
            isActive,
        }
    }

    return render(CategoryItem, options);
}

it('renders with label', () => {
    renderCategoryItem();

    expect(screen.getByText(category)).not.toHaveClass('bg-gray-600 text-white');
})

it('renders active', () => {
    const isActive = true;
    renderCategoryItem(isActive);

    expect(screen.getByText(category)).toHaveClass('bg-gray-600 text-white');
})