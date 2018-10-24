// short hand for $(document).ready(function() {...});
$(function(){

  // Initialize Firebase
//   make sure that your configuration matches your firebase script version
  var config = {
      apiKey: "AIzaSyAem3mnAMP-kboKu6QWGigRg0omzPdv48s",
      authDomain: "classwork-d65b3.firebaseapp.com",
      databaseURL: "https://classwork-d65b3.firebaseio.com",
      projectId: "classwork-d65b3",
      storageBucket: "classwork-d65b3.appspot.com",
      messagingSenderId: "1071417828250"
  };

  firebase.initializeApp(config);


  <script src="https://www.gstatic.com/firebasejs/5.5.4/firebase.js"></script>

  // Hold the db in a variable
  var db = firebase.database();
  // Reference Database
  var dbRef = db.ref();

//   use the below initalValue
// starting with a value of 100 (?)
var initalValue = 100;


// var clickCounter to keep track of how many clicks are made
var clickCounter = initalValue;

  // Get the elements
  // grabbing all of the user inputs
  var $tName = $('#name');
  var $tDest = $('#destination');
  var $tFirstTime = $('#firstTrainTime');
  var $tFreq = $('#frequency');
  var $submit = $('#formFill');
  var $tbody = $('tbody');
  let trainObj = {};

  // Functions
  var getValues = (e) => {
    // e is representing event
      e.preventDefault();
      // Time Calculation
      // First time (pushed back 1 year)
      // moment.js lets you parse, validate, manipulate, and display dates and times in JavaScript
      let firstTimeConverted = moment($tFirstTime.val(), "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);
      // Current Time
      let currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      // Difference between the times
      let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
      // Time apart (remainder)
      let tRemainder = diffTime % $tFreq.val();
      console.log(tRemainder);
      // Mins until train
      let tMinsTillTrain = $tFreq.val() - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinsTillTrain)
      // Next Train
      let nextTrain = moment(moment().add(tMinsTillTrain, "minutes")).format("MM/DD/YYYY");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("MM/DD/YYYY"));

      // logs everything to console
      console.log(currentTime);
      console.log(diffTime);
      console.log(tRemainder);
      console.log(tMinsTillTrain);
      console.log(tFreq);
      console.log(nextTrain);

      // Push values into an obj
      trainObj.tName = $tName.val();
      trainObj.tDest = $tDest.val();
      trainObj.tFreq = $tFreq.val();
      trainObj.tNextArr = nextTrain;
      trainObj.tMinsAway = tMinsTillTrain;

      // Clear inputs
      // shorthand for $("tName").val("");
      $tName.val('');
      $tDest.val('');
      $tFirstTime.val('');
      $tFreq.val('');

      // Put it into Firebase
      db.ref().push(trainObj);
  }

  // Listen for changes in the database
//   at the inital load and when the value changes, you will get a snapshot with the current data
// this callback keeps the page updated when we are changing a value in our firebase
// update your page in real-time when the firebase database changes
dbRef.ref().on("value", function(snapshot) {
      // Check what its being pushed to the Firebase DB
    //   we are inside the .on function
    // we are going to console.log the snapshot value (a point-in-time representation of the database and gets the most current values)
      console.log(snapshot.val());

    //   change the value of our clickCounter to match the value that is now in our database
    clickCOunter = snapshot.val().clickCount;

    // console.log the value of the clickCounter
    console.log(clickCounter);
    
      // Fill the table
      // group the body content in an HTML table
      // all of the information from the tbody element should be shown on the HTML page
      // var newRow = $("<tr>").append(
        // $("<td>").text(tName), etc
      $tbody.append(`
          <tr>
              <td>${snapshot.val().tName}</td>
              <td>${snapshot.val().tDest}</td>
              <td>${snapshot.val().tFreq}</td>
              <td>${snapshot.val().tNextArr}</td>
              <td>${snapshot.val().tMinsAway}</td>
          </tr>`);
  })

  // Event Listener
  // on click get all of the forms values
  $submit.on('click', getValues);

})

