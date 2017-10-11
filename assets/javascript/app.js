// Coding boot camp week 7 homework. Train timetable using Firebase.

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







// $("#submitButton").on("click", function(event) {


// 	event.preventDefault();

// 	$('.employeeRecord').empty();


//   employeeName = $("#employeeName").val().trim();
//   role = $("#role").val().trim();
//   startDate = $("#startDate").val();
//   monthlyRate = $("#monthlyRate").val();


//   // Figure out months worked

//   // monthsWorked = now - startDate;
//   // return month

//   // Total Billed
//   totalBilled = monthsWorked * monthlyRate;

//   //console.log(employeeName, role, startDate, monthsWorked, monthlyRate, totalBilled);

//   database.ref().push({
//     employeeName: employeeName,
//     role: role,
//     startDate: startDate,
//     monthsWorked: monthsWorked,
//     monthlyRate: monthlyRate,
//     totalBilled: totalBilled
//    });





// });