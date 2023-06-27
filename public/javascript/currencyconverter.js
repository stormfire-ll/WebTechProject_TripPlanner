function convertCurrency() {
    console.log("convertCurrency()")

    fetch("/currencyconverter")
    .then(async response => {
        const test = await response.json()
        const data = JSON.parse(test)
        let primaryCurrency = document.getElementById("select");
        primaryCurrency.innerHTML = getSelectboxOptions(data);

        console.log(response) 
        console.log(data);

        function getSelectboxOptions(data) {    //fill selectboxOptions
            return Object.entries(data) //array of object's own enumerable string-keyed property values
              .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
              .join("");
        }
    }) 
    .catch(error => {   
        console.log(error); 
    }) 
}

function displayCurrency(data) {
    let userInput = document.getElementById("amount").value;    //get amount
    //console.log(userInput);
    let selectedItem = document.getElementById("select").value; //select selectboxItem

    let calculated = userInput * data.conversion_rates[selectedItem];

    document.getElementById("result").setAttribute("style", "display:block");
    document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
    document.getElementById("txt-secondary").innerText = calculated + " " + secondary;
}

window.onload = function () {
    document.getElementById("convertbtn").addEventListener("click", () => convertCurrency());
};