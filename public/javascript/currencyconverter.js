function convertCurrency() {
    //console.log("convertCurrency")
    let input = document.getElementById("amount").value;
    let selectedItem = document.getElementById("select").value;
    //console.log(selectedItem);

    fetch("/currencyconverter")
    .then(async response => await response.json()) //parse JSONString -> JSObject
    .then( response => {
        const primaryCurrency = document.getElementById("select");
        primaryCurrency.innerHTML = getOptions(currencies);

        function getOptions(data) {
            return Object.entries(data)
              .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
              .join("");
          }

    })
    .catch(error => {
        console.log(error);
    })
    
}
