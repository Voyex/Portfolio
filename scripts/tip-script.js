const emptyAmount = '$0.00';
let tipPercentage = NaN;
let billTotal = NaN;
let numPeople = NaN;

function pageRefresh() {
    const buttons = document.getElementsByClassName("tip-button");

    for(let i = 0; i < buttons.length; i++) {

        buttons[i].style.backgroundColor = "var(--dark-cyan)";
        buttons[i].style.color = "white";
    }

    document.getElementById("form").reset();

}

function getTipPercentage(element) {
    const buttons = document.getElementsByClassName("tip-button");
    const custom = document.getElementById("custom-tip");

    for(let i = 0; i < buttons.length; i++) {

    buttons[i].style.backgroundColor = "var(--dark-cyan)";
    buttons[i].style.color = "white";
    }


    if (element.id === "custom-tip") {
        tipPercentage = parseFloat(element.value / 100);
    } else {

        custom.value = "";
        element.style.backgroundColor = "var(--strong-cyan)";
        element.style.color = "var(--dark-cyan)"
        tipPercentage = element.value.slice(0, -1) / 100;
    }
    neumericErrorHandler(tipPercentage, 1);
}

function getBillTotal(element) {
    billTotal = element.value;
    neumericErrorHandler(billTotal, 0);
}

function getNumPeople(element) {
    numPeople = element.value;
    neumericErrorHandler(numPeople, 2);
}

function calculateTip() {
    tipPercentage = parseFloat(tipPercentage);
    billTotal = parseFloat(billTotal);
    numPeople = parseFloat(numPeople);

    let totalPerPerson = ((tipPercentage * billTotal + billTotal) / numPeople).toFixed(2);
    let tipPerPerson = (((tipPercentage * billTotal + billTotal) - billTotal) / numPeople).toFixed(2);

    const tip = document.getElementById("tip-per-person");
    const total = document.getElementById("total-per-person");

    if (totalPerPerson > 0 & tipPerPerson < Infinity) {
        tip.innerText = "$" + tipPerPerson;
        total.innerText = "$" + totalPerPerson;
    } else { 
        tip.innerText = emptyAmount;
        total.innerText = emptyAmount;
    }
}

function neumericErrorHandler(toCheck, errorNum) {
    let isNeumeric = /^[0-9.]+$/g.test(toCheck);
    console.log(isNeumeric);

    displayError(!isNeumeric, errorNum);

    //errorNums: 0=Bill Error, 1=Tip Error, 2=People Error
    function displayError(isError, errorNum) {
        let errorMessages = document.getElementsByClassName("error");
        if (isError) {
            errorMessages[errorNum].style.opacity = 1;
        } else {
            errorMessages[errorNum].style.opacity = 0;
            calculateTip();
        }
    }

}