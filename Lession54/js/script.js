const password = document.getElementById('password');
const background = document.getElementById("background");

password.addEventListener("input", () => {
    const input = password.value;
    const blurValue = 16 - input.length;
    background.style.filter = `blur(${blurValue}px)`;
});