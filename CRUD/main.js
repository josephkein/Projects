let students = 0, male = 0, female = 0, attempt = 0;
let numberS = document.getElementById("studentX");
let numberM = document.getElementById("studentM");
let numberF = document.getElementById("studentF");
let studentList = JSON.parse(localStorage.getItem("studentList")) || [];
let ra = [];

document.getElementById('add-student').addEventListener('click', function(){
    if (attempt == 100){
        alert("Limit to 5 only");
        return;
    }
    let fn = prompt("Enter First Name").toUpperCase();
    let mn = prompt("Enter Middle Name").toUpperCase();
    let ln = prompt("Enter Last Name").toUpperCase();
    let sx = "";
    do{
        sx = prompt("Enter Sex [M/F]").toUpperCase();
    } while (sx != "M" && sx != "F");
    if (fn == "" || mn == "" || ln == "" || sx == ""){
        return;
    }

    let isT = false;
    let ran;
    
    do{
        ran = Math.floor(Math.random() * 100) + 1;
    } while (ra.includes(ran));

    ra.push(ran);

    studentList.push({firstN: fn, MiddleN: mn, LastN: ln, Gender: sx, ID: ran});
    addS(fn, mn, ln, sx, ran);
    localStorage.setItem("studentList", JSON.stringify(studentList));

    attempt++;
});

window.onload = function (){
    studentList = JSON.parse(localStorage.getItem("studentList"));
    students = 0, male = 0, female = 0, attempt = 0;;

    studentList.forEach((student) => {
        addS(student.firstN, student.MiddleN, student.LastN, student.Gender, student.ID);
    });
};

function addS(name, middle, last, gender, randomN){
    let table = document.getElementById("tb");
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = randomN;
    let td2 = document.createElement("td");
    td2.textContent = name;
    let td3 = document.createElement("td");
    td3.textContent = middle;
    let td4 = document.createElement("td");
    td4.textContent = last;
    let td5 = document.createElement("td");
    td5.textContent = gender;
    let td6 = document.createElement("td");
    td6.style.display = "flex";
    td6.style.gap = "10px";
    let del = document.createElement("button");
    del.className = "delete";
    del.textContent = "DELETE"
    let up = document.createElement("button");
    up.className = "update";
    up.textContent = "UPDATE";
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    td6.appendChild(del);
    td6.appendChild(up);
    if (gender == "M"){ male++; }
    else if (gender == "F") { female++; }
    students++;
    numberS.textContent = students;
    numberM.textContent = male;
    numberF.textContent = female;
}

let tb = document.getElementById("tb");

tb.addEventListener('click', function(e){
    if (e.target && e.target.classList.contains("delete")){
        const tr = e.target.closest("tr");
        const tds = tr.querySelectorAll("td");
        const sx = tds[4].textContent.trim();
        const id = tds[0].textContent;

        studentList = studentList.filter(stud => stud.ID != id);
        localStorage.setItem("studentList", JSON.stringify(studentList));

        if (sx == "M"){ male--; students--;}
        else if (sx == "F"){ female--; students--;}
        tb.removeChild(tr);
        numberS.textContent = students;
        numberM.textContent = male;
        numberF.textContent = female;

    }
    else if (e.target && e.target.classList.contains("update")){
        const rw = e.target.closest("tr");
        const tds = rw.querySelectorAll("td");
        let tarId = tds[0].textContent;
        studentList.forEach((stud) => {
            if (stud.ID == tarId){
                stud.firstN = prompt("Update first name").toUpperCase();
                tds[1].textContent = stud.firstN;
                stud.MiddleN = prompt("Update middle name").toUpperCase();
                tds[2].textContent = stud.MiddleN;
                stud.LastN = prompt("Update last name").toUpperCase();
                tds[3].textContent = stud.LastN;

                do{
                    stud.Gender = prompt("Update gender").toUpperCase();
                } while(stud.Gender != "M" && stud.Gender != "F");
                tds[4].textContent = stud.Gender;
            }
        });
        localStorage.setItem("studentList", JSON.stringify(studentList));
        const sx = tds[4].textContent.trim();
        if (sx == "M"){ female--; male++;}
        else if (sx == "F"){ male--; female++;}
        numberM.textContent = male;
        numberF.textContent = female;
    }
});