let addTask = document.getElementById('task');
let btnadd = document.getElementById('addBBtn');
let res = document.getElementById('res');
const ul = document.getElementById('unorder');

function clickNow(){
    let tasks =  [];
    tasks.splice(0, 0, addTask.value);
    if (!addTask.value)
    {
        alert("Please input task!");
    }
    else{
        for (let task of tasks)
            {
                let yes = document.createElement("li");     
                yes.textContent = task;
                ul.appendChild(yes);
        
                let span = document.createElement('span');
                span.id = "yes";
                span.textContent = "×";
                yes.appendChild(span);
            }
            addTask.value = "";
            saveList();
    }
}

ul.addEventListener('click', function(burak){
    if (burak.target.tagName === "SPAN"){
        burak.target.parentElement.remove();
        saveList();
    }
});

function saveList(){
    localStorage.setItem("data", ul.innerHTML);
}

function displayList(){
    let saveData = localStorage.getItem("data");

    if (saveData)
    {
        ul.innerHTML = saveData;
    }
}

displayList();