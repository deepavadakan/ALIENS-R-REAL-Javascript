// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    console.log(d3.event);
    // Prevent the page from refreshing
    if (!!d3.event) {
        d3.event.preventDefault();
    }
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputDate = inputElement.property("value");
  
    console.log(inputDate);
  
    if (inputDate === ""){
        // if user does not enter a date, use all data
        var filteredData = tableData;
    } else {
        // Find all data for user input date
        var filteredData = tableData.filter(sighting => sighting.datetime === inputDate);
    }
    
    console.log(filteredData);
  
    // find the tbody element
    var tbody = d3.select("tbody");

    // first clear the table of existing data
    tbody.html("");
    
    // display the data requested
    filteredData.forEach(sighting => {
        // for each sighting, add a row
        var row = tbody.append("tr");
        // add cells for each data item
        row.append("td").text(sighting.datetime);
        row.append("td").text(sighting.city);
        row.append("td").text(sighting.state);
        row.append("td").text(sighting.country);
        row.append("td").text(sighting.shape);
        row.append("td").text(sighting.durationMinutes);
        row.append("td").text(sighting.comments);
    })

};

runEnter();