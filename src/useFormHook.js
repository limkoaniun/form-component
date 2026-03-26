import { useState } from 'react';

export default function useFormHook({ fields }) {
  const fieldValidators = Object.fromEntries(fields.map((field) => [field.name, field.validators(field.label)]));

  const [form, setForm] = useState(Object.fromEntries(fields.map((field) => [field.name, ''])));

  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const validateField = (fieldName, value) => {
    const validators = fieldValidators[fieldName];

    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return null;
  };

  const validateForm = (form) => {
    const nextErrors = {};

    for (const key in form) {
      const error = validateField(key, form[key]);
      if (error) {
        nextErrors[key] = error;
      }
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prevState) => {
      const nextErrors = { ...prevState };

      if (error) {
        nextErrors[name] = error;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsValidated(false);
      return;
    }
    setErrors({});
    setIsValidated(true);
    console.log('Form submitted:', form);
  };

  return {
    handleSubmit,
    handleChange,
    errors,
    isValidated,
    form,
  };
}
