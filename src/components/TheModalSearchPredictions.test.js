import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/vue';
import TheModalSearchPredictions from './TheModalSearchPredictions';

function renderModal(searchPredictions = [], searchPredictionCategories = []) {
    const options = {
        props: {
            searchPredictions,
        },
        data: () => ({
            searchPredictionCategories,
        })
    }

    return render(TheModalSearchPredictions, options);
}

it('shows search prediction list', () => {
    // arrange
    const searchPredictions = [
        'Search Prediction 1',
        'Search Prediction 2',
        'Search Prediction 3',
    ];

    renderModal(searchPredictions);

    searchPredictions.forEach((prediction) => screen.getByText(prediction));

    // or

    // screen.getByText(searchPredictions[0])
    // screen.getByText(searchPredictions[1])
    // screen.getByText(searchPredictions[2])
})

it('shows search prediction category', () => {
    const categories = [
        'Hateful',
        'Sexually Explicit',
        'Violent',
    ];

    renderModal(categories);

    categories.forEach((category) => screen.getByText(category));
});

it('does not show search predictions if closed', () => {
    const searchPredictions = [
        'Search Prediction 1',
        'Search Prediction 2',
        'Search Prediction 3',
    ];

    renderModal(searchPredictions);

    const button = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(button);
    return waitForElementToBeRemoved(searchPredictions.map((prediction) => screen.queryByText(prediction)));
})

it('does not show search predictions categories if closed', () => {
    const categories = [
        'Hateful',
        'Sexually Explicit',
        'Violent',
    ];

    renderModal(categories);

    const button = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(button);
    return waitForElementToBeRemoved(categories.map((category) => screen.queryByText(category)));
})