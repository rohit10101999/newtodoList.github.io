var m1 = String(new Date().getMonth() + 1);
// console.log(currentMonth);

let m21 = m1;
const monthButtons = document.querySelectorAll(".btn-group .btn");

for (let button of monthButtons) {
    button.addEventListener('click', function () {
        m21 = parseInt(button.value);
        // console.log(button.value);
        snc1(m21);
    })
}


let arr = [];
let ntlr = [];

let lno = localStorage.getItem("notes");
let nlto = localStorage.getItem("notesTitle");

const abn = document.querySelector('#addBtn');
const abx = document.querySelector('#addTxt');
const abl = document.querySelector('#addTitle');
const plb = document.querySelector('#plusButton');
const nnpp = document.querySelector('.newNotePopup');
let xutx = "";




document.querySelector("#cancel").addEventListener('click', function () {
    nnpp.classList.toggle('appear');
});


//pending fix max length from input
abx.addEventListener('input', function (e) {
    let letter = e.data;
    console.log('change', letter);

    if (e.data != null) {
        if (xutx == null)
            xutx = letter.toString();
        else
            xutx = xutx + letter;

    }

    console.log(xutx);
});

abx.addEventListener('keydown', function (e) {
    let temp = e.data;
    console.log(e);

    if (e.key == "Enter") {
        xutx += "<br>";
    };
    console.log(xutx);
});


snc1(-1); //-1 = show all months   

let noteColor = "black";

plb.addEventListener('click', function () {
    noteColor = gnnc();
    nnpp.children[0].style.backgroundColor = noteColor;
    nnpp.classList.toggle('appear');
    // console.log(newNotePopup.children[0]);

    const temp1 = document.querySelector(".newNotePopup #changeColor");
    temp1.addEventListener('click', function () {
        noteColor = gnnc();
        nnpp.children[0].style.backgroundColor = noteColor;
    })

});

abn.addEventListener("click", function (e) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    

    abx.innerText = xutx;
    xutx = "";
    sync1();
    ntlr.push(abl.innerText + "<br>" + today + 
        m1.padStart(2, '0') +
        noteColor
    );
    arr.push(abx.innerText);

    localStorage.setItem("notes", JSON.stringify(arr));
    localStorage.setItem("notesTitle", JSON.stringify(ntlr));

    abl.innerText = "";
    abx.innerText = "";
    // console.log(localNotes);
    snc1(-1);

    nnpp.classList.toggle('appear');

})



// cancel button function
document.querySelector('#cancel').addEventListener('click', function () {
    // console.log('cancelled');
    // newNotePopup.style.display = 'none';
})


function sync1() {
    lno = localStorage.getItem("notes");
    nlto = localStorage.getItem("notesTitle");

    if (nlto == null) {
        ntlr = [];
    } else {
        ntlr = JSON.parse(nlto);
    }

    if (lno == null) {
        // console.log("null localnotes");
        arr = [];
    } else {
        arr = JSON.parse(lno);
    }
    // console.log(localNotesTitle + "##" + notesArray);

}

//function to show notes
function snc1(whichMonthToDisplay) {
    sync1();

    let html = "";


    arr.forEach(function (element, index) {
        let currentTitle = ntlr[index];
        let l = currentTitle.length;
        let currentNoteColor = currentTitle.substring(l - 16, l);
        let currentNoteMonth = parseInt(currentTitle.substring(l - 18, l - 16));
        // console.log("current note month and color=", currentNoteMonth + " " + currentNoteColor);

        if (whichMonthToDisplay === currentNoteMonth || whichMonthToDisplay == -1) {
            // console.log("success");
            currentTitle = currentTitle.substring(0, l - 18).toUpperCase();
            let noteTitleDisplay = "";

            if (currentTitle != "") {
                noteTitleDisplay = `${currentTitle}`
            } else {
                noteTitleDisplay = `Task  ${index + 1}`
            }


            html += `<div id="cardIndex${index}" class="card my-2 mx-2 noteCard" style="background-color:${currentNoteColor};">
        
            <div class="card-body">
                <h5 class="card-title">${noteTitleDisplay}</h5>
                <p class="card-text" contenteditable>${element}</p>

                    <button id="${index}" onclick="del(this.id)" class="btn btn-light deleteNoteCard"></button>
                    <button id="changeColor" onClick="calcu(${index})" class="btn btn-light"></button>
            </div>
            </div>`;
        }


    })

    let notesElem = document.querySelector("#notesContainer");
    if (arr.length != 0 ||
        ntlr.length != 0
    ) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = "Nothing to show!";
    }


}


// function to delete a note
function del(index) {
    // console.log("i am deleting", index);

    sync1();

    ntlr.splice(index, 1);
    arr.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(arr));
    localStorage.setItem("notesTitle", JSON.stringify(ntlr));
    snc1(-1);
}


let ss = document.querySelector('#searchTxt');
sync1();

ss.addEventListener('input', function () {
    let inputVal = ss.value.toLowerCase();

    const noteCards = document.querySelectorAll(".noteCard");
    const noteCardTitles = document.querySelectorAll(".noteCard .card-title");

    let i = 0;
    for (let card of noteCards) {
        const cardTxt = card.querySelector(".card-text");
        const cardTitle = noteCardTitles[i];
        // console.log(cardTitle);
        i++;
        if (cardTxt.innerText.includes(inputVal) ||
            cardTitle.innerText.includes(inputVal))
            card.style.display = "block";
        else
            card.style.display = "none";
    }
})


const calcu = function (index) {
    // console.log('index=', index);
    const card = document.querySelector(`#cardIndex${index}`);

    const newColor = gnnc();

    card.style.backgroundColor = newColor;
    // console.log('oldTitle', notesTitleArray[index]);
    ntlr[index] = ntlr[index].substring(0, ntlr[index].length - 16) + newColor;
    localStorage.setItem("notesTitle", JSON.stringify(ntlr));

    // console.log('newTitle', notesTitleArray[index]);

}


const gnnc = function () {
    let max = 255;
    let min = 120;
    const r = (Math.floor(Math.random() * (max - min) + min).toString().padStart(3, '0'));
    const g = (Math.floor(Math.random() * (max - min) + min).toString().padStart(3, '0'));
    const b = (Math.floor(Math.random() * (max - min) + min).toString().padStart(3, '0'));
    const newColor = `rgb(${r},${g},${b})`;
    // console.log(newColor);
    return newColor;
}