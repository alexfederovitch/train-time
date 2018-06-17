

var config = {
    apiKey: "AIzaSyAFzSbcmc621NzB8etSNWTcSYGKQ4_8ZII",
    authDomain: "train-time-ad0c6.firebaseapp.com",
    databaseURL: "https://train-time-ad0c6.firebaseio.com",
    projectId: "train-time-ad0c6",
    storageBucket: "train-time-ad0c6.appspot.com",
    messagingSenderId: "698695839381"
  };
  firebase.initializeApp(config);

  let fireTrain = firebase.database().ref();

$('#addButton').on('click', function(event){
    event.preventDefault();
    let train = $('#trainInput').val().trim();
    let destination = $('#destinationInput').val().trim();
    let firstTrain = $('#firstTrainInput').val().trim();
    let frequency = $('#frequencyInput').val().trim();
        fireTrain.push({
            trainName: train,
            trainDestination: destination,
            firstTrainTime: firstTrain,
            trainFrequency: frequency
        });
        console.log(train);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);
});

fireTrain.on('child_added', function(snap) {
    let train = snap.val().trainName;
    let destination = snap.val().trainDestination;
    let firstTrain = snap.val().firstTrainTime;
    let frequency = snap.val().trainFrequency;
    let nextArrival = moment().diff(moment(snap.val().firstTrainTime), 'minutes');
    // let minutesAway = frequency - nextArrival;
    // console.log(moment().format("DD/MM/YY hh:mm A"));
    // let minutesAway = nextArrival - firstTrain;
    console.log(nextArrival);
    // console.log(minutesAway);
    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    $('#trainTable').append(
        '<tr><td>' + train + '</td>' +
        '<td>' + destination + '</td>' +
        '<td>' + frequency + '</td>' +
        '<td>To be filled in later</td>' +
        '<td>To be filled in later</td></tr>'
    )
    }, function (errorObject) {
        console.log("The Read Failed", errorObject.code);
});