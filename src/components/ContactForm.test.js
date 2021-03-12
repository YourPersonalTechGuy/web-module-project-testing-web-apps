import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.queryByText("Contact Form", {exact: true});

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'The')
    userEvent.click(submit);

    const mei = screen.queryByTestId('fnError');
    expect(mei).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submit = screen.queryByTestId("submit");
    userEvent.click(submit);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const eni = screen.getByPlaceholderText("bluebill1049@hotmail.com");

    expect(fni).toBeInTheDocument();
    expect(lni).toBeInTheDocument();
    expect(eni).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'TheTester');
    userEvent.type(lni, 'TestingTheTest');
    userEvent.click(submit);

    const mei = screen.queryByTestId('eError'); 
    expect(mei).toBeInTheDocument();   
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const eni = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'TheTester');
    userEvent.type(lni, 'TestingTheTest');
    userEvent.type(eni, 'TheFailure')
    userEvent.click(submit);

    const mei = screen.queryByTestId('eError'); 
    expect(mei).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const eni = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'TheTester');
    userEvent.type(lni, '');
    userEvent.type(eni, 'TheFailure@gmail.com')
    userEvent.click(submit);
    
    const lnei = screen.queryByTestId('lnError');
    expect(lnei).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const eni = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'TheTester');
    userEvent.type(lni, 'TestingTheTest');
    userEvent.type(eni, 'TheFailure@gmail.com')
    userEvent.click(submit);

    const fn = screen.queryByTestId('firstnameDisplay');
    const ln = screen.queryByTestId('lastnameDisplay');
    const e = screen.queryByTestId('emailDisplay');

    expect(fn).toBeInTheDocument();
    expect(ln).toBeInTheDocument();
    expect(e).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const fni = screen.getByPlaceholderText("Edd");
    const lni = screen.getByPlaceholderText("Burke");
    const eni = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const mi = screen.getByLabelText("Message");
    const submit = screen.getByTestId("submit");

    userEvent.type(fni, 'TheTester');
    userEvent.type(lni, 'TestingTheTest');
    userEvent.type(eni, 'TheFailure@gmail.com')
    userEvent.type(mi, 'test')
    userEvent.click(submit);

    const fn = screen.queryByTestId('firstnameDisplay');
    const ln = screen.queryByTestId('lastnameDisplay');
    const e = screen.queryByTestId('emailDisplay');
    const m = screen.queryByTestId('messageDisplay');

    expect(fn).toBeInTheDocument();
    expect(ln).toBeInTheDocument();
    expect(e).toBeInTheDocument();
    expect(m).toBeInTheDocument();
});