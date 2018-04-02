# Memory Game Cards

**Memory game Cards** is a game that I created with the help of **Udacity**. It is a project that I must complete as part of the **Google Udacity FEND Nanodegree**.
I decided to download the starter code that Udacity provided. This consisted of a HTML file, a CSS file, and a JavaScript file with one function in it (the shuffle function; I deleted  it and introduced my own).
I have built most of the JavaScript functionality. I have made the page responsive (with media queries) to different size screens.

[Here is the **project rubric**](https://review.udacity.com/#!/rubrics/591/view)

## Dependencies

The game uses icons from the following website:
  * https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css

Google Fonts:
  * https://fonts.googleapis.com/css?family=Coda

For the modal box, I adapted an example from **w3schools**:

  * https://www.w3schools.com/howto/howto_css_modals.asp



## Instructions

There are 8 pairs of matching cards, initially turned "face down". The user should click on one of these to turn it over. They should then click on another "face down" card. If the cards match, their colour will change from #02b3e4 to #02ccba. If the cards do not match, they will briefly turn red - and then they will turn back to "face down".

Above the deck the following is displayed:

  * the number of moves the user has made so far
  * the number of seconds that have passed
  * the numbers of stars currently active
  * a reset button

  After a certain number of moves, the number of stars is reduced. *** stars is the highest available, * star is the lowest.

When all the cards are matched, the modal box pops up and the user is informed of:

  * how many moves they made
  * how many seconds it took
  * how many stars they achieved

Here is the live version.
https://magicmart.github.io/memory-game-cards/
