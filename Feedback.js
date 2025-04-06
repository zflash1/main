// Function to update the clock
function updateClock() {
    var now = new Date(); // Get the current date and time
    var hours = now.getHours(); // Get current hour
    var minutes = now.getMinutes(); // Get current minute
    var seconds = now.getSeconds(); // Get current second

    // Pad single digits with a leading zero
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    // Format the time string
    var timeString = hours + ":" + minutes + ":" + seconds;

    // Update the clock element
    document.getElementById('clock').textContent = timeString;
}

// Call updateClock() every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".Stars");
    const textarea = document.getElementById("Feedback");
    const submitButton = document.querySelector(".Submit");
    let selectedRating = 0; // Para malaman kung ilang stars ang napili

    
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            selectedRating = index + 1; 
            stars.forEach(s => s.classList.remove("gold")); 

            
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("gold");
            }
        });
    });

    
    submitButton.addEventListener("click", function () {
        const feedbackText = textarea.value.trim();

        if (selectedRating === 0 || feedbackText === "") {
            alert("Paki-pili ang rating at maglagay ng feedback bago mag-submit!");
            return;
        }

        const feedbackData = `Rating: ${selectedRating} stars\nFeedback: ${feedbackText}\n\n`;
        downloadFeedback(feedbackData); 
        
        stars.forEach(star => star.classList.remove("gold"));
        textarea.value = "";
        selectedRating = 0;
    });

    
    function downloadFeedback(content) {
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "feedback.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    }
});

