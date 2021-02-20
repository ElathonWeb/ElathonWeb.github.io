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
    var objLength = randomChoiceObj.length;

    if(randomChoiceObj != null) {
        for(let i = 0; i < objLength; i++) {
            container.innerHTML += `<div class="box"><h3 class="box-title2">${randomChoiceObj[i].name}</h3><div class="buttons"><button class="edit-name" id="edit${i + 1}" onclick="createBox('edit', this.id)">Edit Name</button><button class="remove-box" onclick="removeBox(this)">Delete</button></div><button class="select" onclick="selectGen(this)">SELECT</button></div>`;
        }
    }
}

function createBox(formID, boxID) {
    "use strict";

    if(window.getComputedStyle(formContainer).display == 'none') {

        formContainer.style.display = "flex";
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

    var boxName = box.parentNode.previousElementSibling.textContent;

    if(window.getComputedStyle(formContainer).display == 'none') {

        box.parentNode.parentNode.parentNode.removeChild(box.parentNode.parentNode);

        const editButtons = document.querySelectorAll(".edit-name");

        for(let i = 0; i < editButtons.length; i++) {
            editButtons[i].setAttribute('id', `edit${i + 1}`);
        }

        deleteKey('randomChoice', boxName);
    }
}

formCancel.addEventListener('click', (event) => {
    event.preventDefault();

    formContainer.style.display = "none";
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
            if(!checkNames(nameInput.value)) {
                container.innerHTML += `<div class="box"><h3 class="box-title2">${nameInput.value}</h3><div class="buttons"><button class="edit-name" id="${newID}" onclick="createBox('edit', this.id)">Edit Name</button><button class="remove-box" onclick="removeBox(this)">Delete</button></div><button class="select" onclick="selectGen(this)">SELECT</button></div>`;

                addValue('randomChoice', nameInput.value);
            }
        }
        else {
            if(!checkNames(nameInput.value)) {
                const box = document.getElementById(boxID);

                var oldName = box.parentNode.previousElementSibling.textContent;
                var newName = nameInput.value;

                box.parentNode.previousElementSibling.textContent = nameInput.value;

                changeValue('randomChoice', oldName, newName);
            }
        }

        nameInput.value = "";
    }
}

function addValue(objName, keyName) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));

    if(obj != null) {
        var newObj = {}
        newObj.name = keyName;

        obj.push(newObj);

        localStorage.setItem(objName, JSON.stringify(obj));
    }
    else {
        var newArray = [];
        var newObj = {}
        newObj.name = keyName;

        newArray.push(newObj);

        localStorage.setItem(objName, JSON.stringify(newArray));
    }
}

function changeValue(objName, oldName, newName) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var objLength = obj.length;

    if(obj != null) {
        for(let i = 0; i < objLength; i++) {
            if(obj[i].name == oldName) {
                obj[i].name = newName;
                break;
            }
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }

}

function deleteKey(objName, valName) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var objLength = obj.length;

    if(obj != null) {
        for(let i = 0; i < objLength; i++) {
            if(obj[i].name == valName) {
                obj.splice(i, 1);
                break;
            }
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }
}

function checkNames(name) {
    const names = document.querySelectorAll(".box-title2");
    var namesLength = names.length;

    for(let i = 0; i < namesLength; i++) {
        if(names[i].textContent.toUpperCase() == name.toUpperCase()) {
            alert("There is already another generator with the same name, please choose a different one.");
            return true;
            break;
        }
    }

    return false;
}

function selectGen(pressedBtn) {
    var genName = pressedBtn.previousElementSibling.previousElementSibling.textContent;

    sessionStorage.setItem('actualGenName', genName);

    document.location.href = "../random-choice-template.html";
}

function clearItem(item) {
    localStorage.removeItem(item);
}

// randomChoice Object Model
/* var randomChoiceObj = [
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]},
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]},
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]}
]*/