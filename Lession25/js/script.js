let inputText = document.getElementById("input-text");
let outputText = document.getElementById("output-text");
let truncateBtn = document.getElementById("truncate");
let copyBtn = document.getElementById("copy");

truncateBtn.addEventListener("click", () => {
    let len = parseInt(document.getElementById("len").value);

    if (len) {
        if (len > 0 && inputText.value.length > len) {
            outputText.value = inputText.value.slice(0, len);
        } else {
            outputText.value = inputText.value;
        }
    } else {
        outputText.value = "";
        alert("Please fill the length input");
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`${outputText.value}`);
});