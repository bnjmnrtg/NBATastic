$(document).ready(function(){
		var animals = ['Kobe Bryant', 'Michael Jordan', 'Tim Duncan','Eli Manning','Tom Brady','Derek Jeter'];
		
		
			function displayAnimalGiphy(){
				$('.giphy').empty();
				var animalClicked = $(this).html();
				var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
				// console.log("working");
				$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
					var data = response.data;
					console.log(response.data);
					for (var i = 0; i < data.length; i++) {
						console.log(data[i])
						var moving = data[i].images.original.url;
						var still = data[i].images.original_still.url;
						var $both = $('<div class="both">')
						var images = $('<img>');
						images.addClass("gifs");
						images.attr("src", moving);
						images.attr("data-still", still)
						images.attr("data-isAnimated", 'yes')
						images.attr("data-animated", moving)
						
					    var rating = response.data[i].rating;
						var h3 = $('<h3>').text("Rating: " + rating);
						$both.append(h3);
						$both.append(images);
						$('.giphy').append($both);

							
					} 	
					
				})

			}
			
			
			function showButton(){
				$('#buttonsView').empty();
				for (var i = 0; i < animals.length; i++) {
					console.log("my animals" + animals[i]);
					var $newButton = $('<button>');
					$newButton.addClass('animals');  
			    	$newButton.attr('data-name', animals[i]); 
			    	$newButton.text(animals[i]);
					$('#buttonsView').append($newButton);



				};

			};
			
		
		
		$('#addAnimals').on('click', function(search){
			console.log("animal adding works");
			var animal = $('#animal-input').val().trim();
			animals.push(animal);
			showButton();
			$('#animal-input').val("");

			return false;

		})

		showButton();
		$(document).on('click', '.animals', displayAnimalGiphy);

		$(document).on('click', '.gifs', function(){
			var stillUrl = $(this).attr('data-still');
			var animateUrl = $(this).attr('data-animated');
			var currentState = $(this).attr('data-isAnimated');
			console.log($(this).attr("data-still"));
			if(currentState === 'yes'){
				$(this).attr("src", stillUrl)
				$(this).attr('data-isAnimated', 'no')
			} else {
				$(this).attr("src", animateUrl)
				$(this).attr('data-isAnimated', 'yes')
			}
		})


});