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
    // And get the value property of the input element
    var inputDate = d3.select("#datetime").property("value");
    var inputCity = d3.select("#city").property("value");
    var inputState = d3.select("#state").property("value");
    var inputCountry = d3.select("#country").property("value");
    var inputShape = d3.select("#shape").property("value");
  
    console.log(inputDate);
    console.log(inputCity);
    console.log(inputState);
    console.log(inputCountry);
    console.log(inputShape);

    var filteredData = tableData;

    // filter data by date
    if (inputDate != "") {
        var filteredData = tableData.filter(sighting => sighting.datetime === inputDate);
    }

    // filter data by city
    if (inputCity != "") {
        filteredData = filteredData.filter(sighting => sighting.city === inputCity);
    }

    // filter data by state
    if (inputState != "") {
        filteredData = filteredData.filter(sighting => sighting.state === inputState);
    }

    // filter data by country
    if (inputCountry != "") {
        filteredData = filteredData.filter(sighting => sighting.country === inputCountry);
    }

    // filter data by shape
    if (inputShape != "") {
        filteredData = filteredData.filter(sighting => sighting.shape === inputShape);
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