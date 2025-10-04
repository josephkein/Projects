

let boarders = JSON.parse(localStorage.getItem("boarders")) || [];
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
const tb = document.getElementById("tbody");
const dashTb = document.getElementById("tbodyDash");
let unpaid = 0, capacity = 6, rows = 8, pg = 1, minus = 3;
let occupied = rooms.filter((r) => r.Availbed == 0);
let unp = boarders.filter((b) => b.Bstatus == "UNPAID");
let p = boarders.filter((b) => b.Bstatus == "PAID");

if (document.body.id === "dashboard"){
    document.getElementById("total").textContent = boarders.length;
    document.getElementById("unpaid").textContent = unp.length;
    document.getElementById("avail").textContent = rooms.length;
    document.getElementById("occupied").textContent = occupied.length;
    graphGender();
    runChart();
}

if (document.body.id === "paymentBody"){
    let amt = document.getElementById("amt");
    let rent = 1100;
    let addons = document.querySelectorAll("input[name='addons']");

    function newAmt(){
        let total = rent;
        addons.forEach((add) => {
            if (add.checked){
                total += Number(add.value);
            }
        });
        amt.value = total;
    }
    addons.forEach((add) => {
        add.addEventListener('change', newAmt);
    });
    newAmt();
    let sel = document.getElementById("selPay");
    sel.innerHTML = "";
    boarders.forEach((tenant) => {
        let op = document.createElement("option");

        op.value = tenant.Bname;
        op.textContent = tenant.Bname;

        sel.appendChild(op);
    });

}

function backT(){
    if (pg != 1){
        pg--;
    }
    document.querySelectorAll("h1").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(`p${pg}`).classList.add("active");
    filter();
}
function forwardT(){
    pg++;
    document.querySelectorAll("h1").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(`p${pg}`).classList.add("active");
    filter();
}

function darkUp(){
    document.getElementById("op").style.display = "flex";
}
if (document.body.id == "board" || document.body.id == "roomS" || document.body.id == "paymentBody"){
document.getElementById("op").addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("op").style.display = "none";
});
}

function addTenants(){
    try{
        let fname = document.getElementById("fn").value.toUpperCase();
        let lname = document.getElementById("ln").value.toUpperCase()
        let broom = document.getElementById("rn").value;
        let checkIn = document.getElementById("date").value;
        let statusP = document.getElementById("sel").value.toUpperCase();
        boarders.forEach((tenant) => {
            if (fname + " " + lname == tenant.Bname){
                throw new Error("Person already exist");
            }
        });
        
        let f = rooms.some((r) => broom == r.Rnum);
        if (!f) throw new Error("Room does not exist");
        if (statusP != "PAID" && statusP != "UNPAID") throw new Error("Must be paid or unpaid");
        if (statusP == "UNPAID"){ unpaid++; }
        let bname = fname + " " + lname;
        PaymentDue(checkIn);
        pushTenants(bname, broom, checkIn, statusP);
        filter();
        alert("SUCCESSFULLY ADDED");
    }catch (error){
        alert(error);
    }
}
function addRooms(){
    try{
        let roomNum = document.getElementById("rn").value;
        let roomCap = document.getElementById("cn").value;
        let availBeds = document.getElementById("ab").value;
        let statusP = document.getElementById("selRoom").value.toUpperCase();
        rooms.forEach((room) => {
            if (roomNum == room.Rnum){
                throw new Error("Room already exist");
            }
        });
        if (roomCap < 1 || roomCap > 6) throw new Error("Room capacity must be 1-6 only.");
        if (roomNum > 5) throw new Error("Only 5 rooms for now");
        pushRoom(roomNum, roomCap, availBeds, statusP);
        displayRooms();
        alert("SUCCESSFULLY ADDED");
    }catch (error){
        alert(error);
    }
}

function pushRoom(rn, rc, ab, stat){
    rooms.push({
        Rnum: rn,
        Rcap: rc,
        Availbed: ab,
        stat: stat
    });
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

function pushTenants(name, room, date, status){
    boarders.push({
        Bname: name,
        Broom: room,
        Bdate: date,
        Bstatus: status
    });
    localStorage.setItem("boarders", JSON.stringify(boarders));
}
if(document.body.id == "board"){
    window.onload = function() {
        filter();
    };
}
function PaymentDue(lastPayment){
    let nextPay = new Date(lastPayment);
    nextPay.setMonth(nextPay.getMonth() + 1);
    return nextPay;
}   

function page(n){
    pg = n;
    document.querySelectorAll("h1").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(`p${n}`).classList.add("active");
    filter();
}
//DISPLAY USING FILTER
function filter(){
    let stat = document.getElementById("selectStatus").value;
    let rm = document.getElementById("selectRoom").value;
    let ser = document.getElementById("search").value.trim();
    let filtered;
    if (!ser){
        filtered = boarders;
    }
    else{
        let searched = boarders.filter(tenant => tenant.Bname.includes(ser.toUpperCase()));
        filtered = searched;
    }
    if (stat != "all"){
        filtered = filtered.filter(tenant => tenant.Bstatus == stat.toUpperCase());
    }
    if (rm != "all"){
        filtered = filtered.filter(tenant => tenant.Broom == rm);
    }
    displayTenants(filtered);

}

if(document.body.id == "roomS"){
    window.onload = function() {
        displayRooms();
    };
}
    let tbr = document.getElementById("tbody-rooms");
    function displayRooms(){
    tbr.innerHTML = "";

        rooms.forEach((room) => {
            let tr = document.createElement("tr");  
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");

            let del = document.createElement("button");
            let up = document.createElement("button");
            room.Availbed = room.Rcap;
            let b = boarders.filter((t) => t.Broom == room.Rnum);
            room.Availbed -= b.length;

            td1.textContent = room.Rnum;
            td2.textContent = room.Rcap;
            td3.textContent = `${room.Availbed} / 6`;
            if (room.Availbed == 0){
                room.stat = "OCCUPIED";
            }
            else{
                room.stat = "AVAILABLE";
            }
            td4.textContent = room.stat;

            (room.stat == "AVAILABLE") ? td4.style.color = "lightgreen" : td4.style.color = "red";
            td5.id = "act";
            up.textContent = "Update";
            up.className = "update";
            up.setAttribute("popoverTarget", "popUpdateRoom");
            del.textContent = "Delete";
            del.className = "delete";

            td5.append(up, del);
            tbr.appendChild(tr);
            tr.append(td1, td2, td3, td4, td5);
            
        });
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }
//DISPLAY TENANTS
function displayTenants(list){
    tb.innerHTML = "";
    let date = new Date();

    let d = rows * pg;
    if (d > list.length){
        d = list.length;
    }
    let ind = (pg == 1) ? pg - 1 : rows * pg - rows;

    for (let i = ind; i < d; i++){
        let tb = document.getElementById("tbody");
        let tr = document.createElement("tr");  
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let del = document.createElement("button");
        let up = document.createElement("button");
        td4.textContent = list[i].Bstatus;
        if (date >= PaymentDue(list[i].Bdate)){
            list[i].Bstatus = "UNPAID";
            td4.textContent = list[i].Bstatus;
        }
        else{
            list[i].Bstatus = "PAID";
            td4.textContent = list[i].Bstatus;
        }
        (list[i].Bstatus == "PAID") ? td4.style.color = "lightgreen" : td4.style.color = "red";
        td1.textContent = list[i].Bname;
        td2.textContent = list[i].Broom;
        td3.textContent = list[i].Bdate;
        td5.id = "act";

        up.textContent = "Update";
        up.className = "update";    
        up.setAttribute("onclick", "darkUp()");
        up.setAttribute("popoverTarget", "popUpdate");
        del.textContent = "Delete";
        del.className = "delete";

        td5.append(up, del);
        tb.appendChild(tr);
        tr.append(td1, td2, td3, td4, td5);
    }
    localStorage.setItem("boarders", JSON.stringify(list));
}


if (document.body.id == "roomS"){

    document.getElementById("tbody-rooms").addEventListener('click', function(e){
        e.preventDefault();

        if (e.target.classList.contains("delete")){
            Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed){
                    let tr = e.target.closest("tr");
                    let td = tr.querySelectorAll("td");
                    rooms = rooms.filter((room) => room.Rnum != td[0].textContent);
                    localStorage.setItem("rooms", JSON.stringify(rooms));
                    tbr.removeChild(tr);
                    displayRooms();
                    Swal.fire(
                        "Deleted!",
                        "The item has been removed.",
                        "success"
                    );
                }
            });
        }
        else if (e.target.classList.contains("update")){
            let tr = e.target.closest("tr");
            let td = tr.querySelectorAll("td");

            
        }
    });

    document.getElementById("popR").addEventListener('submit', function(e){
    e.preventDefault();
    addRooms();
    document.getElementById("rn").value = "";
    document.getElementById("cn").value = "";
    document.getElementById("ab").value = "";
    document.getElementById("op").style.display = "none";
    this.hidePopover();
    });
}
if (document.body.id == "board"){
    console.log(boarders);
    //FILTERS

    document.getElementById("searchBtn").addEventListener('click', function(e){
        e.preventDefault();
        filter();
    });

    document.getElementById("selectStatus").addEventListener('change', function(){
        filter();
    });
    document.getElementById("selectRoom").addEventListener('change', function(){
        filter();
    });

    //UPDATE AND DELETE
    document.getElementById("tbody").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")){     
            Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed){
                    const tr = e.target.closest("tr");
                    const td = tr.querySelectorAll("td");  
                    boarders = boarders.filter(tenant => tenant.Bname != td[0].textContent);
                    localStorage.setItem("boarders", JSON.stringify(boarders));
                    const tb = document.getElementById("tbody");
                    tb.removeChild(tr);
                    popUp();
                    filter();
                    Swal.fire(
                        "Deleted!",
                        "The item has been removed.",
                        "success"
                    );
                }
            });
        }
        else if (e.target.classList.contains("update")){

            const tr = e.target.closest("tr");
            const td = tr.querySelectorAll("td");
            let fname = td[0].textContent;
            let s = fname.split(" ");
            let ind = tr.rowIndex - 1;

            if (s[2] != undefined){
                document.getElementById("fnU").value = s[0] + " " + s[1];
                document.getElementById("lnU").value = s[2];
            }
            else{
                document.getElementById("fnU").value = s[0];
                document.getElementById("lnU").value = s[1];
            }
            document.getElementById("rnU").value = td[1].textContent;
            document.getElementById("dateU").value = td[2].textContent;
            document.getElementById("selU").value = td[3].textContent;

            document.getElementById("popUpdate").addEventListener('submit', function(e){
            e.preventDefault();
            
            let full = document.getElementById("fnU").value + " " + document.getElementById("lnU").value;
            
            boarders[ind].Bname = full.toUpperCase();
            boarders[ind].Broom = document.getElementById("rnU").value;
            boarders[ind].Bdate = document.getElementById("dateU").value;
            boarders[ind].Bstatus = document.getElementById("selU").value.toUpperCase();

            localStorage.setItem("boarders", JSON.stringify(boarders));

            td[0].textContent = boarders[ind].Bname;
            td[1].textContent = boarders[ind].Broom;
            td[2].textContent = boarders[ind].Bdate;
            td[3].textContent = boarders[ind].Bstatus;
            this.hidePopover();
            filter();
            Swal.fire({
                title: "Updated!",
                text: "The record has been successfully updated.",
                icon: "success",
                confirmButtonText: "OK"
                });
            });
        }
    }); 

    document.getElementById("pop").addEventListener('submit', function(e){
    e.preventDefault();
    
    addTenants();
    document.getElementById("fn").value = "";
    document.getElementById("ln").value = "";
    document.getElementById("rn").value = "";
    document.getElementById("date").value = "";
    document.getElementById("sel").value = "";
    this.hidePopover();
    document.getElementById("op").style.display = "none";
    });
}
if (document.body.id == "dashboard" || document.body.id == "board" || document.body.id == "roomS" || document.body.id == "paymentBody"){
document.getElementById("log").addEventListener('click', function(){
     Swal.fire({
        title: "Are you sure you want to log out?",
        text: "You will need to log in again to access your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, log me out",
        cancelButtonText: "Stay logged in"
    }).then((result) =>{
        if (result.isConfirmed){
            window.location.href = "/BHSystem/login.html";
        }
    });
});
}

function runChart(){
    const yValues = [rooms.length, occupied.length];
    const xValues = ["Total Rooms", "Occupied Rooms"];
    const barColors = [
    "#1ba1ed",
    "red",
    ];

    new Chart("myChart", {
        type: "doughnut",
        data: {
            fontColor: "white",
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Total Rooms Overview",
                fontSize: 20,
                fontColor: "white"
            }
        }
    });
}
function graphGender(){
    const xValues = ["Total Tenants", "Unpaid Tenants"];
    const yValues = [boarders.length, unp.length];
    const barColors = ["#1ba1ed", "red"];

    new Chart("myGraph", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        fontColor: "white",
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true,
            max: 30,
            fontColor: "white"
            },
            gridLines: {
             color: "white"
            }
        }]
        },

        title: {
        display: true,
        text: "Tenant Status Overview",
        fontSize: 25,
        fontColor: "white",
        padding: 30
        }
    }
    });
}