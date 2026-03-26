export const isRequired = (fieldName) => (value) => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const isBetween = (fieldName, min, max) => (value) => {
  if (value.length < min || value.length > max) {
    return `${fieldName} should be between ${min} and ${max} characters`;
  }
  return null;
};

export const isEmail = (fieldName) => (value) => {
  if (!/\S+@\S+\.\S+/.test(value)) {
    return `${fieldName} is invalid`;
  }
  return null;
};
