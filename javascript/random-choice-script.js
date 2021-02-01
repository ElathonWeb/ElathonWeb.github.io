const header = document.getElementsByTagName("header");
const footer = document.getElementsByTagName("footer");
const container = document.querySelector(".container");
const formContainer = document.querySelector(".form-container");
const createBoxInput = document.getElementById("create-form-input");
const nameInput = document.getElementById("name-input");
const formDone = document.querySelector(".form-done");
const formCancel = document.getElementById("form-cancel");
const title = document.getElementById("page-title");
const warningBox = document.getElementById("warning-box");

window.onload = () => {
    var randomChoiceObj = JSON.parse(localStorage.getItem('randomChoice'));

    if(randomChoiceObj != null) {
        for(let i = 0; i < randomChoiceObj.length; i++) {
            container.innerHTML += `<div class="box"><h3 class="box-title2">${randomChoiceObj[i]}</h3><div class="buttons"><button class="edit-name" id="${i + 1}" onclick="createBox('edit', this.id)">Edit Name</button><button class="remove-box" onclick="removeBox(this)">Delete</button></div><button class="select">SELECT</button></div>`;
            console.log(randomChoiceObj[i]);
        }
    }
}

function createBox(formID, boxID) {
    "use strict";

    if(window.getComputedStyle(formContainer).display == 'none') {

        formContainer.style.display = "flex";
        header[0].classList.toggle("blur");
        footer[0].classList.toggle("blur");
        container.classList.toggle("blur");
        title.classList.toggle("blur");
        warningBox.classList.toggle("blur");

        if(boxID != undefined) {
            formDone.id = `${formID}-${boxID}`;
        }
        else {
            formDone.id = formID
        }

        formContainer.scrollIntoView();
    }
};

function removeBox(box) {
    "use strict";

    if(window.getComputedStyle(formContainer).display == 'none') {

        box.parentNode.parentNode.parentNode.removeChild(box.parentNode.parentNode);

        const editButtons = document.querySelectorAll(".edit-name");

        for(let i = 0; i < editButtons.length; i++) {
            editButtons[i].setAttribute('id', `edit${i + 1}`);
        }

        save();
    }
}

formCancel.addEventListener('click', (event) => {
    event.preventDefault();

    formContainer.style.display = "none";
    header[0].classList.toggle("blur");
    footer[0].classList.toggle("blur");
    container.classList.toggle("blur");
    title.classList.toggle("blur");
    warningBox.classList.toggle("blur");

    nameInput.value = "";
})

function formComplete(event) {
    "use strict";

    event.preventDefault();

    var formID = undefined;
    var boxID = undefined;

    if (formDone.id.includes('edit')) {
        var id = formDone.id.split("-");
        formID = id[0];
        boxID = id[1];
    }
    else {
        formID = formDone.id;
    }

    if(nameInput.value.length != 0 && nameInput.value.length <= 12) {
        formContainer.style.display = "none";
        header[0].classList.toggle("blur");
        footer[0].classList.toggle("blur");
        container.classList.toggle("blur");
        title.classList.toggle("blur");
        warningBox.classList.toggle("blur");

        const editButtons = document.querySelectorAll(".edit-name");

        var newID = undefined;

        if(editButtons.length > 0) {
            newID = "edit" + (editButtons.length + 1).toString();
        }
        else {
            newID = "edit1";
        }

        if(formID == 'new') {
            container.innerHTML += `<div class="box"><h3 class="box-title2">${nameInput.value}</h3><div class="buttons"><button class="edit-name" id="${newID}" onclick="createBox('edit', this.id)">Edit Name</button><button class="remove-box" onclick="removeBox(this)">Delete</button></div><button class="select">SELECT</button></div>`;
        }
        else {
            const box = document.getElementById(boxID);
            box.parentNode.previousElementSibling.textContent = nameInput.value;
        }

        nameInput.value = "";

        save();
    }
}

function save() {
    const boxesTitles = document.querySelectorAll(".box-title2");

    var randomChoiceObj = []

    for(let i = 0; i < boxesTitles.length; i++) {
        randomChoiceObj[i] = boxesTitles[i].textContent;
        console.log(randomChoiceObj[i]);
    }

    localStorage.setItem('randomChoice', JSON.stringify(randomChoiceObj));
}

function clearItem(item) {
    localStorage.removeItem(item);
}