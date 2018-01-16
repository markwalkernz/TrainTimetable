// Train timetable using Firebase.

// initialise database
var database = firebase.database();

// submit button click
$("#submitButton").on("click", function(event) {
	
	// prevent submit button from default behaviour
	event.preventDefault();

	// get variables from input boxes
	var inputName = $("#inputName").val().trim();
	var inputDestination = $("#inputDestination").val().trim();
	var inputTime = $("#inputTime").val().trim();
	var inputFrequency = $("#inputFrequency").val().trim();

	// enter data into firebase
	database.ref().push({
	 	trainName: inputName,
	 	trainDestination: inputDestination,
	 	trainTime: inputTime,
	 	trainFrequency: inputFrequency
	});

}); // end of submit button click



// write from firebase to train schedule when there is a new record submitted
// also runs when the page is first opened

database.ref().on("value", function(snapshot) {

	// clear the train schedule
	$("#tableBody").empty();

	// repeats for each record in firebase
 	snapshot.forEach(function(childSnapshot){
 		trainName = childSnapshot.val().trainName;
	    trainDestination = childSnapshot.val().trainDestination;
	    trainTime = childSnapshot.val().trainTime;
	    trainFrequency = childSnapshot.val().trainFrequency;

		var convertedTime = moment(trainTime, "kk:mm", true);

		var timeSinceFirst = moment().diff(convertedTime, "minutes");

		var minutesAway = trainFrequency - (timeSinceFirst % trainFrequency);

		var nextArrival = moment().add(minutesAway, "minutes").format("kk:mm");

		$("#tableBody").append("<tr class='trainRecord'><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

	});
});


