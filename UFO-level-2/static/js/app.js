// from data.js
var tableData = data;

// create the drop down list for date
var datetime = d3.select("#datetime");
var datetimeList = tableData.map(sighting => sighting.datetime).filter((value, index, self) => self.indexOf(value) === index);
console.log(datetimeList);
datetime.append("option").text("").attr("value","");
datetimeList.forEach(item => {
    datetime.append("option").text(item).attr("value",item);
});

// create the drop down list for city
var city = d3.select("#city");
var cityList = tableData.map(sighting => sighting.city).filter((value, index, self) => self.indexOf(value) === index);
console.log(cityList);
city.append("option").text("").attr("value","");
cityList.forEach(item => {
    city.append("option").text(item).attr("value",item);
});

// create the drop down list for state
var state = d3.select("#state");
var stateList = tableData.map(sighting => sighting.state).filter((value, index, self) => self.indexOf(value) === index);
console.log(stateList);
state.append("option").text("").attr("value","");
stateList.forEach(item => {
    state.append("option").text(item).attr("value",item);
});

// create the drop down list for country
var country = d3.select("#country");
var countryList = tableData.map(sighting => sighting.country).filter((value, index, self) => self.indexOf(value) === index);
console.log(countryList);
country.append("option").text("").attr("value","");
countryList.forEach(item => {
    country.append("option").text(item).attr("value",item);
});
// create the drop down list for shape
var shape = d3.select("#shape");
var shapesList = tableData.map(sighting => sighting.shape).filter((value, index, self) => self.indexOf(value) === index);
console.log(shapesList);
shape.append("option").text("").attr("value","");
shapesList.forEach(item => {
    shape.append("option").text(item).attr("value",item);
});

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);
country.on("change",getStateForCountry);
state.on("change",getStateForCountry);

// fill state and city for country
function getStateForCountry() {
    //var stateCountryList = tableData.map(sighting => sighting.state).filter((value, index, self) => self.indexOf(value) === index);
    var inputCountry = d3.select("#country").property("value");
    console.log("runCountry");
    console.log(inputCountry);
    var stateCountryData = tableData.filter(sighting => sighting.country === inputCountry);
    console.log(stateCountryData);
    var stateCountryList = stateCountryData.map(sighting => sighting.state).filter((value, index, self) => self.indexOf(value) === index);
    
    console.log(stateCountryList);
    state.html("");
    state.append("option").text("").attr("value","");
    stateCountryList.forEach(item => {
        state.append("option").text(item).attr("value",item);
    });
};

function getCityForState() {
    //var stateCountryList = tableData.map(sighting => sighting.state).filter((value, index, self) => self.indexOf(value) === index);
    var inputState = d3.select("#country").property("value");
    console.log("runCountry");
    console.log(inputCountry);
    var stateCountryData = tableData.filter(sighting => sighting.country === inputCountry);
    console.log(stateCountryData);
    var stateCountryList = stateCountryData.map(sighting => sighting.state).filter((value, index, self) => self.indexOf(value) === index);
    
    console.log(stateCountryList);
    state.html("");
    state.append("option").text("").attr("value","");
    stateCountryList.forEach(item => {
        state.append("option").text(item).attr("value",item);
    });
};

// Complete the event handler function for the form
function runEnter() {

    console.log(d3.event);
    // Prevent the page from refreshing if event is not null
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
        filteredData = filteredData.filter(sighting => sighting.datetime === inputDate);
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
    });

};

runEnter();