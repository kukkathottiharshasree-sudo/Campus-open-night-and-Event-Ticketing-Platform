const CAMPUS_EVENTS = [
    { id: "EVT-101", title: "Engineering Campus Open Night", dept: "Engineering", desc: "Explore labs, prototype exhibits, and experience live autonomous drone demonstrations." },
    { id: "EVT-102", title: "Annual Cultural Gala", dept: "Arts & Media", desc: "An evening featuring theatrical productions, battle of the bands, and art exhibitions." },
    { id: "EVT-103", title: "FinTech Hackathon Pitch Final", dept: "Business & CS", desc: "Watch top student startup engineering groups pitch their products to venture panels." }
];

let MY_TICKETS = [];
let SCANNED_TICKET_REGISTRY = new Set(); 

document.addEventListener("DOMContentLoaded", () => {
    renderEventCatalog();
});

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active');
    });
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
}

function renderEventCatalog() {
    const container = document.getElementById("event-container");
    if (!container) return;
    container.innerHTML = "";

    CAMPUS_EVENTS.forEach(evt => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <div class="event-details">
                <span class="event-badge">${evt.dept}</span>
                <h3 class="event-title">${evt.title}</h3>
                <p class="event-desc">${evt.desc}</p>
                <button onclick="bookTicket('${evt.id}')" class="btn-primary">Register Entry Pass</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function bookTicket(eventId) {
    const selectedEvent = CAMPUS_EVENTS.find(e => e.id === eventId);
    
    if(MY_TICKETS.some(t => t.eventId === eventId)) {
        alert("Account Notification: You have already reserved an entry ticket pass for this specific event.");
        return;
    }

    const ticketUID = `TXN-${eventId}-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticketObject = {
        ticketId: ticketUID,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        timestamp: new Date().toLocaleString()
    };

    MY_TICKETS.push(ticketObject);
    alert(`Success! Entry registration booked for ${selectedEvent.title}. Check your Digital Ticket Wallet.`);
    
    renderTicketWallet();
    switchView('ticket-view');
}

function renderTicketWallet() {
    const walletContainer = document.getElementById("my-tickets-container");
    if (!walletContainer) return;
    
    if(MY_TICKETS.length === 0) {
        walletContainer.innerHTML = `<p class="empty-state">No tickets booked yet.</p>`;
        return;
    }

    walletContainer.innerHTML = "";
    
    MY_TICKETS.forEach(ticket => {
        const card = document.createElement("div");
        card.className = "ticket-card";
        
        const infoDiv = document.createElement("div");
        infoDiv.innerHTML = `
            <h3>${ticket.eventTitle}</h3>
            <p style="color: #4f46e5; font-weight: bold; font-size: 0.9rem; margin-top:0.5rem;">Copy Code for Scanner: ${ticket.ticketId}</p>
            <p style="color: #9ca3af; font-size: 0.75rem; margin-top:0.25rem;">Issued: ${ticket.timestamp}</p>
        `;

        const qrContainer = document.createElement("div");
        qrContainer.className = "qr-wrapper";
        qrContainer.id = `qr-${ticket.ticketId}`;
        qrContainer.style.minWidth = "90px";
        qrContainer.style.minHeight = "90px";
        qrContainer.style.display = "flex";
        qrContainer.style.alignItems = "center";
        qrContainer.style.justifyContent = "center";

        card.appendChild(infoDiv);
        card.appendChild(qrContainer);
        walletContainer.appendChild(card);

        try {
            if (typeof QRCode !== 'undefined') {
                new QRCode(document.getElementById(`qr-${ticket.ticketId}`), {
                    text: ticket.ticketId,
                    width: 90,
                    height: 90,
                    correctLevel: QRCode.CorrectLevel.H
                });
            } else {
                qrContainer.innerHTML = "<small style='color:#6b7280;'>[QR Preview]</small>";
            }
        } catch (err) {
            qrContainer.innerHTML = "<small style='color:#6b7280;'>[QR Preview]</small>";
        }
    });
}

function simulateScan() {
    const inputField = document.getElementById("manual-scan-input");
    const resultBanner = document.getElementById("scan-result");
    if (!inputField || !resultBanner) return;

    const rawValue = inputField.value.trim();

    if(!rawValue) {
        alert("Please paste a ticket verification ID to test.");
        return;
    }

    const ticketExists = MY_TICKETS.some(t => t.ticketId === rawValue);

    if (!ticketExists) {
        resultBanner.textContent = " INVALID TICKET - Access Denied";
        resultBanner.style.backgroundColor = "#fee2e2";
        resultBanner.style.color = "#ef4444";
    } else if (SCANNED_TICKET_REGISTRY.has(rawValue)) {
        resultBanner.textContent = "DUPLICATE SCANNED - Fraud Risk";
        resultBanner.style.backgroundColor = "#fef3c7";
        resultBanner.style.color = "#d97706";
    } else {
      
        SCANNED_TICKET_REGISTRY.add(rawValue);
        resultBanner.textContent = "VALID ENTRY PASS - Access Granted";
        resultBanner.style.backgroundColor = "#d1fae5";
        resultBanner.style.color = "#10b981";
    }
    
    inputField.value = ""; 
}
