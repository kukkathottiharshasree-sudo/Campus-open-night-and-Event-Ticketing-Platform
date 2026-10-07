alert("NBKRIST JavaScript is working!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("NBKRIST script loaded successfully");

    const eventGrid = document.getElementById("eventGrid");

    if (eventGrid) {
        eventGrid.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                border: 2px solid #6847f5;
            ">
                <h2>JavaScript is Working ...</h2>
                <p>NBKRIST Event System Loaded Successfully</p>

                <button
                    onclick="alert('Ticket button works!')"
                    style="
                        margin-top: 15px;
                        padding: 12px 20px;
                        background: #6847f5;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    "
                >
                    Test Ticket
                </button>
            </div>
        `;
    }
});
