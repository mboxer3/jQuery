// id to keep track of which element to remove (this would be better not in global scope)

// create a variable equal to 0. give it an alias of currentId
let currentId = 0
// create an empty array list and give it an alias of moviesList
const moviesList = []
// $ create a function using jQuery
// $ add an eventListener on submit on the ID new-movie-form passed with an anonymus function
// prevent default
// get the $ ID title's value and give it an alias of title
// get the $ ID rating's value and give it an alias of rating
$(function () {
    $("#new-movie-form").on("submit", function (evt) {
        evt.preventDefault()
        let title = $("#title").val()
        let rating = $("#rating").val()
        // create an object containing title, rating, currentId
        // generate HTML content for displaying movie data based on the provided movieData obj
        let movieData = { title, rating, currentId }
        const HTMLtoAppend = createMovieDataHTML(movieData)
        // increment the currentId by 1
        // push the movieData onto the moviesList
        currentId++
        moviesList.push(movieData)
        // append the HTMLtoAppend to $ movie-table-body
        // trigger the "reset" to $ new-movie-form
        $("#movie-table-body").append(HTMLtoAppend)
        $("#new-movie-form").trigger("reset")
    })
    // when the delete button is clicked, remove the closest parent tr and remove from the array of movies
// $ add an eventListener on the "tbody". when .btn.btn-danger is clicked call an anonymous function
    // find the index where this movie is
    $("tbody").on("click", ".btn.btn-danger", function (evt) {
        let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))
        // remove it from the array of movies
        moviesList.splice(indexToRemoveAt, 1)
        // remove it from the DOM
        $(evt.target)
            .closest("tr")
        .remove()
    })
// when an arrow is clicked
    // on click on the class "fas" call an anonymous function
    $(".fas").on("click", function (evt) {
        // figure out what direction we are sorting and the key to sort by
        let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up"
        // set the value of "keyToSortBy" variable to the "id" attribute of the target element in the evt
        let keyToSortBy = $(evt.target).attr("id")
        let sortedMovies = sortBy(moviesList, keyToSortBy, direction)
        // empty the id movie-table-body
        $("movie-table-body").empty()
        // loop over our object sortedMovies and append a new row
        for (let movie in sortedMovies) {
// create an alias for our current movie at createMovieDataHTML. give it an alias of HTMLtoAppend
            const HTMLtoAppend = createMovieDataHTML(movie)
            // append HTMLtoAppend onto the $id of movie-table-body
            $("#movie-table-body").append(HTMLtoAppend)
        }
        // toggle the arrow
        $(evt.target).toggleClass("fa-sort-down")
        $(evt.target).toggleClass("fa-sort-up")
    })
})
// create a js function called sortBy with the parameters "array, keyToSortBy, direction"
function sortBy(array, keyToSortBy, direction) {
    // return an assorted array called to an anoymous function with the parameters "a, b"
    return array.sort(function(a, b) {
        // since rating is a number, we have to convert these strings to numbers
        // if keyToSortBy is equal to "rating"
        if (keyToSortBy === "rating") {
        a[keyToSortBy] = +a[keyToSortBy];
        b[keyToSortBy] = +b[keyToSortBy];
      }
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return direction === "up" ? 1 : -1;
      } else if (b[keyToSortBy] > a[keyToSortBy]) {
        return direction === "up" ? -1 : 1;
      }
      return 0;
    });
  }
  /* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */

function createMovieDataHTML(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
}