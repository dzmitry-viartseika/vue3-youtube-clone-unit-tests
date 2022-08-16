import { render, screen, within, fireEvent, waitForElementToBeRemoved } from '@testing-library/vue';
import TheModalSearchPredictions from './TheModalSearchPredictions';
import userEvent from "@testing-library/user-event";
const user = userEvent.setup()

// вынести определение данных в общую describe - можно сгруппировать схожие сценарии

const searchPredictions = [
    'Search Prediction 1',
    'Search Prediction 2',
    'Search Prediction 3',
];

const categories = [
    'Hateful',
    'Sexually Explicit',
    'Violent',
];

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


describe('when open', () => {
    it('shows search prediction list', () => {
        renderModal(searchPredictions);

        searchPredictions.forEach((prediction) => screen.getByText(prediction));

        // or

        // screen.getByText(searchPredictions[0])
        // screen.getByText(searchPredictions[1])
        // screen.getByText(searchPredictions[2])
    })

    it('shows search prediction category', () => {
        renderModal(categories);

        categories.forEach((category) => screen.getByText(category));
    });

    it('shows textarea', () => {
        renderModal(categories);

        const dialog = screen.getByRole('dialog');
        // within - органичивает выбор если много на странице textarea's
        within(dialog).getByRole('textbox');
    })
})



describe('when close' , () => {
    it('does not show search predictions if closed', () => {
        renderModal(searchPredictions);

        const button = screen.getByRole('button', {name: 'Cancel'});
        user.click(button);
        return waitForElementToBeRemoved(searchPredictions.map((prediction) => screen.queryByText(prediction)));
    })

    it('does not show search predictions categories if closed', () => {
        renderModal(categories);

        const button = screen.getByRole('button', {name: 'Cancel'});
        user.click(button);
        return waitForElementToBeRemoved(categories.map((category) => screen.queryByText(category)));
    })
})