import './App.css';

import { isBetween, isEmail, isRequired } from './utils';
import useFormHook from './useFormHook.js';

// Todo: create order.jsx and it uses useFormHook

function App() {
  // for rendering JSX form
  const fields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      validators: (label) => [isRequired(label), isBetween(label, 2, 20)],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      validators: (label) => [isRequired(label), isBetween(label, 2, 20)],
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
      validators: (label) => [isRequired(label), isBetween(label, 8, 20)],
    },
    { name: 'email', label: 'Email', type: 'email', validators: (label) => [isRequired(label), isEmail(label)] },
  ];

  const { handleSubmit, handleChange, errors, isValidated, form } = useFormHook({ fields });

  return (
    <>
      {/* Todo: extract form to a separate component*/}
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
