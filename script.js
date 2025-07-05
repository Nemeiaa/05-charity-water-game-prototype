// Simple interactive story game for beginners

// Story data structure
const story = [
    {
        id: 0,
        text: `You arrive in a village that needs clean water. What will you do first?`,
        choices: [
            { text: "Talk to the village chief", next: 1 },
            { text: "Look for water sources", next: 2 }
        ]
    },
    {
        id: 1,
        text: `The chief welcomes you. He gives you a Business Card. What next?`,
        item: "Business Card",
        choices: [
            { text: "Visit the local school", next: 3 },
            { text: "Search for engineers", next: 4 }
        ]
    },
    {
        id: 2,
        text: `You find a muddy river. It's not safe to drink. What now?`,
        choices: [
            { text: "Return to the village", next: 0 },
            { text: "Test the water", next: 5 }
        ]
    },
    {
        id: 3,
        text: `At the school, students are excited. A teacher asks if you have a Business Card.`,
        choices: [
            { text: "Show Business Card", next: 6, requiredItem: "Business Card" },
            { text: "Say you forgot it", next: 7 }
        ]
    },
    {
        id: 4,
        text: `You meet an engineer who can help. He needs proof you are from the charity.`,
        choices: [
            { text: "Show Business Card", next: 8, requiredItem: "Business Card" },
            { text: "Go back to the chief", next: 1 }
        ]
    },
    {
        id: 5,
        text: `You test the water. It's dirty. You need help from the village.`,
        choices: [
            { text: "Return to the village", next: 0 }
        ]
    },
    {
        id: 6,
        text: `The teacher smiles and offers to help spread the word. Progress!`,
        choices: [
            { text: "Continue", next: 9 }
        ]
    },
    {
        id: 7,
        text: `The teacher looks unsure. Maybe you should get the Business Card.`,
        choices: [
            { text: "Return to the chief", next: 1 }
        ]
    },
    {
        id: 8,
        text: `The engineer agrees to help build a well. The village celebrates!`,
        choices: [
            { text: "Finish", next: 10 }
        ]
    },
    {
        id: 9,
        text: `With the school's help, the project is a success!`,
        choices: [
            { text: "Finish", next: 10 }
        ]
    },
    {
        id: 10,
        text: `Congratulations! You helped bring clean water to the village!`,
        choices: [
            { text: "Play Again", next: 0 }
        ]
    }
];

// Track game state
let currentNode = 0;
let inventory = [];
let visitedNodes = [];

// Get DOM elements
const storyContainer = document.getElementById('story-container');
const choicesContainer = document.getElementById('choices-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const resetButton = document.getElementById('reset-button');

// Show the current story node
function showNode(nodeId) {
    // Find the node in the story array
    const node = story.find(n => n.id === nodeId);

    // Add node to visited if not already there
    if (!visitedNodes.includes(nodeId)) {
        visitedNodes.push(nodeId);
    }

    // If the node gives an item, add it to inventory
    if (node.item && !inventory.includes(node.item)) {
        inventory.push(node.item);
    }

    // Show story text
    storyContainer.textContent = node.text;

    // Clear previous choices
    choicesContainer.innerHTML = '';

    // Show choices as buttons
    node.choices.forEach(choice => {
        // If the choice requires an item, check inventory
        let canChoose = true;
        if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
            canChoose = false;
        }

        // Create a button for each choice
        const btn = document.createElement('button');
        btn.textContent = choice.text;

        // Disable button if requirements not met
        btn.disabled = !canChoose;

        // Add a helpful tooltip if disabled
        if (!canChoose) {
            btn.title = `You need: ${choice.requiredItem}`;
        }

        // When clicked, go to the next node
        btn.addEventListener('click', function() {
            goToNode(choice.next);
        });

        choicesContainer.appendChild(btn);
    });

    // Update progress bar
    updateProgressBar();
}

// Go to a specific node
function goToNode(nodeId) {
    currentNode = nodeId;
    showNode(currentNode);
}

// Update the progress bar based on how many unique nodes visited
function updateProgressBar() {
    // Calculate progress as a percentage
    const percent = Math.floor((visitedNodes.length / story.length) * 100);
    progressBarFill.style.width = `${percent}%`;
}

// Reset the game to the beginning
function resetGame() {
    currentNode = 0;
    inventory = [];
    visitedNodes = [];
    showNode(currentNode);
}

// Menu button toggles menu visibility
menuButton.addEventListener('click', function() {
    // Show or hide the menu
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// Reset button resets the game
resetButton.addEventListener('click', function() {
    resetGame();
    menu.style.display = 'none'; // Hide menu after reset
});

// Start the game
showNode(currentNode);
