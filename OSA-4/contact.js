document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const result = document.getElementById("result"); // Ensure this exists in your HTML

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(form);

        // Get the name input value
        const name = formData.get("name");

        // Create a custom subject
        formData.append("subject", `${name} sent a message from the website`);

        // Display a loading message
        result.innerHTML = "Sending message...";
        result.style.display = "block";
        result.style.color = "white";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData, // Send as FormData, NOT JSON
        })
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            if (data.success) {
                result.innerHTML = "Message sent successfully!";
                result.style.color = "white";
                form.reset(); // Clear form fields
            } else {
                console.error(data);
                result.innerHTML = "Error sending message. Please try again.";
                result.style.color = "white";
            }
        })
        .catch(error => {
            console.error(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "white";
        })
        .finally(() => {
            setTimeout(() => {
                result.style.display = "none";
            }, 3000); // Hide message after 3 seconds
        });
    });
});
