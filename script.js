// Simple interactive story game for beginners

// Select the story, button, and progress bar elements
const storyDiv = document.querySelector('.story');
const choiceBtn = document.querySelector('.choice');
const progressBar = document.querySelector('.progress');

// Select the progress bar fill element
const progressFill = document.querySelector('.progress-fill');

// Helper: ensure elements start with fade-in
[storyDiv, choiceBtn, progressBar].forEach(el => {
    el.classList.add('fade-in');
    el.classList.remove('fade-out');
});

// Hide the fill at startup
progressFill.classList.remove('show');

// Function to fade out elements
function fadeOutElements(elements, callback) {
    let faded = 0;
    elements.forEach(el => {
        // Remove any previous transitionend handlers to avoid stacking
        el.ontransitionend = null;
        el.classList.add('fade-out');
        el.classList.remove('fade-in');
        // Listen for transition end (only once)
        el.addEventListener('transitionend', function handler(e) {
            // Only trigger on opacity transition
            if (e.propertyName === 'opacity') {
                faded++;
                el.removeEventListener('transitionend', handler);
                if (faded === elements.length && typeof callback === 'function') {
                    callback();
                }
            }
        });
    });
}

// Function to fade in elements
function fadeInElements(elements) {
    elements.forEach(el => {
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
    });
}

// Create an inventory array to store items the player collects
let inventory = []; // This will hold strings like "water satchel"

// Add click event to the first choice button
choiceBtn.addEventListener('click', function handleFirstClick() {
    // Fade out story, button, and progress bar
    fadeOutElements([storyDiv, choiceBtn, progressBar], () => {
        // After fade out, change the content
        storyDiv.textContent = "Opening the door, I squint my eyes- a sheet of humidity envelops my body as my eyes slowly adjust to the sun.";
        choiceBtn.textContent = 'I walk outside.';

        // Show 5% of the progress bar fill
        progressFill.classList.add('show');

        // Create the "Wait..." button for the second phase
        let waitBtn = document.createElement('button');
        waitBtn.className = 'choice';
        waitBtn.textContent = 'Wait...';
        // Insert after the main choice button
        choiceBtn.parentNode.insertBefore(waitBtn, progressBar);

        // Fade in the new content and the new button
        fadeInElements([storyDiv, choiceBtn, waitBtn, progressBar]);

        // Add click event for the "Wait..." button
        waitBtn.addEventListener('click', function() {
            fadeOutElements([storyDiv, choiceBtn, waitBtn, progressBar], () => {
                // Update the story text
                storyDiv.textContent = "I go back inside, a sense of forgetfulness I dispel going into my room. I grab my water satchel, knowing I need it to stay hydrated in this heat.";

                // Add "water satchel" to the player's inventory if not already present
                if (!inventory.includes("water satchel")) {
                    inventory.push("water satchel");
                }

                // Hide the main choice button after waiting
                choiceBtn.style.display = 'none';
                waitBtn.textContent = 'Step outside again.';
                fadeInElements([storyDiv, waitBtn, progressBar]);
            });
        });

        // Remove this event listener so the first button only works once
        choiceBtn.removeEventListener('click', handleFirstClick);
    });
});

// Make sure elements are visible on load
fadeInElements([storyDiv, choiceBtn, progressBar]);
