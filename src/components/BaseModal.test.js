import {screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/vue';
// для использования разных событий
import userEvent from '@testing-library/user-event';
import BaseModal from './BaseModal.vue';
import icons from '../icons.js';

// Модификаторы
// test.only - только один тест
// test.skip - все кроме этих
// test or it неважно it.skip
// test.todo - выполнять не будет но покажет чтобы мы егшо написали. Определяем все тестовые сценарии

const user = userEvent.setup()

function renderModal(body = '', footer = '', withCloseButton = false) {
    const options = {
        slots: {
            default: body,
            footer: footer,
        },
        props: {
            withCloseButton,
        }
    }

    return render(BaseModal, options);
}
 function assertModalClose(body = '') {
    return waitForElementToBeRemoved([
        screen.queryByText(body),
        screen.queryByTestId('base-modal-overlay'),
    ])
}

it('renders modal with footer and body', () => {
    const bodySlot = 'This is slot of body';
    const footerSlot = 'This is slot of footer';
    // given (arrange)
    renderModal(bodySlot, footerSlot);

    // then (assets)
    screen.getByText(bodySlot);
    screen.getByText(footerSlot);
})

test('renders close button with conditional', () => {
    renderModal('', '', true);

    // screen.debug();
    expect(screen.getByTestId('base-icon')).toContainHTML(icons['x'])
})

test('renders close button without conditional', () => {
    renderModal('', '', false);

    // screen.debug();
    // get для получения
    // query если его нет
    expect(screen.queryByTestId('base-icon')).not.toBeInTheDocument();
})

test('modal form should close after click close icon', async () => {
    const bodySlot = 'This is slot of body';

    renderModal(bodySlot, '', true);

    const button = screen.getByTestId('base-modal-button-close');
    // await fireEvent.click(button);

    // or

    // fireEvent.click(button);
    //
    // await waitFor(() => {
    //     expect(screen.queryByText(bodySlot)).toBeNull();
    //     expect(screen.queryByTestId('base-modal-overlay')).toBeNull();
    // })

    // or

    fireEvent.click(button);

    return assertModalClose(bodySlot)
})


test('check closing after clicking on overlay', async () => {

    const bodySlot = 'This is slot of body';

    renderModal(bodySlot, '');

    const overlay = screen.getByTestId('base-modal-overlay');
    fireEvent.click(overlay);

    return assertModalClose(bodySlot);
})

test('check modal when clicking cancel button in the footer side', async () => {

    const bodySlot = 'This is slot of body';
    const footerSlot = `<template #footer="{ close }"> 
                    <button @click="close" name="Cancel">Cancel</button>
                </template>`;

    renderModal(bodySlot, footerSlot);

    user.click(screen.getByRole('button', { name: 'Cancel' }))

    return assertModalClose(bodySlot);
})

test('check modal when pressing the key of esc', async () => {

    const bodySlot = 'This is slot of body';

    const options = {
        slots: {
            default: bodySlot,
        }
    }

    render(BaseModal, options);

    // const button = screen.getByRole('dialog', { key: 'Esc' });
    screen.getByRole('dialog').focus();
    user.keyboard('{Escape}');

    screen.queryByText(bodySlot);
    screen.queryByTestId('base-modal-overlay');
})
