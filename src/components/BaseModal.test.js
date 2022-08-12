import {screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/vue';
import BaseModal from './BaseModal.vue';
import icons from '../icons.js';

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

test('renders modal with footer and body', () => {
    const bodySlot = 'This is slot of body';
    const footerSlot = 'This is slot of footer';
    // given (arrange)
    renderModal(bodySlot, footerSlot);

    // then (assets)
    screen.getByText(bodySlot);
    screen.getByText(footerSlot);
})

test.only('renders close button with conditional', () => {
    renderModal('', '', true);

    // screen.debug();
    expect(screen.getByTestId('base-icon').innerHTML).toBe(icons['x']);
})

test('renders close button without conditional', () => {
    renderModal('', '');

    screen.debug();
    // get для получения
    // query если его нет
    expect(screen.queryByTestId('base-icon').innerHTML).toBeNull();
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

    await waitForElementToBeRemoved([
        screen.queryByText(bodySlot),
        screen.queryByTestId('base-modal-overlay'),
    ])
})


test('check closing after clicking on overlay', async () => {

    const bodySlot = 'This is slot of body';

    renderModal(bodySlot, '');

    const overlay = screen.getByTestId('base-modal-overlay');
    fireEvent.click(overlay);

    await waitForElementToBeRemoved([
        screen.queryByText(bodySlot),
        screen.queryByTestId('base-modal-overlay'),
    ])
})

test('check modal when clicking cancel button in the footer side', async () => {

    const bodySlot = 'This is slot of body';
    const footerSlot = `<template #footer="{ close }"> 
                    <button>Cancel</button>
                </template>`;

    renderModal(bodySlot, footerSlot);

    const options = {
        slots: {
            default: bodySlot,
            footer: footerSlot,

        }
    }

    render(BaseModal, options);

    const button = screen.getByRole('button', { name: 'Cancel' });
    await fireEvent.click(button);

    screen.queryByText(bodySlot);
    screen.queryByTestId('base-modal-overlay');
})

test.only('check modal when pressing the key of esc', async () => {

    const bodySlot = 'This is slot of body';

    const options = {
        slots: {
            default: bodySlot,
        }
    }

    render(BaseModal, options);

    const button = screen.getByRole('dialog', { key: 'Esc' });
    await fireEvent.keyDown(button);

    screen.queryByText(bodySlot);
    screen.queryByTestId('base-modal-overlay');
})
