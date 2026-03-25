import './App.css';
import { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFirstName = (firstName) => {
    if (!firstName) {
      return 'First name is required';
    }
    if (firstName.length < 2 || firstName.length > 10) {
      return 'First name should be between 2 and 10 characters';
    }
    return null;
  };

  const validateLastName = (lastName) => {
    if (!lastName) {
      return 'Last name is required';
    }
    if (lastName.length < 2 || lastName.length > 10) {
      return 'Last name should be between 2 and 10 characters';
    }
    return null;
  };

  const validateUsername = (username) => {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 8 || username.length > 20) {
      return 'Username should be between 8 and 20 characters';
    }
    return null;
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8 || password.length > 20) {
      return 'Password should be between 8 and 20 characters';
    }
    return null;
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid';
    }
    return null;
  };

  const validateForm = (form) => {
    const errors = {};
    errors.firstName = validateFirstName(form.firstName);
    errors.lastName = validateLastName(form.lastName);
    errors.username = validateUsername(form.username);
    errors.password = validatePassword(form.password);
    errors.email = validateEmail(form.email);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsValidated(false);
    } else {
      setErrors({});
      setIsValidated(true);
      console.log('Form submitted:', form);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        {isValidated && <h4 style={{ color: 'green', textAlign: 'center' }}>Form submitted successfully!</h4>}

        <div>
          <div>
            <label htmlFor='firstName'>First Name </label>
            <input type='text' name='firstName' value={form.firstName} onChange={handleChange} />
            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor='lastName'>Last Name </label>
            <input type='text' name='lastName' value={form.lastName} onChange={handleChange} />
            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor='username'>Username </label>
            <input type='text' name='username' value={form.username} onChange={handleChange} />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor='password'>Password </label>
            <input type='password' name='password' value={form.password} onChange={handleChange} />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>
          <div>
            <label htmlFor='email'>Email </label>
            <input type='email' name='email' value={form.email} onChange={handleChange} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
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
