// DASHBOARD JS

const dashboard = document.getElementById("dashboard");
const production = document.getElementById("production");
const sales = document.getElementById("sales");
const expenses = document.getElementById("expenses");
const inventory = document.getElementById("inventory");

const features = [dashboard, production, sales, expenses];

function navigate(where){

    features.forEach((fe) => {
        if (fe.id != where) fe.style.display = "none";
    });

    const feature = document.getElementById(where);
    feature.style.display = "flex";

    if (window.innerWidth <= 850){
        document.getElementById("navUL").style.display = "none";
    }
}


// PRODUCTION JS


const submitBtn = document.getElementById("submitEgg");
const cancelBtn = document.getElementById("cancelProduction");
const addEgg = document.getElementById("addEgg");
const productionForm = document.getElementById("addEggForm");
const overlay = document.getElementById("overlay");   
const tbody = document.getElementById("production-tbody");


addEgg.addEventListener('click', () => {

    productionForm.style.display = "flex"
    overlay.style.display = "flex"

});

let productionData = JSON.parse(localStorage.getItem("productionData")) || [];

submitBtn.addEventListener('click', (e) => {

    e.preventDefault();

    let dateCollected = document.getElementById("date-collected").value;
    let smallSize = document.getElementById("small").value;
    let mediumSize = document.getElementById("medium").value;
    let largeSize = document.getElementById("large").value;
    let extraL = document.getElementById("extra-large").value;

    let isExist = productionData.some((item) => item.date == dateCollected);

    if (isExist){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Date already exist!",
        });
        return;
    }

    if (!dateCollected || !smallSize || !mediumSize || !largeSize || !extraL){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input something.",
        });
        return;
    }
    let total = parseInt(smallSize) + parseInt(mediumSize) + parseInt(largeSize) + parseInt(extraL);

    productionForm.style.display = "none";
    overlay.style.display = "none";
    
    Swal.fire({
        title: "Production Added!",
        text: "The egg production record has been successfully saved.",
        icon: "success",
        confirmButtonText: "OK"
    });

    productionData.push({
        date: dateCollected,
        small: parseInt(smallSize),
        medium: parseInt(mediumSize),
        large: parseInt(largeSize),
        extraLarge: parseInt(extraL),
        total: parseInt(total)
    });

    localStorage.setItem("productionData", JSON.stringify(productionData));

    displayProduction();
    productionForm.reset();  

});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    productionForm.style.display = "none"
    overlay.style.display = "none"
    productionForm.reset();  

});

function displayProduction(){

    tbody.innerHTML = "";
    let dateNow = new Date();
    let dateToday = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')}`;
    let small = 0, medium = 0, large = 0, extraLarge = 0, totalEggs = 0, eggsToday = 0;

    productionData.forEach((item) => {

        addProduction(item.date, item.small, item.medium, item.large, item.extraLarge, item.total);

        small += item.small;
        medium += item.medium;
        large += item.large;
        extraLarge += item.extraLarge;
        totalEggs += item.total;

        if (item.date == dateToday){
            eggsToday = item.total;
        }

    });

    document.getElementById("good-eggs").textContent = parseInt(small) + parseInt(medium) + parseInt(large) + parseInt(extraLarge);
    document.getElementById("total-today").textContent = eggsToday;
    document.getElementById("total-eggs").textContent = totalEggs;
    document.getElementById("production-eggs").textContent = totalEggs;
    
    
}

function addProduction(date, small, medium, large, cracked, total){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    td1.textContent = date;
    td2.textContent = small;
    td3.textContent = medium;
    td4.textContent = large;
    td5.textContent = cracked;
    td6.textContent = total;
    td7.id = "actions";

    updateBtn.className = "update";
    updateBtn.textContent = "Update";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    td7.append(updateBtn, deleteBtn);

    tr.append(td1, td2, td3, td4, td5, td6, td7);
    tbody.appendChild(tr);
}

displayProduction();

const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");

tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")){
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const td = e.target.parentElement;
                const tr = td.parentElement;
                const tds = tr.querySelectorAll("td");
                tbody.removeChild(tr);

                productionData = productionData.filter(b => b.date != tds[0].textContent);
                localStorage.setItem("productionData", JSON.stringify(productionData));

                displayProduction();
                
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });

    }
})




// SALES JS

const salesForm = document.getElementById("addSalesForm");
const salesAdd = document.getElementById("addSales");
const cancelSales = document.getElementById("cancelSales");
const overlay2 = document.getElementById("overlay2");
const submitSales = document.getElementById("submitSales");
const salesTbody = document.getElementById("sales-tbody");
const selectBuy = document.getElementById("buy-type");
const trays = document.getElementById("trays-inputs");
const pieces = document.getElementById("pieces-inputs");

salesAdd.addEventListener('click', () => {
    salesForm.style.display = "flex";
    overlay2.style.display = "flex";

    trays.style.display = "flex";
    pieces.style.display = "none";
})

let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

selectBuy.addEventListener('change', () => {
        if (selectBuy.value == "trays") {
            trays.style.display = "flex";
            pieces.style.display = "none";
        }
        else if (selectBuy.value == "pieces") {
            pieces.style.display = "flex";
            trays.style.display = "none";
        }
        else {
            trays.style.display = "flex";
            pieces.style.display = "flex";
        }
})

submitSales.addEventListener('click', (e) => {
    
    e.preventDefault();

    let dateSold = document.getElementById("sales-date").value;
    let sizeSold = document.getElementById("sizes").value;
    let quantityTrays = document.getElementById("sales-trays").value;
    let quantityPieces = document.getElementById("sales-pieces").value;
    let salesPrice = document.getElementById("sales-price").value;

    // let isExist = salesData.some((item) => item.date == dateSold);
    // let insuficientSmall = productionData.some((item) => item.small < (quantity * 30));
    // let insuficientMedium = productionData.some((item) => item.medium < (quantity * 30));
    // let insuficientLarge = productionData.some((item) => item.large < (quantity * 30));

    // if (sizeSold == "small" && insuficientSmall){
    //     alert("insuficient stock for small");
    //     return;
    // }
    // if (sizeSold == "medium" && insuficientMedium){
    //     alert("insuficient stock for medium");
    //     return;
    // }
    // if (sizeSold == "large" && insuficientLarge){
    //     alert("insuficient stock for large");
    //     return;
    // }

    // if (isExist){
    //     alert("cannot be duplicate date");
    //     return;
    // }

    if (trays.style.display == "flex" && pieces.style.display == "flex"){
        if (!quantityTrays || !quantityPieces){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }
    }
    if (trays.style.display == "flex" && pieces.style.display != "flex"){
        quantityPieces = 0;
        if (!quantityTrays){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }

    }
    if (trays.style.display != "flex" && pieces.style.display == "flex"){
        quantityTrays = 0;
        if (!quantityPieces){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }
    }

    if (!dateSold || !salesPrice){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input something.",
        });
        return;
    }
    let totalTrays = parseInt(quantityTrays) * parseInt(salesPrice);
    let totalPieces = parseInt(quantityPieces) * (parseInt(salesPrice) / 30);
    let total = totalTrays + totalPieces;

    salesForm.style.display = "none";
    overlay2.style.display = "none";
    
    Swal.fire({
        title: "Sale Recorded!",
        text: "The sales transaction has been successfully saved.",
        icon: "success",
        confirmButtonText: "OK"
    });

    salesData.push({
        date: dateSold,
        size: sizeSold,
        trays: parseInt(quantityTrays),
        pieces:parseInt(quantityPieces),
        price: parseInt(salesPrice),
        total: parseInt(total)
    });

    localStorage.setItem("salesData", JSON.stringify(salesData));

    salesForm.reset();
    displaySales();
    showProfit();
})

cancelSales.addEventListener('click', (e) => {

    e.preventDefault();

    salesForm.style.display = "none";
    overlay2.style.display = "none";

    salesForm.reset();
})

function displaySales(){

    salesTbody.innerHTML = "";
    let dateNow = new Date();
    let dateToday = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')}`;
    let soldToday = 0, salesToday = 0, totalSales = 0, totalSold = 0, traysSold = 0, piecesSold = 0, piecesToday = 0, piecesTotal = 0;

    salesData.forEach((item) => {
        addSales(item.date, item.size, `${item.trays} Trays and ${item.pieces} Pieces`, item.price, item.total);

        totalSales += item.total;
        traysSold = item.trays;
        piecesSold += item.pieces;

        totalSold += traysSold + Math.floor(piecesSold / 30);
        piecesSold = piecesSold - (Math.floor(piecesSold / 30) * 30);

        console.log(traysSold);
        if (item.date == dateToday){
            salesToday += item.total;
            soldToday += item.trays;
            piecesTotal += item.pieces;

            piecesToday += soldToday + Math.floor(piecesTotal / 30);
            piecesTotal = piecesTotal - (Math.floor(piecesTotal / 30) * 30);
        }

    })
            console.log(totalSold);


    document.getElementById("sales-today").textContent = `₱${salesToday}`;
    document.getElementById("sold-today").textContent = `${piecesToday} Trays and ${piecesTotal} Pieces`;
    document.getElementById("sales-total").textContent = `₱${totalSales}`;
    document.getElementById("total-sold").textContent = `${totalSold} Trays and ${piecesSold} Pieces`;
    document.getElementById("total-revenue").textContent = `₱${totalSales}`;

}

function addSales(date, size, quantity, price, total){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    td1.textContent = date;
    td2.textContent = size;
    td3.textContent = quantity;
    td4.textContent = `₱${price}`;
    td5.textContent = `₱${total}`;
    td6.id = "actions";

    updateBtn.className = "update";
    updateBtn.textContent = "Update";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    td6.append(updateBtn, deleteBtn);

    tr.append(td1, td2, td3, td4, td5, td6);
    salesTbody.appendChild(tr);
}

displaySales();

salesTbody.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")){
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const td = e.target.parentElement;
                const tr = td.parentElement;
                const tds = tr.querySelectorAll("td");

                salesTbody.removeChild(tr);

                salesData = salesData.filter((item) => item.date != tds[0].textContent);
                localStorage.setItem("salesData", JSON.stringify(salesData));

                displaySales();
                showProfit();
                
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });
        
    }
})



// EXPENSES JS


const expensesForm = document.getElementById("addExpensesForm");
const expensesAdd = document.getElementById("addExpenses");
const cancelExpenses = document.getElementById("cancelExpenses");
const overlay3 = document.getElementById("overlay3");
const submitExpenses = document.getElementById("submitExpenses");
const expensesTbody = document.getElementById("expenses-tbody");

expensesAdd.addEventListener('click', () => {
    expensesForm.style.display = "flex";
    overlay3.style.display = "flex";
})

let expensesData = JSON.parse(localStorage.getItem("expensesData")) || [];

submitExpenses.addEventListener('click', (e) => {
    
    e.preventDefault();

    let dateExpenses = document.getElementById("expenses-date").value;
    let categoryExpenses = document.getElementById("category").value;
    let expensesDesc = document.getElementById("expenses-desc").value;
    let expensesAmount = document.getElementById("expenses-amount").value;

    // let isExist = expensesData.some((item) => item.date == dateExpenses);

    if (parseInt(expensesAmount) <= 0){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input only natural numbers.",
        });
        return;
    }

    // if (isExist){
    //     alert("cannot be duplicate date");
    //     return;
    // }

    if (!dateExpenses || !expensesDesc || !expensesAmount){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input something.",
        });
        return;
    }

    expensesForm.style.display = "none";
    overlay3.style.display = "none";
    
    Swal.fire({
        title: "Expenses Added!",
        text: "The expenses record has been successfully saved.",
        icon: "success",
        confirmButtonText: "OK"
    });

    expensesData.push({
        date: dateExpenses,
        category: categoryExpenses,
        description: expensesDesc,
        amount: parseInt(expensesAmount)
    });

    localStorage.setItem("expensesData", JSON.stringify(expensesData));

    expensesForm.reset();
    displayExpenses();
    showProfit();
})

cancelExpenses.addEventListener('click', (e) => {

    e.preventDefault();

    expensesForm.style.display = "none";
    overlay3.style.display = "none";

    expensesForm.reset();
})
// let dateNow = new Date();
// console.log(expensesData[0].date);
// console.log(String(dateNow.getMonth() + 1).padStart(2, '0'));
function displayExpenses(){

    expensesTbody.innerHTML = "";
    let dateNow = new Date();
    let dateToday = String(dateNow.getMonth() + 1).padStart(2, '0');
    let totalExpenses = 0, thisMonth = 0;

    expensesData.forEach((item) => {
        addExpenses(item.date, item.category, item.description, item.amount);

        totalExpenses += item.amount;

        let month = item.date.split('-')[1];

        if (month == dateToday){
            thisMonth += item.amount;
        }

    })

    document.getElementById("expenses-month").textContent = `₱${thisMonth}`;
    document.getElementById("expenses-total").textContent = `₱${totalExpenses}`;
    document.getElementById("total-expenses").textContent = `₱${totalExpenses}`;

}

function addExpenses(date, category, desc, amount){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    td1.textContent = date;
    td2.textContent = category;
    td3.textContent = desc;
    td4.textContent = `₱${amount}`;
    td5.id = "actions";

    updateBtn.className = "update";
    updateBtn.textContent = "Update";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    td5.append(updateBtn, deleteBtn);

    tr.append(td1, td2, td3, td4, td5);
    expensesTbody.appendChild(tr);
}

displayExpenses();


expensesTbody.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const td = e.target.parentElement;
                const tr = td.parentElement;
                const tds = tr.querySelectorAll("td");

                expensesTbody.removeChild(tr);

                expensesData = expensesData.filter((item) => item.date != tds[0].textContent);
                localStorage.setItem("expensesData", JSON.stringify(expensesData));

                displayExpenses();
                showProfit();

                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });
    }
})



// PROFIT

function showProfit(){
    let totalE = 0, totalS = 0, profit = 0;

    expensesData.forEach((item) => {
        totalE += item.amount;
    })
    salesData.forEach((item) => {
        totalS += item.total;
    })

    profit =  totalS - totalE;
    document.getElementById("total-profit").textContent = `₱${profit}`;
    
}

showProfit();



// CHARTS AND GRAPHS

var ctx1 = document.getElementById("myGraph").getContext("2d");

    new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Egg Production",
                data: [120, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(137, 43, 226, 0.2)",
                borderColor: "blueviolet",
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: "blueviolet",
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var ctx2 = document.getElementById("myChart").getContext("2d");

    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Feeds", "Medicine", "Labor", "Utilities", "Misc"],
            datasets: [{
                label: "Monthly Expenses",
                data: [8000, 2500, 5000, 3200, 1500],
                backgroundColor: [
                    "rgba(137, 43, 226, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

var ctx3 = document.getElementById("mySales").getContext("2d");

new Chart(ctx3, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Small Eggs",
        data: [30, 40, 35, 50],
        backgroundColor: "rgba(137, 43, 226, 0.7)"
      },
      {
        label: "Medium Eggs",
        data: [20, 25, 30, 40],
        backgroundColor: "rgba(54, 162, 235, 0.7)"
      },
      {
        label: "Large Eggs",
        data: [10, 15, 20, 25],
        backgroundColor: "rgba(255, 159, 64, 0.7)"
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


const burgerBtn =document.getElementById("burger");
let isOpen = false;

burgerBtn.addEventListener('click', () => {

    if (!isOpen){
        document.getElementById("navUL").style.display = "flex";
        isOpen = true;
    }
    else{
        document.getElementById("navUL").style.display = "none";
        isOpen = false;
    }
})
