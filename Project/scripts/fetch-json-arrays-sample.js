// JSON Introduction

// HTML Elements
const btn01 = document.getElementById('btn-01');
const out01 = document.getElementById('data-output-01');
const btn02 = document.getElementById('btn-02');
const out02 = document.getElementById('data-output-02');


const spinner = new Image();
spinner.src = 'images/spinner.gif';
spinner.alt = 'Loading';


const fetch_file_location = "data/json/people.json";


btn01.addEventListener('click', function(){

    // Remove any existing HTML on the output div
    out01.innerHTML = '';
    // Insert a spinner while the data loads
    out01.appendChild(spinner);

    fetch(fetch_file_location)
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
            
            // Extract all the peoples names as an array            
            const arrayOfNames = data.map(person => person.name);
            
            /*
            extract the emails and phone numebrs also
            */
            const arrayOfEmails = data.map(person => person.email);
            const arrayOfPhoneNumbers = data.map(person => person.phone);
            
            /*
            make a counter to track iterations
            */
           let personCounter = 0;

            //loop through array and display items
            let list = `<ul>`;
            arrayOfNames.forEach(function( oneName ){
                /*
                use the counter to access array values
                for all arrays...
                */
                list += `<li>${oneName} <br><em>Email:</em> ${arrayOfEmails[personCounter]} <br><em>Phone:</em> ${arrayOfPhoneNumbers[personCounter]}</li>`;
                personCounter++;
            });
            list += `</ul>`;
            out01.innerHTML = list;

        })
        .catch(function(error){
            out01.innerHTML = `<p>${error}. Please try again.</p>`;
        });

});



