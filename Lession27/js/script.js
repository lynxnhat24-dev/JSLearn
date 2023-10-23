let cursorDivs = document.querySelectorAll(".container div");

cursorDivs.forEach((i) => {
    i.innerText = i.getAttribute("data-cursor");
    i.style.cursor = i.getAttribute("data-cursor");

    i.addEventListener("click", () =>{
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = `cursor: ${i.getAttribute("data-cursor")};`;
        
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand("copy");
        document.body.removeChild(inputElement);

        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 1000);
    })
});