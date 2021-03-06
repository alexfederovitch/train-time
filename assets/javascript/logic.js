

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
    let firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, 'years').format('x');  
    let frequency = $('#frequencyInput').val().trim();
        fireTrain.push({
            trainName: train,
            trainDestination: destination,
            firstTrainTime: firstTrain,
            trainFrequency: frequency
        });
        // console.log(train);
        // console.log(destination);
        // console.log(firstTrain);
        // console.log(frequency);
    $('#trainInput').val("");
    $('#destinationInput').val('');
    $('#firstTrainInput').val('');
    $('#frequencyInput').val('');
});

fireTrain.on('child_added', function(snap) {
    let train = snap.val().trainName;
    let destination = snap.val().trainDestination;
    let firstTrain = snap.val().firstTrainTime;
    let frequency = snap.val().trainFrequency;
    let r  = moment().diff(moment.unix(firstTrain), 'minutes')%frequency;
    let minutesAway = frequency - r;
    let nextArrival = moment().add(minutesAway, 'm').format('hh:mm A')

    // let nextArrival = moment().diff(moment(firstTrain), 'minutes');
    // let timeTest = moment(firstTrain, 'HH:mm').subtract(1, 'years');
    // let minutesAway = frequency - nextArrival;
    // console.log(moment().format("DD/MM/YY hh:mm A"));
    // let minutesAway = nextArrival - firstTrain;
    console.log(nextArrival);
    console.log(minutesAway);
    // console.log(timeTest);
    // console.log(minutesAway);
    // console.log(train);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);
    $('#trainTable').append(
        '<tr><td>' + train + '</td>' +
        '<td>' + destination + '</td>' +
        '<td>' + frequency + '</td>' +
        '<td>' + nextArrival + '</td>' +
        '<td>' + minutesAway + '</td></tr>'
    )
    }, function (errorObject) {
        console.log("The Read Failed", errorObject.code);
});