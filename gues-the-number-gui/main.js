import GuessTheNumber from "./GuessTheNumber.js";

const CLICK = "click";

/*

	1. For the following constants, we need to fetch
	   their corresponding HTML elements. By pure
	   coincidence, the names of these constants
	   matches the ID of the HTML elements. Makes it
	   easier ;)

	   (hint: use a method on the document object)
*/

const [
  lowerBound,
  upperBound,
  guessesLeft,
  guessInput,
  guessButton,
  helpButton,
] = [
  "lowerBound",
  "upperBound",
  "guessesLeft",
  "guessInput",
  "guessButton",
  "helpButton",
].map((id) => document.getElementById(id));

/*

	2. Create a guess the number game using the keyword
	   "new". Use either the default settings, or pass
	   in your own. We won't worry about concepts like
	   EASY, MEDIUM, or HARD just yet.

*/
const game = new GuessTheNumber({
  lower: 10,
  upper: 20,
  tries: 3,
});

console.log(game);

game;

/*

	3. Display the lower and upper bound to the user. We
	   do this by using our lowerBound and upperBound
	   elements above and use their `innerHTML` property to
	   assign a new text/string value inside each of these
	   `<span>` tags. Be sure to look this up on MDN or
	   otherwise. (hint: game.lower and game.upper)

*/
lowerBound.innerHTML = game.lower;
upperBound.textContent = game.upper;
/*

	4. Next, do something very similar but for our attempts
	   remaining. Our `game` object has a attemptsRemaining
	   method. Call this method and assign the value returned
	   to the innerHTML property of our guessesLeft span element.

*/
guessesLeft.innerHTML = game.attemptsRemaining();
/*

	5. Add a click event listener to our help button. On click, call
	   the `game.help()` method and, based on the value returned,
	   ALERT to the user that their last guess was within 10 or 20
	   or whatever from the target answer.

*/
helpButton.addEventListener(CLICK, (event) => {
  event.preventDefault();
  const distance = game.help();

  alert(
    distance === 0
      ? `Please enter a valid guess.`
      : `Your last guess was within ${distance} of the right answer`
  );
});
/*

	6. Finally, add a click listener to our guess button. Inside the
	   callback function, we need to fetch the value (almost as if it
	   is also the name of a property on our guessInput) of our guess
	   input field and then pass that value to `game.guess`. Be sure to
	   ensure the value is COERCED into a number from a string. Next,
	   ALERT the user if the guess was too high, too low, etc etc.
	   Lastly, call `game.attemptsRemaining` and assign that new value
	   to our guessesLeft span element by using `innerHTML`.

*/
guessButton.addEventListener(CLICK, (event) => {
  event.preventDefault();
  const state = game.guess(parseInt(guessInput.value));
  const {TOO_HIGH, TOO_LOW, EXACT_MATCH, OUT_OF_BOUNDS, GAME_OVER} =
    GuessTheNumber;

  if (state === TOO_HIGH) alert(`Your guess was too high, try a lower number`);
  else if (state === TOO_LOW) alert(`You need to guess higher than that`);
  else if (state === EXACT_MATCH) {
    alert(`Congratulations, you won the game!`);
    location.reload();
  } else if (state === OUT_OF_BOUNDS)
    alert(`You need to guess within the range!`);
  else if (state === GAME_OVER) {
    alert(`Unfortunately, you've run out of guesses. Try again!`);
    location.reload();
  }

  guessesLeft.innerHTML = game.attemptsRemaining();
  guessInput.value = "";
});
// SIDE NOTE: when you click these buttons, does something weird happen?
// If so, might we need to prevent some sort of default behaviour? Perhaps?
// Maybe? Quite possibly??? Hmmm....

// That's all folks! Good luck!!
