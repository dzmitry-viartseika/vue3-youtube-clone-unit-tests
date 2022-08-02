import {screen, render} from '@testing-library/vue';
import BaseButton from './BaseButton.vue';

test('renders base button', () => {
    // given(arrange) подготовка
    const options = {
        slots: {
            default: 'Test Button',
        }
    }
    // when (act) действия
    render(BaseButton, options);

    // then (assets) проверяем действительное с ожидаемым
    screen.getByText('Test');
})
