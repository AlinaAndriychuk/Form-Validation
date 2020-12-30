'use strict';

class FormValidation {
  constructor(config) {
    this.form = config.form;
    this.minPassword = config.password;
    this.password = this.form.querySelector('#passwordToValidate');
    this.email = this.form.querySelector('#emailToValidate');
    this.phone = this.form.querySelector('#phoneToValidate');
    
    this.addListener(this.form);
  }

  removeClass(element, className) {
    element.classList.remove(className)
  }

  removeElement(element) {
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  findEmptyClassElement(field) {
    this.removeClass(field.closest('label'), 'is-emptyLabel');
    this.removeClass(field, 'is-empty');
    this.removeElement(field.nextElementSibling);
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

  checkEmptyField(field, context) {
    if (field.value === '') {
      context.addEmptyClass(field, 'Fill this form');
    };
  }

  validateEmail(email, context) {
    const emailValue = email.value;
    const emailRegExp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    
    if (emailValue === '') {
      context.addEmptyClass(email, 'Fill this form');
    } else if (!emailRegExp.test(emailValue)) {
      context.addEmptyClass(email, 'Email is not correct');
    }
  }

  validatePhone(phone, context) {
    const phoneNumber = phone.value;
    const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/;
    if (phoneNumber === '') {
      context.addEmptyClass(phone, 'Fill this form');
    } else if (!phoneRegExp.test(phoneNumber)) {
      context.addEmptyClass(phone, 'Phone number is not correct');
    }
  }

  validatePassword(password, context) {
    const passwordValue = password.value;

    if (passwordValue === '') {
      context.addEmptyClass(password, 'Fill this form');
    } else if (passwordValue.split('').length < context.minPassword) {
      context.addEmptyClass(password, 'Password must have minimum ' + context.minPassword + ' simbols.');
    }
  }

  addBlurListener(element, f) {
    element.addEventListener('blur', e => {
      this.findEmptyClassElement(element);
      f(element, this);
    });
  }

  addListener(form) {
    const fields = form.querySelectorAll('.form__input');

    form.addEventListener('submit', e => {
      e.preventDefault();

      fields.forEach( field => {
        this.findEmptyClassElement(field);
      })
      
      fields.forEach( field => {
        this.checkEmptyField(field, this);
      })
      
      this.validateEmail(this.email, this);
      this.validatePhone(this.phone, this);
      this.validatePassword(this.password, this);
    });

    fields.forEach( field => {
      this.addBlurListener(field, this.checkEmptyField);
    });

    this.addBlurListener(this.email, this.validateEmail);
    this.addBlurListener(this.password, this.validatePassword);
    this.addBlurListener(this.phone, this.validatePhone);
  }
}

let form = document.querySelector('#formToValidate');
let myFormValidetion = new FormValidation({form: form, password: 4})