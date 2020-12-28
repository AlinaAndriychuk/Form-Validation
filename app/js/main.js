'use strict';

class FormValidation {
  constructor(config) {
    this.form = config.form;
    this.minPassword = config.password;
    this.password = this.form.querySelector('#passwordToValidate');
    this.email = this.form.querySelector('#emailToValidate');
    
    this.addSubmitListener(this.form);
  }

  removeClass(elements, className) {
    elements.forEach( elem => {
      elem.classList.remove(className)
    });
  }

  removeElements(nodes) {
    nodes.forEach( node => {
      node.parentNode.removeChild(node);
    });
  }

  findEmptyClassElements(form) {
    const labels = form.querySelectorAll('.is-emptyLabel');
    const inputs = form.querySelectorAll('.is-empty');
    const titles = form.querySelectorAll('.is-emptyTitle');
    
    this.removeClass(labels, 'is-emptyLabel');
    this.removeClass(inputs, 'is-empty');
    this.removeElements(titles);
  }

  addEmptyClass(field, content) {
    const label = field.closest('.form__label');
    if (label) {
      let title = document.createElement('p');
      title.classList.add('is-emptyTitle');
      title.innerHTML = content;
      label.append(title);

      label.classList.add('is-emptyLabel');
    }

    field.classList.add('is-empty');
  }

  checkEmptyFields(fields) {
    fields.forEach( field => {
      if (field.value === '') {
        this.addEmptyClass(field, 'Fill this form');
      };
    });
  }

  validateEmail(email) {
    const emailValue = email.value;
    if (emailValue === '') {
      this.addEmptyClass(email, 'Fill this form');
    } else if (!emailValue.includes('@')) {
      this.addEmptyClass(email, 'Email must contain the "@" symbol. The "@" symbol is missing in the address "' + emailValue + '".');
    } else if (emailValue.startsWith('@')) {
      this.addEmptyClass(email, 'Enter part of the address before the "@" symbol. The Address "' + emailValue + '" is not complete.');
    } else if (emailValue.endsWith('@')) {
      this.addEmptyClass(email, 'Enter part of the address after the "@" symbol. The Address "' + emailValue + '" is not complete.');
    } else if (emailValue.endsWith('.')) {
      this.addEmptyClass(email, 'The invalid symbol position "." in the address "' + emailValue + '".');
    };
  }

  validatePassword(password, num) {
    const passwordValue = password.value;
    if (passwordValue === '') {
      this.addEmptyClass(password, 'Fill this form');
    } else if (passwordValue.split('').length < num) {
      this.addEmptyClass(password, 'Password must have minimum ' + num + ' simbols.');
    }
  }

  addSubmitListener(form) {
    form.addEventListener('submit', e => {
      const fields = form.querySelectorAll('input');
      e.preventDefault();
      this.findEmptyClassElements(form);

      this.checkEmptyFields(fields);
      this.validateEmail(this.email);
      this.validatePassword(this.password, this.minPassword);
    });
  }
}

let form = document.querySelector('#formToValidate');
let myFormValidetion = new FormValidation({form: form, password: 4})