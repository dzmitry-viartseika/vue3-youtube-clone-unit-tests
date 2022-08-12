import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/vue';
import TheSearchPredictionsList from './TheSearchPredictionsList';

const predictions = ['prediction 1', 'prediction 2', 'prediction 3'];
const checkedPredictions = ['prediction 2', 'prediction 3'];

function renderPredictions(checkedPredictions = []) {
    const options = {
        props: {
            searchPredictions: predictions,
            modelValue: checkedPredictions,
        }
    }
    return render(TheSearchPredictionsList, options)
}

it('shows search predictions unchecked', () => {
    renderPredictions();

    predictions.forEach((prediction) => expect(screen.getByLabelText(prediction).checked).toBe(false));
});

it('shows specified search predictions checked', () => {
    renderPredictions(checkedPredictions);

    expect(screen.getByLabelText(predictions[0]).checked).toBe(false);
    expect(screen.getByLabelText(checkedPredictions[0]).checked).toBe(true);
    expect(screen.getByLabelText(checkedPredictions[1]).checked).toBe(true);
})