import { screen, render, fireEvent } from '@testing-library/vue';
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

test('renders close button without conditional', () => {
    render(BaseModal);

    screen.debug();
    // get для получения
    // query если его нет
    expect(screen.queryByTestId('base-icon').innerHTML).toBeNull();
})

test.only('modal form should close after click close icon', async () => {
    const bodySlot = 'This is slot of body';

    const options = {
        props: {
            withCloseButton: true,
        },
        slots: {
            default: bodySlot,
        }
    }

    render(BaseModal, options);

    const button = screen.getByTestId('base-modal-button-close');
    await fireEvent.click(button);
    expect(screen.queryByText(bodySlot)).toBeNull();
    expect(screen.queryByTestId('base-modal-overlay')).toBeNull();
})
