var producer;
var director;
var description;
var score;
var title;

// access the root div in index.html
const app = document.getElementById('movie');

// create a container as a div in the html
const container = document.createElement('div');
container.style.backgroundColor = "#fcf3cf"; 
container.setAttribute('class', 'container');

// place the container on the website
app.appendChild(container);

// create a card as a div (this is a container for the information)
const card = document.createElement('div');
card.setAttribute('class', 'card');

// create a heading for the movie title
const h1 = document.createElement('h1');
h1.setAttribute('class','movie-title')

// create the heart-shaped button
const button = document.createElement("button")
button.setAttribute('class','button button-like')
const buttoni = document.createElement('i');
buttoni.setAttribute('class','fa fa-heart');
button.appendChild(buttoni);
// when the button is clicked fill it in and reveal the description
button.onclick = function() { $(".button-like").toggleClass("liked"); 
                              if ($(".button-like").hasClass("liked")){
                                $("#description").show(1000);
                                $("#description").css("opacity", "0");
                                $("#description").animate({opacity: 1}, 900); 
                                $(document).attr("title", title);
                              }
                              else{
                                $("#description").hide(1000);
                             }
                            }

// container for description text
const div = document.createElement('div');
div.setAttribute('id','description');

// create text display for the information (producer rating director)
const divInfo = document.createElement('div');
divInfo.setAttribute('class', 'information');

// create text display for paragraph information
const pDescription = document.createElement('p');

// Calling the API
function generateMovie() {
    var something = "";
    var s2 = "";
  // fetch JSON data from the API
    var url = "https://ghibliapi.herokuapp.com/films"
    return fetch(url, {
        headers: {
            Accept: "application/json",
        },
        method: 'GET', // defines the method
    }).then(resp => {
        return resp.json();
    }).then(r => {
        $(".button-like").toggleClass("liked",false); 
        var index = Math.floor(Math.random()*(r.length));
        var movie = r[index];
        create(movie);
    })
}

// populating the information and description text displays
function create(movie){

  h1.innerHTML = ` ${movie.title}  (${movie.release_date}) &nbsp`;
  container.appendChild(card);
  card.appendChild(h1);
  h1.appendChild(button);
  $(".movie-title").css("opacity", "0");
  $(".movie-title").animate({opacity: 1}, 600); 
  
  title = movie.title;
  producer = movie.producer;
  director = movie.director;
  description = movie.description;
  score = movie.rt_score;
  div.style.display = "none";
  
  divInfo.innerHTML = `<div class="popup" onclick="showProducer()">Producer<span class="popuptext" id="myPopupProducer"></span></div><span>&nbsp</span>
                    <div class="popup" onclick="showDirector()">Director<span class="popuptext" id="myPopupDirector"></span></div><span>&nbsp</span>
                    <div class="popup" onclick="showRating()">Rating<span class="popuptext" id="myPopupRating"></span></div></br>`;
  pDescription.innerHTML = `${description}`;
  
  div.appendChild(divInfo);
  div.appendChild(pDescription);
  card.appendChild(div);
}

// pop ups for showing the producer, director and rating
function showProducer() {
  var popupD = document.getElementById("myPopupDirector");
  popupD.classList.toggle("show", false);
  
  var popupR = document.getElementById("myPopupRating");
  popupR.classList.toggle("show", false);
  
  var popup = document.getElementById("myPopupProducer");
  popup.classList.toggle("show");
  
  popup.innerHTML = producer;
}

function showDirector() {
  var popupD = document.getElementById("myPopupDirector");
  popupD.classList.toggle("show");
  
  var popupR = document.getElementById("myPopupRating");
  popupR.classList.toggle("show", false);
  
  var popup = document.getElementById("myPopupProducer");
  popup.classList.toggle("show", false);
  
  popupD.innerHTML = director;
}

function showRating() {
  var popupD = document.getElementById("myPopupDirector");
  popupD.classList.toggle("show", false);
  
  var popupR = document.getElementById("myPopupRating");
  popupR.classList.toggle("show");
  
  var popup = document.getElementById("myPopupProducer");
  popup.classList.toggle("show", false);
  
  popupR.innerHTML = score;
}
