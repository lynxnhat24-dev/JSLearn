document.querySelector("#push").onclick = function () {
    if (document.querySelector("#newtask input").value.length == 0) {
        alert("Please Enter a Task");
    } else {
        document.querySelector("#tasks").innerHTML += `
        <div class="task">
            <span id="taskname">
                ${document.querySelector('#newtask input').value}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    `;

        var current_tasks = document.querySelectorAll(".delete");
        current_tasks.forEach((task, i) => {
            task.onclick = () => {
                task.parentNode.remove();
            };
        });

        var tasks = document.querySelectorAll(".task");
        tasks.forEach((task, i) => {
            task.onclick = () => {
                task.classList.toggle("complete");
            };
        });

        document.querySelector("#newtask input").value = "";
    }
};