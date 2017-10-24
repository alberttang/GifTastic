
//declare variable of aniamls

var topics = ["cat", "dog", "bird", "sloth", "elephant", "tiger", "lion", "lizard", "bee", "hamster", "fish", "lobster"];

//create function to get giphy images and rating
function giphyInfo() {
        	//empty current images under the topic view div
            $("#topic-view").empty();
            //create var to grab the data-name attribute 
            var animal = $(this).attr("data-name");
            //create var for giphy query URL
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=omGXxw02LECg7thp3crCG9zdK1OLy36W&limit=10";

            //http call to giphy api    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                console.log(response);

                //create variable for an array of http response from giphy
                var results = response.data;

                //for loop to run through the results array and grab the images and rating and append them to the page

                for (var i = 0; i < results.length; i++) {

                	//create a div for each image to go in
                    var animalDiv = $("<div>");
                    // add inline class to the div so that images will sit inline
                    animalDiv.attr("class", "inline");
                    //create p element
                    var p = $("<p>");
                    // append rating text to our p element
                    p.text("Rating: " + results[i].rating);
                    // create img tag
                    var animalImage = $("<img>");
                    // add the fixed hight still URL as the src to our img
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    // add the data-state="still" attribute to our image
                    animalImage.attr("data-state", "still");
                    // added some classes to our image
                    animalImage.attr("class", "gif img-responsive img-thumbnail");
                    // add the data-animate attribute with the fixed_height_url as the value to use for our animate function
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    // add the data-still attribute with the fixed_height_still_url as the value to use for our animate function
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    //append our p tag with the rating to the animalDiv we made
                    animalDiv.append(p);
                    //append our img tag with the still image to our animalDiv
                    animalDiv.append(animalImage);
                    //prepend our animalDiv to the topic-view div
                    $("#topic-view").prepend(animalDiv);

                }
			});

        }
//create function to render buttons from our topics array
function renderButtons() {

            // Deletes the buttons prior to adding new topics
            // (this is necessary otherwise you will have repeat buttons)
            $("#buttons-view").empty();
            // Loops through the array of topics
            for (var i = 0; i < topics.length; i++) {

                // Then dynamicaly generates buttons for each topic in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adds a class of topics and bootstrap buttons to our button
                a.addClass("topics btn btn-warning");
                // Added a data-attribute
                a.attr("data-name", topics[i]);
                // Provided the initial button text
                a.text(topics[i]);
                // Added the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }

        // This function handles events where the submit button is clicked
        $("#add-topic").on("click", function(event) {
            event.preventDefault();

            //if statment to determine if the input field is blank
            if ($.trim($('#topic-input').val()) == '') {
            	//if the input field is blank alert that it can not be left blank
                alert('Input can not be left blank');
                //else create new buttons
            } else {

                // This line of code will grab the input from the textbox
                var topic = $("#topic-input").val().trim();

                // The topic from the textbox is then added to our array
                topics.push(topic);

                // Calling renderButtons which handles the processing of our topics array
                renderButtons();
                //clears the input form 
                $('#topic-input').val("");
            }

        });

        // Adding click event listeners to all elements with a class of "topics" to run the giphyInfo function
        $(document).on("click", ".topics", giphyInfo);

        //run initial renderButtons function to make the initial buttons
        renderButtons();

//create a function to animate the gifs
function animateGif() {
	//create variable to grab the data-state attribute of clicked element 		
    var state = $(this).attr("data-state");
    //console log the state for referencing 
    console.log(state);

    //if statment to animate if the image is still and to make still if image is animated

    if (state === "still") {
    	//if the image is still
    	//create var to grab data-animate URL

        var animateUrl = $(this).attr("data-animate");

        //change the data-state to animate

        $(this).attr("data-state", "animate");

        //change the src to the animateURL

        $(this).attr("src", animateUrl);

    } else if (state === "animate") {

    	//if the state is animate
    	// create var to grabe data-still URL

        var stillUrl = $(this).attr("data-still");

        //change the data-state attribute to still

        $(this).attr("data-state", "still");

        //change the img src to the stillURL

        $(this).attr("src", stillUrl);
    };
};

 // Adding click event listeners to all elements with a class of "gif" to run animateGif function

$(document).on("click", ".gif", animateGif);











