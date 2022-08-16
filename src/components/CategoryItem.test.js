import {render, screen} from '@testing-library/vue';
import CategoryItem from './CategoryItem.vue';

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

it.only('renders with label', () => {
    renderCategoryItem();

    expect(screen.getByText(category)).not.toHaveClass('bg-gray-600 text-white');
})

it.only('renders active', () => {
    const isActive = true;
    renderCategoryItem(isActive);

    expect(screen.getByText(category)).toHaveClass('bg-gray-600 text-white');
})