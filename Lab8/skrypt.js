const wsparcie = () => {
    document.getElementById("pro-plan").getElementsByClassName("list-unstyled").item(0).children.item(3).textContent = "Wsparcie Telefoniczne 24/7";
}

const replace = () => {
    let cardDeck = document.getElementsByClassName("card-deck").item(0);
    let proPlan = document.getElementById("pro-plan");
    let proPlanClone = proPlan.cloneNode(true);
    cardDeck.removeChild(proPlan);
    cardDeck.appendChild(proPlanClone);
}

const uwaga = () => {
    let button = document.getElementById("pro-plan").getElementsByClassName("card-body").item(0).getElementsByClassName("btn").item(0);
    button.style.backgroundColor = '#FF0000';
    button.style.color = '#000000';
    button.textContent = 'Kup teraz';
}

const promocja = () => {
    let storage = document.getElementById("pro-plan").getElementsByClassName("list-unstyled").item(0).getElementsByClassName("storage-amount").item(0);
    storage.textContent = storage.textContent * 1.25;
    storage.style.fontWeight = 'bold';

    storage = document.getElementById("basic-plan").getElementsByClassName("list-unstyled").item(0).getElementsByClassName("storage-amount").item(0);
    storage.textContent = storage.textContent * 1.5;
    storage.style.fontWeight = 'bold';
}

window.onload = promocja;