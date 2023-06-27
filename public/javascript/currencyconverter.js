function convertCurrency() {
    //console.log("convertCurrency()")
    let userInput = document.getElementById("amount").value;
    let selectedItem = document.getElementById("select").value;
    //console.log("selectedItem", "input");

    fetch("/currencyconverter")
    .then(async response => await response.json()) //parse JSONString -> JSObject
    .then( response => {

        let primaryCurrency = document.getElementById("select");
        primaryCurrency.innerHTML = getSelectboxOptions(currencies);
        console.log(response)

        function getSelectboxOptions(data) {
            return Object.entries(data) //array of object's own enumerable string-keyed property values
              .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
              .join("");
        }
        displayCurrency(data, userInput, selectedItem)
    })
    .catch(error => {   
        console.log(error); 
    }) 
}

function displayCurrency(data, userInput, selectedItem) {
    let userInput = document.getElementById("amount").value;
    let selectedItem = document.getElementById("select").value;

    const calculated = amount * data.conversion_rates[selectedItem];

    document.getElementById("result").setAttribute("style", "display:block");
    document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
    document.getElementById("txt-secondary").innerText = calculated + " " + secondary;
}

window.onload = function () {
    document.getElementById("convertbtn").addEventListener("click", () => convertCurrency());
};