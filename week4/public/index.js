console.log('client JS loaded');

async function submitLink() {
    let failLinkInput = document.getElementById('failLink');

    let dataToSend = { failLink: failLinkInput.value };

    await fetch('/uploadFail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    });

    console.log('submitted L');
    getFailsFromServer();
}

async function getFailsFromServer() {
    let res = await fetch('/fails');
    let json = await res.json();

    let container = document.getElementById('failContainer');
    container.innerHTML = "";

    json.recipes.forEach((r, i) => {
        container.innerHTML += `
            <div class="L-card">
                <strong>L #${i + 1}:</strong> ${r}
            </div>
        `;
    });
}

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    submitLink();
});

window.addEventListener('load', getFailsFromServer);
