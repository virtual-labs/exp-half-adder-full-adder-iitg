 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the below code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////

 (function() {
     function buildQuiz() {
         // we'll need a place to store the HTML output
         const output = [];

         // for each question...
         myQuestions.forEach((currentQuestion, questionNumber) => {
             // we'll want to store the list of answer choices
             const answers = [];

             // and for each available answer...
             for (letter in currentQuestion.answers) {
                 // ...add an HTML radio button
                 answers.push(
                     `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} :
           ${currentQuestion.answers[letter]}
         </label>`
                 );
             }

             // add this question and its answers to the output
             output.push(
                 `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join("")} </div>`
             );
         });

         // finally combine our output list into one string of HTML and put it on the page
         quizContainer.innerHTML = output.join("");
     }

     function showResults() {
         // gather answer containers from our quiz
         const answerContainers = quizContainer.querySelectorAll(".answers");

         // keep track of user's answers
         let numCorrect = 0;

         // for each question...
         myQuestions.forEach((currentQuestion, questionNumber) => {
             // find selected answer
             const answerContainer = answerContainers[questionNumber];
             const selector = `input[name=question${questionNumber}]:checked`;
             const userAnswer = (answerContainer.querySelector(selector) || {}).value;

             // if answer is correct
             if (userAnswer === currentQuestion.correctAnswer) {
                 // add to the number of correct answers
                 numCorrect++;

                 // color the answers green
                 //answerContainers[questionNumber].style.color = "lightgreen";
             } else {
                 // if answer is wrong or blank
                 // color the answers red
                 answerContainers[questionNumber].style.color = "red";
             }
         });

         // show number of correct answers out of total
         resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
     }

     const quizContainer = document.getElementById("quiz");
     const resultsContainer = document.getElementById("results");
     const submitButton = document.getElementById("submit");


     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the above code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////






     /////////////// Write the MCQ below in the exactly same described format ///////////////


     const myQuestions = [{
            question: "1.In parts of the processor, adders are used to calculate:", ///// Write the question inside double quotes
            answers: {
                a: "Addresses", ///// Write the option 1 inside double quotes
                b: "Table indices", ///// Write the option 2 inside double quotes
                c: "Increment and decrement operators",
                d: "All of the Mentioned",
            },
            correctAnswer: "d" ///// Write the correct option inside double quotes
        },

    {
      question: "2.Total number of inputs in a half adder is:",  ///// Write the question inside double quotes
      answers: {
        a: "2",                  ///// Write the option 1 inside double quotes
        b: "3",                  ///// Write the option 2 inside double quotes
        c: "4", 
        d: "1",
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },
{
      question: "3.If A and B are the inputs of a half adder, the sum is given by:",  ///// Write the question inside double quotes
      answers: {
        a: "A AND B",                  ///// Write the option 1 inside double quotes
        b: "A OR B",                  ///// Write the option 2 inside double quotes
        c: "A XOR B", 
        d: "A EXOR B",
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },


     ];




     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the below code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////


     // display quiz right away
     buildQuiz();

     // on submit, show results
     submitButton.addEventListener("click", showResults);
 })();


 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the above code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////
