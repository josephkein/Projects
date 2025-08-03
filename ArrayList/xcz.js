let addTask = document.getElementById('task');
let addF = document.getElementById('addF');
let res = document.getElementById('res');
const ul = document.getElementById('unorder');
let edit = document.getElementById("edit");
var tasks =  [];
let x = 1;
addF.addEventListener('submit', function(e){
    e.preventDefault();
    if (!addTask.value){
        alert("Please input something");
        return;
    }
    tasks.unshift(addTask.value);

    const lst = document.createElement("li");
    const btnD = document.createElement("button");
    const btnE = document.createElement("button");
    const div = document.createElement("div");

    div.id = "gr" + x;
    div.style.display = "flex";
    div.style.gap = "10px";

    lst.id = "yes";
    lst.textContent = addTask.value;

    btnE.textContent = "Update";
    btnE.className = "update";
    btnE.setAttribute("popovertarget", "updateForm");

    btnD.textContent = "Delete";
    btnD.className = "del";
    
    div.appendChild(lst);
    div.appendChild(btnE);
    div.appendChild(btnD);
    ul.appendChild(div);
    addTask.value = "";
    x++;
});

ul.addEventListener('click', function(e){
    if (e.target && e.target.classList.contains("del")){
        const parentD = e.target.parentElement;
        ul.removeChild(parentD);
        alert(`${parentD.querySelector("li").textContent} successfully deleted!`);
    }
    else if (e.target && e.target.classList.contains("update")){
        const parentE = e.target.parentElement;
        const btn = document.getElementById("newTaskBtn");
        let li = parentE.querySelector("li");
        let task = document.getElementById("newTask");
        task.value = li.textContent;

        btn.onclick = function(){
                if (!task.value){
                  alert("Please input something");
                  return;
              }
            if (li.textContent != task.value){
                alert(`${li.textContent.toUpperCase()} successfully updated to ${task.value.toUpperCase()}!`);
            }
            li.textContent = task.value;
            task.value = "";
            document.getElementById("updateForm").hidePopover();
        }
    }
});