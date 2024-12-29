const form = document.querySelector("form");
const inputs = document.querySelectorAll("input, textarea"); // Select all input and textarea fields
const queryTypeRadios = document.querySelectorAll('input[name="query-type"]'); // Radio buttons
const agreeCheckbox = document.getElementById("agree"); // Consent checkbox
const messageTextArea = document.getElementById("message"); // Message textarea

const successMessageContainer = document.getElementById("success-message-container"); // Success message container

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh by default
    let allValid = true;

    inputs.forEach((input) => {
        if (!validateInput(input)) {
            allValid = false; // If any input is invalid, set flag to false
        }
    });

    if (!validateRadioButtons()) {
        allValid = false; // If no radio button is selected
    }

    if (!validateMessage()) {
        allValid = false; // If message is empty
    }

    if (!validateCheckbox()) {
        allValid = false; // If checkbox is not checked
    }

    if (allValid) {
        // Simulate form submission (replace with your actual submission method)
        // Here, we're showing the success message and clearing the form
        successMessageContainer.style.display = 'block'; // Show success message container

        // Clear the form after submission
        form.reset();

        // Store a flag in sessionStorage to indicate the success message should be shown on reload
        sessionStorage.setItem('successMessageShown', 'true');
    }
});

// Check if the success message should be shown after page reload
window.addEventListener('load', function() {
    if (sessionStorage.getItem('successMessageShown')) {
        successMessageContainer.style.display = 'block'; // Show success message
        sessionStorage.removeItem('successMessageShown'); // Clear the flag so it doesn't show again
    }
});

// Validation Functions (same as before)
function validateInput(input) {
    let isValid = true;
    const errorContainer = input.nextElementSibling; // Check for an existing sibling (error message)

    if (!input.value.trim() && input.type !== "radio" && input.type !== "checkbox") {
        isValid = false; // Mark as invalid
        input.style.border = "2px solid red"; // Highlight border in red

        // Add error message if it doesn't exist
        if (!errorContainer || !errorContainer.classList.contains(`${input.name}-error`)) {
            const errorMessage = document.createElement("div");
            errorMessage.textContent = capitalizeFirstLetter(`${input.name.replace("-", " ")} is required.`);
            errorMessage.className = `${input.name}-error`;
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "14px";
            errorMessage.style.marginTop = "5px"; // margin to space it from input
            input.parentNode.appendChild(errorMessage); // Append to the input's parent
        }
    } else {
        input.style.border = ""; // Reset border
        if (errorContainer && errorContainer.classList.contains(`${input.name}-error`)) {
            errorContainer.remove(); // Remove error message
        }
    }

    return isValid; // Return whether the input is valid
}

function validateRadioButtons() {
    let isValid = false;
    queryTypeRadios.forEach((radio) => {
        if (radio.checked) {
            isValid = true; // At least one radio button is selected
        }
    });

    const errorContainer = document.querySelector(".query-type-container .error-message");
    if (!isValid) {
        if (!errorContainer) {
            const newError = document.createElement("div");
            newError.textContent = "Query Type is required.";
            newError.className = "error-message";
            newError.style.color = "red";
            newError.style.fontSize = "14px";
            newError.style.marginTop = "5px"; // margin to space it from radio buttons
            newError.style.marginBottom = "10px"; // margin to space it from other elements
            document.querySelector(".query-type-container").appendChild(newError); // Append below the container
        }
    }

    return isValid;
}

function validateMessage() {
    const isValid = messageTextArea.value.trim() !== ""; // Check if the message is not empty

    const errorContainer = messageTextArea.nextElementSibling;
    if (!isValid) {
        if (!errorContainer || !errorContainer.classList.contains("message-error")) {
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Message is required.";
            errorMessage.className = "message-error";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "14px";
            errorMessage.style.marginTop = "5px"; // margin to space it from textarea
            messageTextArea.parentNode.appendChild(errorMessage); // Append below textarea
        }
    }

    return isValid;
}

function validateCheckbox() {
    const isValid = agreeCheckbox.checked; // Check if the checkbox is checked

    const errorContainer = document.querySelector(".checkbox-container .error-message");
    if (!isValid) {
        if (!errorContainer) {
            const newError = document.createElement("div");
            newError.textContent = "You must consent to be contacted.";
            newError.className = "error-message";
            newError.style.color = "red";
            newError.style.fontSize = "14px";
            newError.style.marginTop = "5px"; // margin to space it from checkbox
            document.querySelector(".checkbox-container").appendChild(newError); // Append below the container
        }
    }

    return isValid;
}

// Remove error styling as the user types or changes selection
inputs.forEach((input) => {
    input.addEventListener("input", function () {
        input.style.border = ""; // Reset border
        const errorContainer = input.nextElementSibling;
        if (errorContainer && errorContainer.classList.contains(`${input.name}-error`)) {
            errorContainer.remove(); // Remove error message
        }
    });
});

// Event listeners for radio buttons and checkbox to remove error messages when they are selected
queryTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        const errorContainer = document.querySelector(".query-type-container .error-message");
        if (errorContainer) {
            errorContainer.remove(); // Remove error message when a radio button is selected
        }
    });
});

agreeCheckbox.addEventListener("change", function () {
    const errorContainer = document.querySelector(".checkbox-container .error-message");
    if (errorContainer) {
        errorContainer.remove(); // Remove error message when the checkbox is checked
    }
});

// Capitalize the first letter of the error message
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
