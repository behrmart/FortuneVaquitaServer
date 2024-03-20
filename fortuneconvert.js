const fs = require("fs");

// Function to convert fortunes to JSON
function convertToJSON(data) {
  const lines = data.split("\n");
  const fortunes = [];
  let currentFortune = "";

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("%")) {
      if (currentFortune.length > 0) {
        fortunes.push(currentFortune.trim());
        currentFortune = "";
      }
    } else if (line.length > 0) {
      currentFortune += line + " ";
    }
  }

  if (currentFortune.length > 0) {
    fortunes.push(currentFortune.trim());
  }

  const jsonFortunes = fortunes.map((fortune, index) => {
    return {
      fortune_id: index + 1,
      fortune_message: fortune,
      hidden: false,
    };
  });

  return jsonFortunes;
}

// Read the file
fs.readFile("./fortunes/fortunes", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Convert to JSON
  const jsonFortunes = convertToJSON(data);

  // Print JSON
  console.log(JSON.stringify(jsonFortunes, null, 2));

  // You can also write the JSON to a file if needed
  fs.writeFile(
    "fortunes.json",
    JSON.stringify(jsonFortunes, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing JSON:", err);
        return;
      }
      console.log("Fortunes JSON file created!");
    }
  );
});
