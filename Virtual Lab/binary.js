function convert() {
    var number = document.getElementById("number").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var result = document.getElementById("result");

    if (from === "binary" && to === "decimal") {
        result.innerHTML = parseInt(number, 2);
    } else if (from === "binary" && to === "hexadecimal") {
        result.innerHTML = parseInt(number, 2).toString(16);
    } else if (from === "decimal" && to === "binary") {
        result.innerHTML = Number(number).toString(2);
    } else if (from === "decimal" && to === "hexadecimal") {
        result.innerHTML = Number(number).toString(16);
    } else if (from === "hexadecimal" && to === "binary") {
        result.innerHTML = parseInt(number, 16).toString(2);
    } else if (from === "hexadecimal" && to === "decimal") {
        result.innerHTML = parseInt(number, 16);
    } else {
        result.innerHTML = "Invalid conversion";
    }
}

