import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitBtn = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={clsx(css.formWrapper)} onSubmit={this.handleSubmitBtn}>
        <label className={clsx(css.nameThumb)}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={clsx(css.numberThumb)}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleNameChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={clsx(css.submitButton)} type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};