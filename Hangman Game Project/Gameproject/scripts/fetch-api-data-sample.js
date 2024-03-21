// JSON Introduction

// HTML Elements
const btn01 = document.getElementById('btn-01');
const out01 = document.getElementById('data-output-01');
const btn02 = document.getElementById('btn-02');
const out02 = document.getElementById('data-output-02');


const spinner = new Image();
spinner.src = 'images/spinner.gif';
spinner.alt = 'Loading';


btn01.addEventListener('click', function(){

    // Remove any existing HTML on the output div
    out01.innerHTML = '';
    // Insert a spinner while the data loads
    out01.appendChild(spinner);
    
    const numberToChooseFactAbout = 13;
    /*
    this fetch request also includes an api key to give
    us permission to use the API
    */
    fetch(`https://numbersapi.p.rapidapi.com/random/trivia?max=${numberToChooseFactAbout}&fragment=true&min=${numberToChooseFactAbout}&json=true`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "cc0357703cmsh7ce273e8e64cae8p1d463fjsn0a75b42c8352",
            "x-rapidapi-host": "numbersapi.p.rapidapi.com"
        }
    })
        .then(function(response){
            
            if(response.ok){
                return response.json();
            }else{
                console.log("Network error: fetch failed");
            }
            
        })
        .then(function(data){
            // Remove the spinner
            out01.innerHTML = '';

            out01.innerHTML = `<p>Fun fact about the number ${numberToChooseFactAbout}: ${data.text}</p>`;
            console.log(data.text);
           

        })
        .catch(function(error){
            out01.innerHTML = `<p>${error}. Please try again.</p>`;
        });

});



