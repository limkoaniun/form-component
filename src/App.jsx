import './App.css';
import { useState } from 'react';

const isRequired = (fieldName) => {
  return (value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return null;
  };
};

const isBetween = (fieldName, min, max) => {
  return (value) => {
    if (value.length < min || value.length > max) {
      return `${fieldName} should be between ${min} and ${max} characters`;
    }
    return null;
  };
};

const isEmail = (fieldName) => {
  return (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return `${fieldName} is invalid`;
    }
    return null;
  };
};

// for rendering JSX form
const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validators: (label) => [isRequired(label), isBetween(label, 2, 10)],
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validators: (label) => [isRequired(label), isBetween(label, 2, 10)],
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validators: (label) => [isRequired(label), isBetween(label, 2, 10)],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validators: (label) => [isRequired(label), isBetween(label, 2, 10)],
  },
  { name: 'email', label: 'Email', type: 'email', validators: (label) => [isRequired(label), isEmail(label)] },
];

const fieldValidators = Object.fromEntries(fields.map((field) => [field.name, field.validators(field.label)]));

function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  });

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        {isValidated && <h4 style={{ color: 'green', textAlign: 'center' }}>Form submitted successfully!</h4>}

        <div>
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                style={{ border: errors[field.name] ? '1px solid red' : '1px solid #ccc' }}
              />
              {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
            </div>
          ))}
          <div>
            <button
              type='submit'
              disabled={Object.keys(errors).length > 0}
              style={{
                backgroundColor: Object.keys(errors).length > 0 ? 'gray' : 'green',
                opacity: Object.keys(errors).length > 0 ? 0.5 : 1,
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
