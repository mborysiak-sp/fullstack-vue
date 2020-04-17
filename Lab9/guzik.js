const dodajGuzik = () => {
     li = createLi();

     let parent = event.target.parentNode;
    
     parent.after(li);
};

const createLi = () => {
    let li = document.createElement('LI');

    li.innerHTML = 'nowy';

    let tempGuzik = document.createElement('BUTTON');

    tempGuzik.innerHTML = 'Spec';

    tempGuzik.onclick = dodajGuzik;

    li.appendChild(tempGuzik);

    return li;
};

window.addEventListener("DOMContentLoaded", () => {
    let li = document.getElementsByClassName('spec')[0];

    let el = li.getElementsByTagName('button')[0];

    el.onclick = dodajGuzik;

})