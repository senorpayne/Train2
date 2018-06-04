
$(document).ready(function(){
$('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_vvLmVGU6GEU2CZfIfz9rVdaz6USJ2bM",
    authDomain: "datamanagement-d06c7.firebaseapp.com",
    databaseURL: "https://datamanagement-d06c7.firebaseio.com",
    projectId: "datamanagement-d06c7",
    storageBucket: "datamanagement-d06c7.appspot.com",
    messagingSenderId: "625427069198"
  };
  firebase.initializeApp(config);
var dataRef = firebase.database();
var newTrainline = "";
$("#submit").on("click", function(event) {
  event.preventDefault();
 
var newTrainName = $("#train-name").val().trim();
var newDestination = $("#destination").val().trim();
var traintime=$("#firsttime").val().trim();
var frequency=$("#frequency").val().trim();

var newTrainlineTemp = {
                        train: newTrainName,
                  destination: newDestination,
                    traintime: traintime,
                    frequency: frequency
                        };

dataRef.ref().push(newTrainlineTemp);
//$("#traintable > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" + frequency + "</td><td>" +moment(nextTrain).format("hh:mm")+ "</td><td>"+tMinutesTillTrain+"</td></tr>");

$("#train-name").val('')
$("#destination").val('')
$("#firsttime").val('')
$("#frequency").val('')
});

dataRef.ref().on("child_added", function(childSnapshot) {
  var trainHolder = childSnapshot.val().train;
  var destinationHolder = childSnapshot.val().destination;
  var startTime = childSnapshot.val().traintime;
  var frequencyHolder = childSnapshot.val().frequency;
  var timeConverted = moment(startTime, "hh:mm").subtract(1, "years");
  var now = moment();
  var diffTime = moment().diff(moment(timeConverted), "minutes");
  var tRemainder = diffTime % frequencyHolder;
  var tMinutesTillTrain = frequencyHolder - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
$("#traintable > tbody").append("<tr><td>" + trainHolder + "</td><td>" + destinationHolder + "</td><td>" + frequencyHolder + "</td><td>" +moment(nextTrain).format("hh:mm")+ "</td><td>"+tMinutesTillTrain+"</td></tr>");

});

});

