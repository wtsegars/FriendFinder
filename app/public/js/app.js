function surveyQuestions1 () {
    let q1 = "I would consider myself to be an introvert.";
    let q2 = "I would say that I am outgoing as a person.";
    let q3 = "I prefer to be alone most of the time.";
    let q4 = "I try to be organized in my day-to-day life.";
    let q5 = "I see the world as an evil place with bad people.";
    let q6 = "I try to see the good in everything.";
    let q7 = "I am very trusing of other people.";
    let q8 = "I like it when I am the center of attention.";
    let q9 = "Others would describe me as being 'needy'.";
    let q10 = "It is easy for me to make friends.";
    let questionArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    return questionArray;
};

function surveyQuestions2 () {
    let altQ1 = "Which of these faces describes how I feel most of the time.";
    let altQ2 = "Which of these alignments would you consider yourself to be?(Use the picture below for guidance)";
    let altQuestionArray = [altQ1, altQ2];
    return altQuestionArray;
};

const questions = surveyQuestions1();
const altQuestions = surveyQuestions2();

for (let i = 0; i < questions.length; i++) {
    $('#surveyLocation').append('<h3>' + (i+1) + '</h3>' + '<h4>' + questions[i] + '</h4>' + '<select class="choosen-select" id=' + (i+1) + '>' + '<option class="form-check-option radio-button" type="radio" value="1">1</option>' + '<option class="form-check-option radio-button" type="radio" value="2">2</option>' + '<option class="form-check-option radio-button" type="radio" value="3">3</option>' + '<option class="form-check-option radio-button" type="radio" value="4">4</option>' + '<option class="form-check-option radio-button" type="radio" value="5">5</option>' + '</select>');
};

for (let i = 0; i < 1; i++) {
    
        //$('#surveyLocation').append('<h3>' + (i+11) + '</h3>' + '<h4>' + altQuestions[0] + '</h4>' + '<div class="form-check"><option class="form-check-option radio-button" type="radio" value="option1" id=' + (i+11) + '>' + '<label class="form-check-label" for=' + (i+11) + '><img src="images/veryhappy.jpg></label></div><div class="form-check"><option class="form-check-option radio-button" type="radio" value="option2" id=' + (i+11) + '>' + '<label class="form-check-label" for=' + (i+11) + '><img src="images/happy.jpg></label></div><div class="form-check"><option class="form-check-option radio-button" type="radio" value="option3" id=' + (i+11) + '>' + '<label class="form-check-label" for=' + (i+11) + '><img src="images/normal.jpg></label></div><div class="form-check"><option class="form-check-option radio-button" type="radio" value="option4" id=' + (i+11) + '>' + '<label class="form-check-label" for=' + (i+11) + '><img src="images/sad.jpg></label></div><div class="form-check"><option class="form-check-option radio-button" type="radio" value="option5" id=' + (i+11) + '>' + '<label class="form-check-label" for=' + (i+11) + '><img src="images/verysad.jpg></label>' + '</div>');
    
    
        $('#surveyLocation').append('<h3>' + (i+11) + '</h3>' + '<h4>' + altQuestions[1] + '</h4>' + '<img src="images/IMG_0995.png">' + '<select class="choosen-select" id=' + (i+11) + '>' + '<option class="form-check-option" type="radio" value="1">Lawful Good</option>' + '<option class="form-check-option" type="radio" value="2">Neutral Good</option>' + '<option class="form-check-option" type="radio" value="3">Choatic Good</option>' + '<option class="form-check-option" type="radio" value="4">Lawful Neutral</option>' + '<option class="form-check-option" type="radio" value="5">True Neutral</option>' + '<option class="form-check-option" type="radio" value="6">Chaotic Neutral</option>' + '<option class="form-check-option" type="radio" value="7">Lawful Evil</option>' + '<option class="form-check-option" type="radio" value="8">Neutral Evil</option>' + '<option class="form-check-option" type="radio" value="9">Chaotic Evil</option>' + '</select>');
    
};

$('#surveyLocation').append('<button type="submit" data-toggle="modal" data-target="#myModal" class="btn btn-primary" id="submitButton">Submit</button>');

const config = {
	".chosen-select": {},
	".chosen-select-deselect": {
		allow_single_deselect: true
	},
	".chosen-select-no-single": {
		disable_search_threshold: 10
	},
	".chosen-select-no-results": {
		no_results_text: "Oops, nothing found!"
	},
	".chosen-select-width": {
		width: "95%"
	}
};

$('#submitButton').on("click", function(event) {
    event.preventDefault();

    function userValidation() {
        let valid = true;

        if ($('#name').val() === "") {
            valid == false;
        }
        if ($('#image').val() === "") {
            valid == false;
        }
        if ($('#image').val().charAt(4) !== ":" && $('#image').val().charAt(5) !== ":") {
            valid == false;
        }

        $('.choosen-select').each( function() {
            if ($(this).val() === "") {
                valid == false;
            }
        });

        return valid;
    }

    if (userValidation()) {

        let formResults = {
            "name": $("#name").val().trim(),
            "photo": $("#image").val().trim(),
            "answers": [
                parseInt($("#1").val()),
                parseInt($("#2").val()),
                parseInt($("#3").val()),
                parseInt($("#4").val()),
                parseInt($("#5").val()),
                parseInt($("#6").val()),
                parseInt($("#7").val()),
                parseInt($("#8").val()),
                parseInt($("#9").val()),
                parseInt($("#10").val()),
                parseInt($("#11").val()),

            ]
        };

        $.post("/api/friends", formResults, function(data) {
            $("#friendNameDiv").html("<h2>" + data.name + "</h2>");
            $("#friendImg").attr("src", data.photo);
            //$("#myModal").modal("toggle");
        });
    }
    else {
        alert("It appears that you have missed a question. Go back and make sure all questions are answered properly.");
    }
});
