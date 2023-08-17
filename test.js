document.addEventListener("DOMContentLoaded", () => {
    const fortunetextElement = document.getElementById("fortuneText");
    const fortunetypeElement = document.getElementById("fortuneType");

    const url = "http://192.168.0.2:3333/fortunejson"; // Replace with the actual URL
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Process and display the parsed JSON data
        console.log(data);
        const fortunetext = data.fortunetext; 
        const fortunetype = data.fortunetype;
        
        fortunetextElement.innerHTML = fortunetext;
        fortunetypeElement.innerHTML = fortunetype;
      })
      .catch(error => {
        console.error("Fetch error:", error);
        fortunetextElement.textContent = "An error occurred while fetching the data.";
      });
  });
  