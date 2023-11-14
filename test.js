// Fetch and parses fortune JSON from FortuneServer.js running on node.js
// By Bernardo F. Martinez Meave  
// Stardate 20230817


const url = "http://192.168.100.23:3333/fortunejson"; // JSON resource URL
const fortuneButton = document.getElementById('FortuneButton');

fortuneButton.addEventListener('click', handleClick, false);

const fortunetextElement = document.getElementById("fortuneText");
const fortunetypeElement = document.getElementById("fortuneType");

function handleClick(event){
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Process and display the parsed JSON data
        console.log("JSON data fortunetext[1] :" + data.fortunetext[1]);
        const fortunetext = data.fortunetext; 
        const fortunetype = data.fortunetype;
        
        fortunetextElement.innerHTML = fortunetext[1].replace(/\n/g, "<br>"); //Replace \n with br
        fortunetypeElement.innerHTML = fortunetype;
        event.preventDefault();
      })
      .catch(error => {
        console.error("Fetch error:", error);
        fortunetextElement.textContent = `${url} Fortune JSON server Fetch error`;
      });

}
