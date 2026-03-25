import './App.css'
import {useState} from "react";

function App() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    })

    const [errors, setErrors] = useState({})
    const [isValidated, setIsValidated] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = (form) => {
        const errors = {};

        // validation logic
        if (!form.firstName) {
            errors.firstName = "First name is required";
        }
        if (form.firstName.length < 2 || form.firstName.length > 10) {
            errors.firstName = "First name should be between 2 and 10 characters";
        }
        if (!form.lastName) {
            errors.lastName = "Last name is required";
        }
        if (form.lastName.length < 2 || form.lastName.length > 10) {
            errors.lastName = "Last name should be between 2 and 10 characters";
        }
        if (!form.username) {
            errors.username = "Username is required";
        }
        if (form.username.length < 8 || form.username.length > 20) {
            errors.username = "Username should be between 8 and 20 characters";
        }
        if (!form.password) {
            errors.password = "You must provide a password";
        }
        if (
            form.password.length < 8 ||
            !/[A-Z]/.test(form.password) ||
            !/[a-z]/.test(form.password) ||
            !/\d/.test(form.password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
        ) {
            errors.password = "Password must be at least 8 characters long and " +
                "contain at least one uppercase letter, " +
                "one lowercase letter, one number, and " +
                "one special character";
        }
        if (!form.email) {
            errors.email = "Email is required";
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "Email is invalid";
        }

        return errors;
    }

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
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>
                    Registration Form
                </h1>
                {isValidated && <h4 style={{color: 'green', textAlign: 'center'}}>
                    Form submitted successfully!
                </h4>}

                <div>
                    <div>
                        <label htmlFor="firstName">First Name </label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p style={{color: 'red'}}>{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name </label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p style={{color: 'red'}}>{errors.lastName}</p>}
                    </div>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
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
    )
}

export default App