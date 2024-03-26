// Creating a list of words and hints to be used for the game

const wordList = [

    {
        "word": "australia",
        "hint": "Known for its unique wildlife and the Sydney Opera House."
    },
    {
        "word": "brazil",
        "hint": "Home to the Amazon Rainforest and Rio de Janeiro."
    },
    {
        "word": "canada",
        "hint": "Famous for its maple syrup and the Niagara Falls."
    },
    {
        "word": "france",
        "hint": "Renowned for its cuisine, fashion, and the Eiffel Tower."
    },
    {
        "word": "india",
        "hint": "Known for its diverse culture, cuisine, and the Taj Mahal."
    },
    {
        "word": "japan",
        "hint": "Famous for sushi, cherry blossoms, and traditional tea ceremonies."
    },
    {
        "word": "mexico",
        "hint": "Known for its rich history, delicious cuisine, and ancient ruins."
    },
    {
        "word": "russia",
        "hint": "Largest country in the world, famous for its architecture and literature."
    },
    {
        "word": "spain",
        "hint": "Known for flamenco music, bullfights, and beautiful beaches."
    },

    {
        "word": "elephant",
        "hint": "Largest land animal known for its long trunk and tusks."
    },
    {
        "word": "giraffe",
        "hint": "Tallest living terrestrial animal with a long neck and spotted coat."
    },
    {
        "word": "kangaroo",
        "hint": "Marsupial native to Australia known for its powerful hind legs and pouch."
    },
    {
        "word": "penguin",
        "hint": "Flightless bird native to the Antarctic, known for its distinctive waddling gait."
    },
    {
        "word": "tiger",
        "hint": "Large carnivorous feline with distinctive orange fur and black stripes."
    },
    {
        "word": "lion",
        "hint": "Majestic big cat known as the 'King of the Jungle'."
    },
    {
        "word": "panda",
        "hint": "Large bear-like mammal native to China, known for its distinctive black and white coat."
    },
    {
        "word": "dolphin",
        "hint": "Highly intelligent marine mammal known for its playful behavior and communication abilities."
    },
    {
        "word": "leopard",
        "hint": "Large wild cat known for its spotted fur and stealthy hunting abilities."
    },
    {
        "word": "gorilla",
        "hint": "Largest living primate known for its strength and intelligence."
    },
    {
        "word": "rose",
        "hint": "Classic flower symbolizing love and romance, available in various colors."
    },
    {
        "word": "sunflower",
        "hint": "Large, bright flower known for turning its face toward the sun."
    },
    {
        "word": "tulip",
        "hint": "Bell-shaped flower symbolizing love and spring, native to Central Asia."
    },
    {
        "word": "orchid",
        "hint": "Exotic flower with intricate blooms, representing beauty and elegance."
    },
    {
        "word": "daisy",
        "hint": "Simple, cheerful flower with a yellow center and white petals."
    },
    {
        "word": "lily",
        "hint": "Elegant flower often associated with purity and rebirth."
    },

    {
        "word": "hibiscus",
        "hint": "Colorful flower known for its large, showy blooms and tropical origins."
    },
    {
        "word": "carnation",
        "hint": "Popular flower often used in bouquets and arrangements, available in various colors."
    },
    {
        "word": "daffodil",
        "hint": "Bright, trumpet-shaped flower symbolizing rebirth and new beginnings."
    }
];

// declaring all the variable that will be used
// declaring up her so it can be accessed throughout the script

let wordsContainer, hints, randomWord, randomHint, targetWordList, tries, wordLengthContainer, clickedLetters = new Set(), randomIndexPosition, targetWord, remaining, currentImage;

// setting the path for images
let imagePath = "Images/"

// selecting all the keyboard buttons that will be created during setup
const buttons = buttonsContainer.querySelectorAll('.buttons');

// grabbing the startup image by id
const imgSwitch = document.getElementById('startImage');

// newGame use to initialize the playAgain class object
let newGame;

// check if the user win or lose by toggling the boolean flag
let winCheck;


// the correct letters guessed are added to this to check if the length of target word and this is same to determine the winner
let correctLetters = [];



// the game setup from adding buttons to generating random word and hints as well as checking the letters for match
function setupGame() {


    const mainContainer = document.getElementById('mainContainer');
    const bigContainer = document.getElementById("bigContainer");
    const bigContainer2 = document.getElementById("bigContainer2");

    // Instantiate the Menu class first
    const gameMenu = new Menu();

    wordsContainer = document.querySelector('.words');
    hints = document.querySelector('.hints');

    // generating a random number in the range of wordList size/length

    randomIndexPosition = Math.floor(Math.random() * wordList.length);


    // assigning the generated random number to index the position of word and hint in the list
    randomWord = wordList[randomIndexPosition].word;
    randomHint = wordList[randomIndexPosition].hint;

    // setting the target word to random word
    targetWord = randomWord;

    // creating the visual in the word container
    // if empty character then add space else add underscore 

    // convert string to an Array and map the character in the  Array to space or underscore.
    wordLengthContainer = Array.from(targetWord).map(function (ch) {
        if (ch === "") {
            return " ";
        } else {
            return "_";
        }
    });

    // setting the default number of tries for guesses
    tries = document.getElementById("changeNumber");

    // total number of guesses
    remaining = 6;
    // image number
    currentImage = 0;

    // call the function to update the display with word and hints 
    updateDisplay();

    // string of alphabet to iterate over to create a Keyboard.
    // Choose QWERTY layout for the keyboard

    const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
    const buttonsContainer = document.getElementById('buttonsContainer');

    // for letter in the alphabet create a button element for each and add class buttons to it for styling and append the buttons to the button container.


    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.classList.add("buttons");
        button.textContent = letter;
        buttonsContainer.appendChild(button);

        // adding an event listener to the buttons.When the button is pressed,it is added to clicked letters and the button is disabled

        // the checkLetters() function is called after each click to check against the target word.

        button.addEventListener('click', function () {
            console.log('button pressed : ' + letter);
            clickedLetters.add(letter);
            button.disabled = true;
            checkLetters();
        });
    }

    // split the target word into a list of word. As string element separated into an array

    targetWordList = targetWord.split('');



    // log for debugging
    console.log("Buttons : ", clickedLetters);
    console.log('Target Word:', targetWord);
    console.log('Target Word List:', targetWordList);


    // the function to check the letters again the target word as well as checking if the user win or lose

    function checkLetters() {

        // setting a variable for incorrect guess 

        let incorrectGuess = true;

        // for letters in the clicked letter container check if the targetWordList contain the letter
        for (const letter of clickedLetters) {
            incorrectGuess = true;
            if (targetWordList.includes(letter)) {
                correctLetters.push(letter);
                // push the letter to correct letter container

                // loop through the content based on length of targetwordlist 
                // show the word in the list that matches.
                for (let i = 0; i < targetWordList.length; i++) {
                    let wordAtPosition = targetWordList[i];
                    if (wordAtPosition === letter) {
                        wordLengthContainer[i] = letter;
                        incorrectGuess = false;
                    }
                }
            }
        }

        updateDisplay();

        // if the word container does not contain any underscore as in all the words has been revealed/guessed correctly,switch the winCheck flag to true and end game

        if (!wordLengthContainer.includes("_")) {
            bigContainer2.style.display = "flex";

            mainContainer.style.display = "none";

            // Set winCheck to true when the game is won

            winCheck = true;
        }

        // if the guess in incorrectGuess then the image changes and current guess number reduces.
        if (incorrectGuess) {
            currentImage++;


            if (currentImage == 1) {
                imgSwitch.classList.toggle("addAnimation");

                // switch to a gif for initial image
                imgSwitch.src = `${imagePath}/tom-${currentImage}.gif`;
            } else {

                // switch to images after first image change
                imgSwitch.src = `${imagePath}/tom-${currentImage}.jpg`;
            }
            if (remaining === 1) {
                let buttons = buttonsContainer.querySelectorAll('.buttons');
                buttons.forEach(button => {
                    button.disabled = true;
                });
            }

            // decrement the number of tries remaining
            remaining--;
            updateDisplay();

            // if all the tries has been used end the game
            if (remaining === 0) {
                bigContainer2.style.display = "flex";
                mainContainer.style.display = "none";
                winCheck = false; // Set winCheck to false when the game is lost
            }
        }

        // showing the final word that need to be guessed
        let finalWord = document.getElementById('finalWord');
        let result = document.getElementById('result');


        // if winCheck is true then the end screen picture is switched and text is displayed
        if (winCheck) {
            finalImg.src = `${imagePath}/tom-happy.gif`;
            result.innerHTML = `You <i>Win</i>👍😁`;

            finalWord.innerHTML = `You guessed it correctly.<br> The word is <i>${targetWord}.</i>`

        } else {
            finalImg.src = `${imagePath}/tom-sad-lose.gif`;
            result.innerHTML = `You <i>Lose</i>👎😥`;

            finalWord.innerHTML = `You guessed it Wrong.<br> The word was <i>${targetWord}.</i>`
        }
    }

    // Create new instance of playAgain class
    newGame = new playAgain();

};



// the function to display the hint and tries called after every button press
function updateDisplay() {
    wordsContainer.textContent = wordLengthContainer.join(' ');
    hints.textContent = `Hint : ${randomHint}`;
    tries.textContent = `${remaining}`;
}



// reset the game to base state so a rerun can occur
function resetGameState() {

    // clear the clicked letter list
    clickedLetters.clear();

    // reset the container and random number generated
    wordLengthContainer = [];
    randomIndexPosition = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomIndexPosition].word;
    randomHint = wordList[randomIndexPosition].hint;
    targetWord = randomWord;

    targetWordList = targetWord.split('');

    wordLengthContainer = Array.from(targetWord).map(function (ch) {
        if (ch === "") {
            return " ";
        } else {
            return "_";
        }
    });

    // resetting the values of tries and image counter

    remaining = 6;
    currentImage = 0;

    let buttons = buttonsContainer.querySelectorAll('.buttons');
    buttons.forEach(button => {
        button.disabled = false;
    });

    imgSwitch.src = `${imagePath}/tom-0.gif`;
    imgSwitch.classList.remove("addAnimation");

    bigContainer2.style.display = "none";


    // calling the reset function/method defined in the play again class
    newGame.reset(targetWord, randomHint);

    updateDisplay();
}



// defining a menu class to display the menu.
// this class creates the buttons and the heading in the menu container that can be used to display at the start of the game.

// event listener are added to the buttons and the game work accordingly by changing the display of various containers.

class Menu {

    constructor() {
        this.menuContainer = document.querySelector('.menuContainer');
        this.startButton = document.createElement('button');
        this.exitButton = document.createElement('button');
        const heading = document.createElement('h2');
        heading.classList.add('menuHeading');
        heading.textContent = "Let the Games Begin."
        this.startButton.textContent = "Play";
        this.exitButton.textContent = 'Exit';
        this.startButton.classList.add("menuButton");
        this.exitButton.classList.add("menuButton");

        this.startButton.addEventListener('click', function () {
            this.menuContainer.style.display = "none";
            mainContainer.style.display = "flex";
            bigContainer.style.display = "none";
        }.bind(this));

        this.exitButton.addEventListener('click', function () {
            this.startButton.style.display = "none";
            this.exitButton.style.display = "none";
            heading.style.display = "none";

            const message = document.createElement('h2');
            const byeImg = document.createElement('img');
            byeImg.classList.add("byeImg");
            byeImg.setAttribute("src", `${imagePath}/im-out.gif`)
            message.classList.add("messageText");
            message.innerHTML = "Have a Great Day.<br> Bye now.";
            this.menuContainer.appendChild(message);
            this.menuContainer.appendChild(byeImg);
        }.bind(this));
        this.menuContainer.appendChild(heading);
        this.menuContainer.appendChild(this.startButton);
        this.menuContainer.appendChild(this.exitButton);
    }
}



// Second class that define the end game menu and all the functionality relating to resetting the game and endGameMenu output
class playAgain {

    constructor() {

        this.endMenuContainer = document.querySelector(".endMenuContainer");

        this.lastImgContainer = document.querySelector(".lastImgContainer");

        this.yesButton = document.createElement('button');
        this.noButton = document.createElement('button');
        const heading2 = document.createElement("h4");
        heading2.classList.add('menuHeading');
        heading2.classList.add("lastHeading");
        heading2.innerHTML = "Want to Play again?? 🤔";
        this.yesButton.textContent = "Yes";
        this.noButton.textContent = "No";
        this.yesButton.classList.add("menuButton");
        this.noButton.classList.add("menuButton");
        this.endMenuContainer.appendChild(heading2);


        this.yesButton.addEventListener('click', function () {
            bigContainer2.style.display = "none";
            mainContainer.style.display = "flex";
            remaining = 6;
            resetGameState();
            updateDisplay();
        });


        this.noButton.addEventListener('click', function () {
            console.log("No button clicked");
            this.yesButton.style.display = "none";
            this.noButton.style.display = "none";
            // theWord.style.display = "none";
            heading2.style.display = "none";

            const lastMessage = document.createElement('h2');
            const byeImg = document.createElement('img');
            byeImg.classList.add("byeImg");
            byeImg.setAttribute("src", `${imagePath}/jerry-waving.gif`)
            lastMessage.classList.add("messageText");
            lastMessage.innerHTML = "Have a Great Day.<br> Bye now.";

            // Use this.lastImgContainer instead of lastImgContainer
            console.log("Hiding lastImgContainer");
            this.lastImgContainer.style.display = "none";
            console.log("Removing heading2");
            heading2.style.display = "none";
            console.log("Appending lastMessage");
            this.endMenuContainer.appendChild(lastMessage);
            console.log("Removing lastImgContainer");
            console.log("Appending byeImg");
            this.endMenuContainer.appendChild(byeImg);

        }.bind(this));


        this.endMenuContainer.appendChild(this.yesButton);
        this.endMenuContainer.appendChild(this.noButton);
    }

    reset(newTargetWord, newHint) {

        randomHint = newHint;
        hints.textContent = randomHint;
    }
}



// calling the setup game function to start the game 
setupGame();
