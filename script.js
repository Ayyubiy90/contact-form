document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", handleSubmit);

  // Add input event listeners for real-time validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
  });
});

function handleSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    // Simulate form submission
    setTimeout(() => {
      document.getElementById("contact-form").classList.add("hidden");
      document.getElementById("success-message").classList.remove("hidden");
    }, 1000);
  }
}

function validateForm() {
  const fields = [
    {
      id: "first-name",
      errorId: "first-name-error",
      errorMessage: "First name is required",
    },
    {
      id: "last-name",
      errorId: "last-name-error",
      errorMessage: "Last name is required",
    },
    {
      id: "email",
      errorId: "email-error",
      errorMessage: "Please enter a valid email address",
    },
    {
      id: "message",
      errorId: "message-error",
      errorMessage: "Message is required",
    },
  ];

  let isValid = true;

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!validateField(input)) {
      isValid = false;
    }
  });

  // Validate radio buttons
  const queryType = document.querySelector('input[name="query-type"]:checked');
  if (!queryType) {
    displayError("query-type-error", "Please select a query type");
    isValid = false;
  } else {
    clearError("query-type-error");
  }

  // Validate checkbox
  const consent = document.getElementById("consent");
  if (!consent.checked) {
    displayError("consent-error", "You must consent to be contacted");
    isValid = false;
  } else {
    clearError("consent-error");
  }

  return isValid;
}

function validateField(input) {
  if (input.type === "email") {
    if (!isValidEmail(input.value)) {
      displayError(`${input.id}-error`, "Please enter a valid email address");
      return false;
    }
  } else if (input.value.trim() === "") {
    displayError(`${input.id}-error`, `${input.name} is required`);
    return false;
  }

  clearError(`${input.id}-error`);
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function clearError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}
