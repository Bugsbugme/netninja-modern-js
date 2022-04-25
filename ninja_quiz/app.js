const correctAnswers = ["B", "B", "B", "B"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");

/* Listening for the submit event on the form. */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

  //check answers
  /* Looping through the userAnswers array and comparing each answer to the correctAnswers array. If
  the answer is correct, it adds 25 to the score. */
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });

  // show results
  scrollTo(0, 0);
  result.classList.remove("d-none");

  // score animation
  /* A timer that is set to 10 milliseconds. It is used to animate the score. */
  let output = 0;
  const timer = setInterval(() => {
    result.querySelector("span").textContent = `${output}%`;
    /* Checking if the output is equal to the score. If it is, it clears the timer. If it is not, it adds 1
    to the output. */
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
});
