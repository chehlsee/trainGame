$(document).ready(function () {
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

  // create a variale to reference the database service
  var database = firebase.database();

  // define each user input with an empty string 
  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";

  // when the submit button is pressed the following function will run

  $(submit - button).on("click", function (event) {
    // method stops the default action of an element from happening. for example: prevent a submit button from submitting a form or prevent a link from following the URL
    event.preventDefault();

    // grab the var values from the form text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // this code will push the information to HTML
    database.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    });

    // after the user data is submitted empty all of the form text boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

    // make sure firebase is connected a load
    database.ref().on("child_added", function (childSnapshot) {

      // log everything that is being input on the form
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);

      // all infomration submitted on form will be put into the table variables 
      var trainNameTable = childSnapshot.val().trainName;
      var destinationTable = childSnapshot.val().destination;
      var frequencyTable = childSnapshot.val().frequency;
      var nextArrivalTable = childSnapshot.val().nextArrival;

      // apply trainTime to the time with the format of hh:mm and then you will subtract one year time
      var firstTrainTime = moment(nextArrivalTable, "hh:mm").subtract(1, "years");
      // after you subtract 1 year then apply the current time to the current variable
      var currentTime = moment();
      // next you are going to convert the variable for firstTrainTime to minutes
      var diffTime = moment().diff(moment(firstTrainTime), "minutes");
      // get the remainder time left between the diffTime and frequencyTable
      var tRemainder = diffTime % frequencyTable;
      // subtract the tRemainder from frequencyTable
      var minutesTillNextTrain = frequencyTable - tRemainder;
      var nextTrain = moment().add(minutesTillNextTrain, "minutes");
      var nextTrainInformation = moment(nextTrain).format("hh:mm");

      // all of the items in the list apply them to the table
      $("#train-table").append("<tr><td>" +
        trainNameTable + "</td>>td>" +
        destinationTable + "</td>>td>" +
        frequencyTable + "</td>>td>" +
        nextTrainInformation + "</td>>td>" +
        minutesTillNextTrain + "</td>>td>"
      );

    });

  });







});