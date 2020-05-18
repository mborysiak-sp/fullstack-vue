const roomList = document.querySelector("room-list");



let createRoom = (roomName) => {
    const div = document.createElement("div");
    div.classList.add("room");
    div.innerHTML = `<p class="text">${roomName}</p>`;
    roomList.appendChild(div);
}