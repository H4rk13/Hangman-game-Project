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
    
    const numberToChooseFactAbout = 20;

    /*
    make a fetch for data from the numbers api...

    display a random fact about the number 13
    */



});



