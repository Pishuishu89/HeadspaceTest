// Store teams
const teams = {
    "Team Artin": ["Cano"]
};

// Store doctors
const doctors = ["Ishaan", "Lara"];

let currentRole = "";

// Select Role
function selectRole(role) {
    currentRole = role;
    document.getElementById("loginSection").classList.remove("hidden");
    document.querySelector(".menu").classList.add("hidden");
}

// Cancel Login
function cancelLogin() {
    currentRole = "";
    document.getElementById("loginSection").classList.add("hidden");
    document.querySelector(".menu").classList.remove("hidden");
}

// Login Function
function login() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) {
        alert("Please enter your name");
        return;
    }

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (currentRole === "coach") {
        if (formattedName !== "Artin") {
            alert("Access denied: Only Artin can log in as a coach.");
            return;
        }
        showCoachDashboard();
    } else if (currentRole === "doctor") {
        if (!doctors.includes(formattedName)) {
            alert("Access denied: You are not a doctor.");
            return;
        }
        showDoctorDashboard();
    } else if (currentRole === "player") {
        if (formattedName === "Cano") {
            showPlayerDashboard(formattedName);
        } else {
            alert("Access denied: Only Cano is allowed.");
        }
    }
}

function showCoachDashboard() {
    const coachName = "Artin"; 
    const team = "Team Artin"; 

    document.querySelector(".menu").classList.add("hidden");
    document.getElementById("loginSection").classList.add("hidden");

    document.getElementById("dashboard").innerHTML = `
        <h2>Coach ${coachName}</h2>
        <h3>Team: ${team}</h3>
        <div>
            <button class="player-button" onclick="openBrainImages()">Cano</button>
        </div>
    `;
    
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("signOutButton").classList.remove("hidden");
}

function showDoctorDashboard() {
    document.querySelector(".menu").classList.add("hidden");
    document.getElementById("loginSection").classList.add("hidden");

    document.getElementById("dashboard").innerHTML = `
        <h2>Doctor Panel</h2>
        <div>
            <button class="player-button" onclick="openBrainImages()">Cano (Team Artin)</button>
        </div>
        <textarea id="doctorNotes" placeholder="Enter notes about the player..."></textarea>
        <button class="save-button" onclick="saveNotes()">Save Notes</button>
    `;

    // Load saved notes
    document.getElementById("doctorNotes").value = localStorage.getItem("doctorNotes") || "";

    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("signOutButton").classList.remove("hidden");
}

// Player Dashboard
function showPlayerDashboard(name) {
    document.querySelector(".menu").classList.add("hidden");
    document.getElementById("loginSection").classList.add("hidden");

    document.getElementById("dashboard").innerHTML = `
        <h2>Player ${name}</h2>
        <p>Injury Report: No recent head injuries.</p>
        <button class="player-button" onclick="openBrainImages()">View Brain Scans</button>
    `;

    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("signOutButton").classList.remove("hidden");
}

// Save Doctor Notes
function saveNotes() {
    const notes = document.getElementById("doctorNotes").value;
    localStorage.setItem("doctorNotes", notes);
    alert("Notes saved successfully!");
}

// Function to Open Brain Images in New Tab with Notes
function openBrainImages() {
    const savedNotes = localStorage.getItem("doctorNotes") || "No notes available.";
    
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>Brain Scan</title>
            <style>
                body { text-align: center; font-family: Arial, sans-serif; }
                img { width: 45%; margin: 10px; }
                textarea { width: 80%; height: 100px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>Brain Scan Images</h1>
            <img src="brain.png" alt="Brain Image 1">
            <img src="brain 2.jpg" alt="Brain Image 2">
            <h2>Doctor's Notes</h2>
            <p>${savedNotes}</p>
        </body>
        </html>
    `);
}
function openBrainImages() {
    const savedNotes = localStorage.getItem("doctorNotes") || "No notes available.";

    // Open a new tab
    const newWindow = window.open("", "_blank");

    // Write the HTML structure
    newWindow.document.write(`
        <html>
        <head>
            <title>Brain Scan & Damage Graph</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                body { text-align: center; font-family: Arial, sans-serif; }
                img { width: 45%; margin: 10px; }
                canvas { margin-top: 20px; width: 80%; height: 300px; }
            </style>
        </head>
        <body>
            <h1>Brain Scan Images</h1>
            <img src="brain.png" alt="Brain Image 1">
            <img src="brain 2.jpg" alt="Brain Image 2">
            
            <h2>Doctor's Notes</h2>
            <p>${savedNotes}</p>
            
            <h2>Damage Severity Over Time</h2>
            <img src="graph.png" alt="Damage Graph">

        </body>
        </html>
    `);
}
