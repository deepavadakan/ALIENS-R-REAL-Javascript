// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");
var clearBtn = d3.select("#clear-btn");

// Select the form
var form = d3.select("form");

// Select drop down
var datetime = d3.select("#datetime");
var country = d3.select("#country");
var state = d3.select("#state");
var city = d3.select("#city");
var shape = d3.select("#shape");

// Find the list of all datetime, country, state, city and shape
var datetimeList = Array.from(new Set(tableData.map(sighting => sighting.datetime)));
var countryList = Array.from(new Set(tableData.map(sighting => sighting.country)));
countryList.sort();
var stateList = Array.from(new Set(tableData.map(sighting => sighting.state)));
stateList.sort();
var cityList = Array.from(new Set(tableData.map(sighting => sighting.city)));
cityList.sort();
var shapesList = Array.from(new Set(tableData.map(sighting => sighting.shape)));
shapesList.sort();

// Create event handlers 
button.on("click", runEnter);
clearBtn.on("click", runClear);
form.on("submit",runEnter);
country.on("change",getStateForCountry);
state.on("change",getCityForState);

// run function to fill drop down list for first time
runClear();

// function to fill drop down list
function fillDropdown(dropdownElement, list) {
    console.log(list);
    dropdownElement.html("");
    dropdownElement.append("option").text("").attr("value","");
    list.forEach(item => {
        dropdownElement.append("option").text(item).attr("value",item);
    });
}

function runClear() {
    // create the drop down list for date
    fillDropdown(datetime, datetimeList);

    // create the drop down list for country
    fillDropdown(country, countryList);
    
    // create the drop down list for state
    fillDropdown(state, stateList);

    // create the drop down list for city
    fillDropdown(city, cityList);

    // create the drop down list for shape
    fillDropdown(shape, shapesList);
    
    // run function to display all data
    runEnter();
};

// function to fill state and city dropdown for selected country
function getStateForCountry() {
    // Get value property for country
    var inputCountry = d3.select("#country").property("value");
    if (inputCountry != "") {
        // filter data for selected country
        var stateCountryData = tableData.filter(sighting => sighting.country === inputCountry);
        // find list of unique states for selected country
        var stateCountryList = Array.from(new Set(stateCountryData.map(sighting => sighting.state)));
        stateCountryList.sort();
        // find list of unique cities for selected country
        var cityCountryList = Array.from(new Set(stateCountryData.map(sighting => sighting.city)));
        cityCountryList.sort();
        
        // fill the state drop down list
        fillDropdown(state, stateCountryList);

        // fill the city drop down list
        fillDropdown(city, cityCountryList);
        
    } else { //if country is empty, fill city and state drowndown with all data
        fillDropdown(state, stateList);

        fillDropdown(city, cityList);
    }
};

// function to fill city dropdown for selected state
function getCityForState() {
    // Get value property for state
    var inputState = d3.select("#state").property("value");

    if (inputState != "") {
        // filter data for selected state
        var stateCityData = tableData.filter(sighting => sighting.state === inputState);
        // find list of unique cities for selected state
        var stateCityList = Array.from(new Set(stateCityData.map(sighting => sighting.city)));
        stateCityList.sort();

        // fill the city drop down list
        fillDropdown(city, stateCityList);
    
    } else {
        // check if country is selected
        var inputCountry = d3.select("#country").property("value");
        if (inputCountry === "") {
            // if country is empty, list all cities
            fillDropdown(city, cityList);
            
        } else {
            // if country is not empty, list all cities for selected country
            var stateCityData = tableData.filter(sighting => sighting.country === inputCountry);
            var stateCityList = Array.from(new Set(stateCityData.map(sighting => sighting.city)));
            stateCityList.sort();
            fillDropdown(city, stateCityList);
            
        }
    }
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

