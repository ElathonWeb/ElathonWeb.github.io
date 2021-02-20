const datetime = document.querySelector(".datetime");
const numCont = document.getElementById("num-container");
const dupCheckbox = document.getElementById("duplicates-check");

var duplicates = [];
var globalCount = 0;

window.onload = () => {
    const pageHeadName = document.getElementById("name-title");
    const boxesContainer = document.querySelector(".names-list-container").childNodes[1];

    const obj = JSON.parse(localStorage.getItem('randomChoice'));
    var actualGenName = sessionStorage.getItem('actualGenName');

    if(actualGenName != null) {
        pageHeadName.textContent = actualGenName;

        const index = findIndex();
        if(obj[index].gen != null) var objLength = obj[index].gen.length;

        if("gen" in obj[index]) {
            if(obj[index].gen.length > 0) {
                for(let i = 0; i < objLength; i++) {
                    boxesContainer.innerHTML += `<li class="choice-box row-disp"><div class="box-info row-disp"><div class="box-id" id="box${i + 1}">${i + 1}</div><div class="box-name" id="name${i + 1}">${obj[index].gen[i].boxName}</div></div><div class="box-buttons row-disp"><button class="tick-btn" onclick="changeCanGen('no', this)"><i class="fas fa-check fa-2x"></i></button><button class="times-btn" onclick="changeCanGen('yes', this)"><i class="fas fa-times fa-2x"></i></button><button class="edit-btn" onclick="createFormBox(this)"><i class="fas fa-edit fa-2x"></i></button><button class="del-btn" onclick="removeBox(this)"><i class="fas fa-trash-alt fa-2x"></i></button></div></li>`;

                    boxId = "box" + (i + 1).toString();
                    const tickBtn = document.getElementById(boxId).parentNode.nextElementSibling.childNodes[0];

                    if(obj[index].gen[i].tickStatus == false) {
                        var changeToBtn = tickBtn.nextElementSibling;
            
                        tickBtn.style.display = 'none';
                        changeToBtn.style.display = 'block';
                    }
                }
            }
        }

        sessionStorage.removeItem('actualGenName');
    }
    else {
        document.location.replace("../random-choice.html");
    }
}

/*--------------------------------------- Data Save --------------------------------*/

function addBoxToObj(objName, name) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var index = findIndex();

    if(obj != null) {

        if(!("gen" in obj[index])) {
            obj[index].gen = [];
            var newObj = {};
            newObj.boxName = name;
            newObj.tickStatus = true;

            obj[index].gen.push(newObj);
        }
        else {
            var newObj = {};
            newObj.boxName = name;
            newObj.tickStatus = true;

            obj[index].gen.push(newObj);
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }
}

function deleteObj(objName, valName) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var index = findIndex();
    var objLength = obj[index].gen.length;

    if(obj != null) {
        for(var i = 0; i < objLength; i++) {
            if(obj[index].gen[i].boxName == valName) {
                obj[index].gen.splice(i, 1);
                break;
            }
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }
}

function changeValue(objName, oldName, newName) {
    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var index = findIndex();
    var objLength = obj[index].gen.length;

    if(obj != null) {
        for(let i = 0; i < objLength; i++) {
            if(obj[index].gen[i].boxName == oldName) {
                obj[index].gen[i].boxName = newName;
                break;
            }
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }
}

function changeTickStatus(objName, name, status) {

    "use strict";

    var obj = JSON.parse(localStorage.getItem(objName));
    var index = findIndex();
    var objLength = obj[index].gen.length;

    if(obj != null) {
        for(let i = 0; i < objLength; i++) {
            if(obj[index].gen[i].boxName == name) {
                obj[index].gen[i].tickStatus = status;
                break;
            }
        }

        localStorage.setItem(objName, JSON.stringify(obj));
    }
}

function findIndex() {
    "use strict";

    const headName = document.getElementById("name-title");
    var obj = JSON.parse(localStorage.getItem('randomChoice'));
    var objLength = obj.length;

    if(obj != null) {
        for(var i = 0; i < objLength; i++) {
            if(obj[i].name == headName.textContent) {
                return i;
            }
        }
    }
}

// randomChoice Object Model
/* var randomChoiceObj = [
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]},
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]},
    {name: ...., gen: [{boxName: ...., tickStat: ....}, {boxName: ...., tickStat: ....}]}
]*/

/*------------------------------------------ BOX -----------------------------------*/
function orderBoxID() {
    "use strict";

    var boxesID = document.querySelectorAll(".box-id");
    var namesID = document.querySelectorAll(".box-name");

    for(let i = 0; i < boxesID.length; i++) {
        boxesID[i].setAttribute('id', 'box' + (i + 1));
        boxesID[i].textContent = (i + 1).toString();

        namesID[i].setAttribute('id', 'name' + (i + 1));
    }
}

function addBox(pressedBtn) {
    "use strict";

    var inputValue = pressedBtn.previousElementSibling;

    const numOfForm = document.querySelectorAll(".create-new-form").length;

    if(numOfForm == 0) {
        if(inputValue.value.length > 0 && inputValue.value.length < 17) {

            if(!checkName(inputValue.value)) {
                const numOfBox = document.querySelectorAll(".box-id");
                var boxesContainer = document.querySelector(".names-list-container").childNodes[1];

                boxesContainer.innerHTML += `<li class="choice-box row-disp"><div class="box-info row-disp"><div class="box-id" id="box${numOfBox.length + 1}">${numOfBox.length + 1}</div><div class="box-name" id="name${numOfBox.length + 1}">${inputValue.value}</div></div><div class="box-buttons row-disp"><button class="tick-btn" onclick="changeCanGen('no', this)"><i class="fas fa-check fa-2x"></i></button><button class="times-btn" onclick="changeCanGen('yes', this)"><i class="fas fa-times fa-2x"></i></button><button class="edit-btn" onclick="createFormBox(this)"><i class="fas fa-edit fa-2x"></i></button><button class="del-btn" onclick="removeBox(this)"><i class="fas fa-trash-alt fa-2x"></i></button></div></li>`;

                addBoxToObj('randomChoice', inputValue.value);

                inputValue.value = "";
            }
            else {
                alert("A box with the same name is already present. Please choose another name and try again!");
            }
        }
    }
}

function checkName(name) {
    const names = document.querySelectorAll(".box-name");

    for(let i = 0; i < names.length; i++) {
        if(names[i].textContent.toUpperCase() == name.toUpperCase()) {
            return true;
        }
    }

    return false;
}

/*------------------------------------------ FORM -----------------------------------*/

function createFormBox(pressedBtn) {
    "use strict";

    const numOfForm = document.querySelectorAll(".create-new-form").length;

    if(numOfForm == 0) {
        const boxNameID = pressedBtn.parentNode.previousElementSibling.childNodes[1].id;
        pressedBtn.parentNode.parentNode.innerHTML += `<form method="GET" class="create-new-form"><div><label for="name-input" class="name-input-label">Write the name of the Box *</label><input type="text" name="name-input" id="name-input" required></div><div class="selections"><div><button name="form-done" class="form-done" id="box-${boxNameID}"onclick="editName(event, this)"><i class="fas fa-check"></i><span>Done</span></button></div><div><button type="button" name="form-cancel" id="form-cancel" onclick="formCancel(this)"><i class="fas fa-times"></i><span>Cancel</span></button></div></div></form>`

        const form = document.querySelector(".create-new-form")

        form.scrollIntoView({block: "center"});
    }
}

function formCancel(pressedBtn) {
    formBox = pressedBtn.parentNode.parentNode.parentNode;
    formBox.parentNode.removeChild(formBox);
}

/*------------------------------------------ BOX OPTIONS -----------------------------------*/

function changeCanGen(type, button) {
    "use strict";

    const numOfForm = document.querySelectorAll(".create-new-form").length;
    const name = button.parentNode.previousElementSibling.childNodes[1].textContent;

    if(numOfForm == 0) {
        if(type == 'no') {
            var changeToBtn = button.nextElementSibling;

            button.style.display = 'none';
            changeToBtn.style.display = 'block';

            changeTickStatus('randomChoice', name, false);
        }
        else {
            var changeToBtn = button.previousElementSibling;

            button.style.display = 'none';
            changeToBtn.style.display = 'block';

            changeTickStatus('randomChoice', name, true);
        }
    }
}

function editName(event, pressedBtn) {
    "use strict";

    event.preventDefault();

    var input = document.getElementById('name-input').value;

    if(input.length > 0 && input.length < 17) {
        if(!checkName(input)) {
            var name = pressedBtn.id.split('-')[1];
            var nameID = document.getElementById(name);

            changeValue('randomChoice', nameID.textContent, input);

            nameID.textContent = input;

            formCancel(pressedBtn.parentNode.nextElementSibling.childNodes[0]);
        }
        else {
            alert("A box with the same name is already present. Please choose another name and try again!");
        }
    }
}

function removeBox(box) {
    "use strict";

    const numOfForm = document.querySelectorAll(".create-new-form").length;

    if(numOfForm == 0) {
        box.parentNode.parentNode.parentNode.removeChild(box.parentNode.parentNode);

        deleteObj('randomChoice', box.parentNode.previousElementSibling.childNodes[1].textContent);

        orderBoxID();
    }
}

/*------------------------------------------ GENERATOR -----------------------------------*/

function startGeneration() {
    "use strict";

    const numOfForm = document.querySelectorAll(".create-new-form").length;
    const numOfTickClass = document.querySelectorAll(".tick-btn");
    var numOfTickClassDisplayed = 0;

    if(numOfForm == 0) {

        const numOfGenerations = document.getElementById("amount-generations-input");
        const numOfGroups = document.getElementById("group-input");

        for(let i = 0; i < numOfTickClass.length; i ++) {
            if(numOfTickClass[i].style.display != 'none') {
                numOfTickClassDisplayed += 1;
            }
        }

        if(numOfGenerations.checkValidity() && numOfGroups.checkValidity() && numOfTickClassDisplayed > 0 && !(parseInt(numOfGenerations.value) > numOfTickClassDisplayed && !dupCheckbox.checked)) {
            if(parseInt(numOfGenerations.value) < 1) {
                numOfGenerations.value = 1;
            }
            else if(parseInt(numOfGenerations.value) > 1000) {
                numOfGenerations.value = 1000;
            }

            if(parseInt(numOfGroups.value) > parseInt(numOfGenerations.value)) {
                numOfGroups.value = numOfGenerations.value;
            }
            else if(parseInt(numOfGroups.value) < 1) {
                numOfGroups.value = 1;
            }

            numCont.innerHTML = '';
            datetime.innerHTML = '';

            var generations = Math.abs(parseInt(numOfGenerations.value));
            var groups = Math.abs(parseInt(numOfGroups.value));
            var groupCount = 0;

            var numsPerGroup = Math.floor(generations / groups);
            var numsPerGroupRemainder = generations % groups;
            var remainderArray = [];

            while (numsPerGroupRemainder > 0) {

                if (remainderArray.length == 0) 
                    remainderArray.push(Math.floor(numsPerGroupRemainder / groups));
                else
                    remainderArray.push(Math.ceil(numsPerGroupRemainder / groups));

                numsPerGroupRemainder -= remainderArray[remainderArray.length - 1];
                
            }
            
            while (groupCount < groups) {

                generate_group(groupCount, groups, remainderArray, numsPerGroup);

                datetime.innerHTML = '';
                var today = new Date();
                const datetimeText = document.createElement("span");
                datetimeText.innerText = 'Generation of: ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' - ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                datetime.appendChild(datetimeText);

                numCont.scrollIntoView();
        
                groupCount += 1;
        
            }
        
            duplicates = [];
            globalCount = 0;

        }
        else {
            numCont.innerHTML = '';

            const errorDiv = document.createElement("div");
            errorDiv.classList.add("group");

            const errorSpan = document.createElement("span");
            errorSpan.classList.add("num");

            if(numOfTickClassDisplayed == 0) {
                errorSpan.innerText = "Error, There is no element to generate";
            }
            else if(parseInt(numOfGenerations.value) > numOfTickClassDisplayed) {
                errorSpan.innerText = "Error, Too many generations to do with the duplicates box not checked";
            }
            else {
                errorSpan.innerText = "Error, check the input";
            }

            numCont.appendChild(errorDiv);
            errorDiv.appendChild(errorSpan);

            errorSpan.scrollIntoView({block: "center"});
        }
    }
}

function generate_group(group, groups, remainderArray, namesPerGroup) {
    "use strict";

    var counter = 0;

    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group")

    if (remainderArray.length != 0) {

        if (group >= (groups - remainderArray.length)) {

            namesPerGroup += remainderArray[globalCount];
            globalCount += 1;
            
        }
    }

    while (counter < namesPerGroup) {

        const numSpan = document.createElement("span");
        numSpan.classList.add("num");

        var run = true;
        do {
            var boxesCount = document.querySelectorAll(".box-id");

            var randomNum = Math.round((Math.random() * (boxesCount.length - 1) + 1));

            var boxNameID = "name" + (randomNum).toString();

            var boxNamePath = document.getElementById(boxNameID);
            var canBeGenerated = boxNamePath.parentNode.nextElementSibling.childNodes[0];
            var generatedName = boxNamePath.textContent;

            var displayStyle = window.getComputedStyle(canBeGenerated);

            if(displayStyle.getPropertyValue('display') != 'none') {
                if(dupCheckbox.checked) {
                    run = false;
                }
                else if (!duplicates.includes(generatedName)) {
                    duplicates.push(generatedName);
                    run = false;
                }
            }

        } while (run);

        numSpan.innerText = generatedName;

        groupDiv.appendChild(numSpan);

        counter += 1;
        
    }

    numCont.appendChild(groupDiv);

}