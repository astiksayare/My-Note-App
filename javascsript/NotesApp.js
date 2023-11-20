console.log("Welcome to My Notes App");
showNotes();

// put note into the localStroge of console with the help of JavaScript;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

  let addTxt = document.getElementById('addTxt');
  let addTitle = document.getElementById('addTitle');

  let notes = localStorage.getItem('notes');

  // condition is adding text into localStorage;
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  

  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }

  noteObj.push(myObj);
  localStorage.setItem('notes', JSON.stringify(noteObj));
  addTxt.value = "";
  addTitle.value = "";
  // console.log(noteObj);
  showNotes();
});



// Function to show notes form localStroge to Your notes box;
function showNotes() {
  let notes = localStorage.getItem("notes");
  // Conditions;
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
          <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-primary">Delete Note</button>
              </div>
          </div> `;
  });
  let noteElement = document.getElementById('notes');

  if (noteObj.length == 0) {
    noteElement.innerHTML = `Nothing to show here! Use "Add a Note" section above to add some Notes.`;
  } else {
    noteElement.innerHTML = html;
  }

}

//For Deleting the note;
function deleteNote(index) {
  // console.log('I am deleting', index);
  let notes = localStorage.getItem("notes");

  // Condition;
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  noteObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(noteObj));
  showNotes();
}


//Searching words into the note;
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

        // console.log(cardTxt);
    });
});

