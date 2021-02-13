console.log("This is Index.Js");
//Constructors
function Movie(name, actor, type) {
  this.name = name;
  this.actor = actor;
  this.type = type;
}

//Display Constructors
function Display() {

}

//Add methods to display prototype
Display.prototype.add = function (movie) {
  console.log("Adding to UI");
  let tableBody = document.getElementById('tableBody');

  let uiString = `<tr>
                        <td>${movie.name}</td>
                        <td>${movie.actor}</td>
                        <td>${movie.type}</td>
                    </tr>`;

  tableBody.innerHTML += uiString;
}

//Implementing clear form input boxes to reset form.
Display.prototype.clear = function () {
  let libraryForm = document.getElementById('libraryForm');
  libraryForm.reset();
}

//Implementing the validate function
Display.prototype.validate = function (movie) {
  if (movie.name.length < 2 || movie.actor.length < 2) {
    return false;
  } else {
   return true;
  }
}

//
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById('message');
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message :</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                      </div>`;

  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
}

//Add Submit Event Listener to form libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("You have submitted libraryForm");

  let name = document.getElementById('movieName').value;
  let actor = document.getElementById('actor').value;

  let action = document.getElementById('action');
  let drama = document.getElementById('drama');
  let horror = document.getElementById('horror');

  let type;
  if (action.checked) {
    type = action.value;
  } else if (drama.checked) {
    type = drama.value;
  } else if (horror.checked) {
    type = horror.value;
  }

  let movie = new Movie(name, actor, type);
  console.log(movie);

  let display = new Display();

  if (display.validate(movie)) {
    display.add(movie);
    display.clear();
    display.show('success', 'Your movie succesfully added');
  } 
  else {
    //Shows error to user
    display.show(
      'danger',
      'Sorry not allowed please check Name and Actor fields'
    );
  }
  e.preventDefault();
}
