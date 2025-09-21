const API_URL = 'http://localhost:8181/api';
let authToken = localStorage.getItem('token');

function showLogin() {
    hideAll();
    document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
    hideAll();
    
}

function showCards() {
    hideAll();
    document.getElementById('cardsContainer').style.display = 'block';
    fetchCards();
}

function hideAll() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('cardsContainer').style.display = 'none';
    document.getElementById('content').style.display = 'none';
}

async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('token', authToken);
            alert('התחברת בהצלחה!');
            showCards();
        } else {
            alert('שגיאה בהתחברות: ' + data.error);
        }
    } catch (error) {
        alert('שגיאת רשת: ' + error.message);
    }
}

async function fetchCards() {
    try {
        const response = await fetch(`${API_URL}/cards`);
        const cards = await response.json();

        displayCards(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

function displayCards(cards) {
    const container = document.getElementById('cardsList');
    container.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            <p>${card.subtitle}</p>
            <p>${card.description}</p>
            <p>טלפון: ${card.phone}</p>
            <p>אימייל: ${card.email}</p>
        `;
        container.appendChild(cardElement);
    });
}