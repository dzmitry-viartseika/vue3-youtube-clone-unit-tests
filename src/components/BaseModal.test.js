import { screen, render } from '@testing-library/vue';
import BaseModal from './BaseModal.vue';
import icons from '../icons.js';

test('renders modal with footer and body', () => {
    const bodySlot = 'This is slot of body';
    const footerSlot = 'This is slot of footer';
    // given (arrange)
    const options = {
        slots: {
            default: bodySlot,
            footer: footerSlot,
        }
    }

    // when (act)
    render(BaseModal, options);

    // then (assets)
    screen.getByText(bodySlot);
    screen.getByText(footerSlot);
})

test.only('renders close button with conditional', () => {
    const options = {
        props: {
            withCloseButton: true,
        }
    }

    render(BaseModal, options);

    screen.debug();
    expect(screen.getByTestId('base-icon').innerHTML).toBe(icons['x']);
})

test.only('renders close button without conditional', () => {
    render(BaseModal);

    screen.debug();
    // get для получения
    // query если его нет
    expect(screen.queryByTestId('base-icon').innerHTML).toBeNull();
})
