$(function(){

  // Initialize Firebase
  const config = {
      apiKey: "AIzaSyCn6bxidmbH6601u0islr5_xyteVr41dLI",
      authDomain: "codersay-53fd9.firebaseapp.com",
      databaseURL: "https://codersay-53fd9.firebaseio.com",
      projectId: "codersay-53fd9",
      storageBucket: "codersay-53fd9.appspot.com",
      messagingSenderId: "878808016417"
  };
  firebase.initializeApp(config);

  // Hold the db in a variable
  const db = firebase.database();
  // Reference Database
  const dbRef = db.ref();

  // Get the elements
  const $tName = $('#name');
  const $tDest = $('#destination');
  const $tFirstTime = $('#firstTrainTime');
  const $tFreq = $('#frequency');
  const $submit = $('#formFill');
  const $tbody = $('tbody');
  let trainObj = {};

  // Functions
  const getValues = (e) => {
      e.preventDefault();
      // Time Calculation
      // First time (pushed back 1 year)
      let firstTimeConverted = moment($tFirstTime.val(), "hh:mm").subtract(1, "years");
      // Current Time
      let currentTime = moment();
      // Difference between the times
      let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // Time apart (remainder)
      let tRemainder = diffTime % $tFreq.val();
      // Mins until train
      let tMinsTillTrain = $tFreq.val() - tRemainder;
      // Next Train
      let nextTrain = moment(moment().add(tMinsTillTrain, "minutes")).format("hh:mm");

      // Push values into an obj
      trainObj.tName = $tName.val();
      trainObj.tDest = $tDest.val();
      trainObj.tFreq = $tFreq.val();
      trainObj.tNextArr = nextTrain;
      trainObj.tMinsAway = tMinsTillTrain;

      // Clear inputs
      $tName.val('');
      $tDest.val('');
      $tFirstTime.val('');
      $tFreq.val('');

      // Put it into Firebase
      db.ref().push(trainObj);
  }

  // Listen for changes in the database
  dbRef.on('child_added', (snapshot) => {
      // Check what its being pushed to the Firebase DB
      console.log(snapshot.val());
      // Fill the table
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
  $submit.on('click', getValues);

})