import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';


export class App extends Component {
  state = {
    contacts: [ ],
    filter: '',
  };

  componentDidMount(prevProps, prevState) {
    const storage  = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(storage);
   
    if (parcedContacts) {
       this.setState({ contacts: parcedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  };

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    let newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.find(contact => contact.name === name)) {
      return window.alert(`${name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLocaleLowerCase();

    const filterContacts = contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(normalizeFilter);
    });

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filterContacts}
          onClick={this.handleDeleteContact}
        />
      </>
    );
  }
}