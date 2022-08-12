import {render, screen, fireEvent, waitForElementToBeRemoved} from '@testing-library/vue';
import TheModalSearchPredictions from './TheModalSearchPredictions';


it('shows search prediction list', () => {
    // arrange
    const searchPredictions = [
        'Search Prediction 1',
        'Search Prediction 2',
        'Search Prediction 3',
    ];

    const options = {
        props: {
            searchPredictions,
        }
    }

    // given (act)
    render(TheModalSearchPredictions, options);

    // assets
    screen.getByText(searchPredictions[0])
    screen.getByText(searchPredictions[1])
    screen.getByText(searchPredictions[2])
})

it('shows search prediction category', () => {
    const categories = [
        'Hateful',
        'Sexually Explicit',
        'Violent',
    ];

    const options = {
        data: () => ({
            categories,
        })
    };

    render(TheModalSearchPredictions, options);

    screen.getByText(categories[0]);
    screen.getByText(categories[1]);
    screen.getByText(categories[2]);
});

it('does not show search predictions if closed', () => {
    const searchPredictions = [
        'Search Prediction 1',
        'Search Prediction 2',
        'Search Prediction 3',
    ];

    const options = {
        props: {
            searchPredictions,
        }
    }

    // given (act)
    render(TheModalSearchPredictions, options);

    const button = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(button);
    return waitForElementToBeRemoved([
        screen.queryByText(searchPredictions[0]),
        screen.queryByText(searchPredictions[1]),
        screen.queryByText(searchPredictions[2]),
    ])
})

it('does not show search predictions categories if closed', () => {
    const categories = [
        'Hateful',
        'Sexually Explicit',
        'Violent',
    ];

    const options = {
        data: () => ({
            categories,
        })
    };

    render(TheModalSearchPredictions, options);
    const button = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(button);
    return waitForElementToBeRemoved([
        screen.queryByText(categories[0]),
        screen.queryByText(categories[1]),
        screen.queryByText(categories[2]),
    ])
})