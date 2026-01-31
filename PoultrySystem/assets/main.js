
function logOut(){
    Swal.fire({
            title: "Log out",
            text: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log out"
    }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Success!",
                    text: "Log out successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    window.location.href = "../index.html";
                })
            }
    })
}

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
const update = document.getElementById("updateEgg");


addEgg.addEventListener('click', () => {

    productionForm.style.display = "flex"
    overlay.style.display = "flex"
    document.getElementById("forUpdate").textContent = "Production Form";
    document.getElementById("dateUpdate").style.display = "flex";
    submitBtn.style.display = "flex";
    update.style.display = "none";

});

let productionData = JSON.parse(localStorage.getItem("productionData")) || [];
let idData = JSON.parse(localStorage.getItem("id")) || Array(1).fill(0);

submitBtn.addEventListener('click', (e) => {

    e.preventDefault();
    try{
        let dateCollected = document.getElementById("date-collected").value;
        let smallSize = parseInt(document.getElementById("small").value);
        let mediumSize = parseInt(document.getElementById("medium").value);
        let largeSize = parseInt(document.getElementById("large").value);
        let extraL = parseInt(document.getElementById("extra-large").value);

        let isExist = productionData.some((item) => item.date == dateCollected);

        if (isExist){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Date already exist!",
            });
            return;
        }

        if (smallSize == "-0" || mediumSize == "-0" || largeSize == "-0" || extraL == "-0"){
            Swal.fire({
                icon: "error",  
                title: "Invalid!",
                text: "Please input natural numbers",
            });
            return;
        }

        if (parseInt(smallSize) < 0 || parseInt(mediumSize) < 0 || parseInt(largeSize) < 0 || parseInt(extraL) < 0){
            Swal.fire({
                icon: "error",  
                title: "Invalid!",
                text: "Please input natural numbers",
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

        idData[0] += 1;

        productionData.push({
            id: `P${idData[0]}`,
            date: dateCollected,
            small: parseInt(smallSize),
            medium: parseInt(mediumSize),
            large: parseInt(largeSize),
            extraLarge: parseInt(extraL),
            total: parseInt(total)
        });

        checkMonthly();
        localStorage.setItem("id", JSON.stringify(idData));
        localStorage.setItem("productionData", JSON.stringify(productionData));

        productionChart();

        displayProduction();
        productionForm.reset();  
    }
    catch (error){
        Swal.fire({
                icon: "error",  
                title: "Invalid!",
                text: "Please input natural numbers",
        });
        return;
    }
});

let mp = JSON.parse(localStorage.getItem("monthlyProduced")) || Array(12).fill(0);

function checkMonthly(){
    let date = new Date();
    let tots = 0;
    productionData.forEach((item) => {
        if (item.date.split("-")[1] == String(date.getMonth() + 1).padStart(2, '0')){
            tots += item.total;
        }
    })
    mp[date.getMonth()] = tots;
    localStorage.setItem("monthlyProduced", JSON.stringify(mp));
}

checkMonthly();

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    productionForm.style.display = "none"
    overlay.style.display = "none"
    productionForm.reset();  

});

function displayProduction(){

    tbody.innerHTML = "";
    let dateNow = new Date();
    let dateMonth = String(dateNow.getMonth() + 1).padStart(2, '0');
    let dateToday = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')}`;
    let small = 0, medium = 0, large = 0, extraLarge = 0, totalEggs = 0, eggsToday = 0, thisMonth = 0;

    productionData.forEach((item) => {

        addProduction(item.id, item.date, item.small, item.medium, item.large, item.extraLarge, item.total);

        small += item.small;
        medium += item.medium;
        large += item.large;
        extraLarge += item.extraLarge;
        totalEggs += item.total;

        if (item.date == dateToday){
            eggsToday = item.total;
        }

        let month = item.date.split('-')[1];

        if (month == dateMonth){
            thisMonth += item.total;
        }

    });

    document.getElementById("good-eggs").textContent = thisMonth;
    document.getElementById("total-today").textContent = eggsToday;
    document.getElementById("total-eggs").textContent = totalEggs;
    document.getElementById("production-eggs").textContent = totalEggs;
    
    
}

function addProduction(id, date, small, medium, large, cracked, total){
    const tr = document.createElement("tr");
    const idT = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    idT.textContent = id;
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

    tr.append(idT, td1, td2, td3, td4, td5, td6, td7);
    tbody.appendChild(tr);
}

displayProduction();

const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");
let idUp;

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

                productionData = productionData.filter(b => b.id != tds[0].textContent);
                localStorage.setItem("productionData", JSON.stringify(productionData));

                displayProduction();
                checkMonthly();
                productionChart();

                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });

    }
    else if (e.target.classList.contains("update")){
        let smallSize = document.getElementById("small");
        let mediumSize = document.getElementById("medium");
        let largeSize = document.getElementById("large");
        let extraL = document.getElementById("extra-large");

        const td = e.target.parentElement;
        const tr = td.parentElement;
        const tds = tr.querySelectorAll("td");
        idUp = tds[0].textContent;
        smallSize.value = tds[2].textContent;
        mediumSize.value = tds[3].textContent;
        largeSize.value = tds[4].textContent;
        extraL.value = tds[5].textContent;
        
        document.getElementById("addEggForm").style.display = "flex";
        document.getElementById("forUpdate").textContent = "Update Form";
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("dateUpdate").style.display = "none";

        submitBtn.style.display = "none";
        update.style.display = "flex";

    }
})

    update.addEventListener('click', (e) => {

            e.preventDefault();

            let smallSize = document.getElementById("small");
            let mediumSize = document.getElementById("medium");
            let largeSize = document.getElementById("large");
            let extraL = document.getElementById("extra-large");

            if (!smallSize.value || !mediumSize.value || !largeSize.value || !extraL.value){
                Swal.fire({
                    icon: "error",
                    title: "Invalid!",
                    text: "Please input something.",
                });
                return;
            }
            let total = parseInt(smallSize.value) + parseInt(mediumSize.value) + parseInt(largeSize.value) + parseInt(extraL.value);

            productionForm.style.display = "none";
            overlay.style.display = "none";
            
            Swal.fire({
                title: "Updated successfully!",
                text: "The egg production record has been successfully updated.",
                icon: "success",
                confirmButtonText: "OK"
            });
            
            // mao ni problema

            productionData.forEach((item) => {
                if (item.id == idUp){
                    item.small = smallSize.value;
                    item.medium = mediumSize.value;
                    item.large = largeSize.value;
                    item.extraLarge = extraL.value;
                    item.total = total;
                }
            })

            localStorage.setItem("productionData", JSON.stringify(productionData));

            productionChart();
            checkMonthly();
            displayProduction();
            productionForm.reset();  

    });

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
const updateSales = document.getElementById("updateSales");

salesAdd.addEventListener('click', () => {
    salesForm.style.display = "flex";
    overlay2.style.display = "flex";

    trays.style.display = "flex";
    pieces.style.display = "none";

    submitSales.style.display = "flex";
    updateSales.style.display = "none";
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

let idSales = JSON.parse(localStorage.getItem("id")) || Array(1).fill(0);

submitSales.addEventListener('click', (e) => {
    
    e.preventDefault();

    let dateSold = document.getElementById("sales-date").value;
    let sizeSold = document.getElementById("sizes").value;
    let quantityTrays = document.getElementById("sales-trays").value;
    let quantityPieces = document.getElementById("sales-pieces").value;
    let salesPrice = document.getElementById("sales-price").value;

    if (trays.style.display == "flex" && pieces.style.display == "flex"){
        if (parseInt(quantityTrays) < 0 || parseInt(quantityPieces) < 0 || quantityTrays == "-0" || quantityPieces == "-0"){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input natural numbers.",
            });
            return;
        }
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
        if (parseInt(quantityTrays) < 0 || quantityTrays == "-0"){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input natural numbers.",
            });
            return;
        }
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
        if (parseInt(quantityPieces) < 0 || quantityPieces == "-0"){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input natural numbers.",
            });
            return;
        }
        if (!quantityPieces){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }
    }

    if (parseInt(salesPrice) <= 0 || salesPrice == "-0"){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input natural numbers.",
        });
        return;
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

    idSales[0] += 1;

    salesData.push({
        id: `S${idSales}`,
        date: dateSold,
        size: sizeSold,
        trays: parseInt(quantityTrays),
        pieces:parseInt(quantityPieces),
        price: parseInt(salesPrice),
        total: parseInt(total)
    });

    localStorage.setItem("salesData", JSON.stringify(salesData));
    localStorage.setItem("id", JSON.stringify(idSales));

    salesChart();
    checkSales();       
    displaySales();
    showProfit();

    salesForm.reset();
})


let salesCat = JSON.parse(localStorage.getItem("salesCat")) || Array(4).fill(0);
let sm = JSON.parse(localStorage.getItem("salesMonth")) || Array(12).fill(0);

function checkSales(){

    let date = new Date();
    let small = 0, medium = 0, large = 0, exL = 0;

    salesData.forEach((item) => {
        if (item.date.split("-")[1] == String(date.getMonth() + 1).padStart(2, '0')){
            switch(item.size){
                case "small":
                    small += (item.trays * 30) + item.pieces;
                    break;
                case "medium":
                    medium += (item.trays * 30) + item.pieces;
                    break;
                case "large":
                    large += (item.trays * 30) + item.pieces;
                    break;
                case "extra-large":
                    exL += (item.trays * 30) + item.pieces;
                    break;
            }
        }
    })
    salesCat[0] = small;
    salesCat[1] = medium;
    salesCat[2] = large;
    salesCat[3] = exL;

    localStorage.setItem("salesCat", JSON.stringify(salesCat));

    sm[date.getMonth()] = [...salesCat];
    localStorage.setItem("salesMonth", JSON.stringify(sm));
}

checkSales();


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
        addSales(item.id, item.date, item.size, item.trays, item.pieces, item.price, item.total);

        totalSales += parseInt(item.total);
        traysSold = parseInt(item.trays);
        piecesSold += parseInt(item.pieces);

        totalSold += traysSold + Math.floor(piecesSold / 30);
        piecesSold = piecesSold - (Math.floor(piecesSold / 30) * 30);

        if (item.date == dateToday){
            salesToday += parseInt(item.total);
            soldToday += parseInt(item.trays);
            piecesTotal += parseInt(item.pieces);

            piecesToday = soldToday + Math.floor(piecesTotal / 30);
            piecesTotal = piecesTotal - (Math.floor(piecesTotal / 30) * 30);
        }

    })

    document.getElementById("sales-today").textContent = `₱${salesToday}`;
    document.getElementById("sold-today").textContent = `${piecesToday} Trays and ${piecesTotal} Pieces`;
    document.getElementById("sales-total").textContent = `₱${totalSales}`;
    document.getElementById("total-sold").textContent = `${totalSold} Trays and ${piecesSold} Pieces`;
    document.getElementById("total-revenue").textContent = `₱${totalSales}`;

}


function addSales(id, date, size, trays, piece, price, total){
    const tr = document.createElement("tr");
    const idS = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");


    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    idS.textContent = id;
    td1.textContent = date;
    td2.textContent = size;
    td3.textContent = trays;
    td4.textContent = piece;
    td5.textContent = `₱${price}`;
    td6.textContent = `₱${total}`;
    td7.id = "actions";

    updateBtn.className = "update";
    updateBtn.textContent = "Update";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    td7.append(updateBtn, deleteBtn);

    tr.append(idS, td1, td2, td3, td4, td5, td6, td7);
    salesTbody.appendChild(tr);
}

displaySales();
let idS;


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

                salesData = salesData.filter((item) => item.id != tds[0].textContent);
                localStorage.setItem("salesData", JSON.stringify(salesData));

                displaySales();
                showProfit();
                salesChart();
                checkSales();       
                
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });
        
    }
    else if (e.target.classList.contains("update")){
        let dateSold = document.getElementById("sales-date");
        let sizeSold = document.getElementById("sizes");
        let quantityTrays = document.getElementById("sales-trays");
        let quantityPieces = document.getElementById("sales-pieces");
        let salesPrice = document.getElementById("sales-price");

        // let totalTrays = parseInt(quantityTrays) * parseInt(salesPrice);
        // let totalPieces = parseInt(quantityPieces) * (parseInt(salesPrice) / 30);
        // let total = totalTrays + totalPieces;

        const td = e.target.parentElement;
        const tr = td.parentElement;
        const tds = tr.querySelectorAll("td");
        idS = tds[0].textContent;

        dateSold.value = tds[1].textContent;
        sizeSold.value = tds[2].textContent;
        quantityTrays.value = tds[3].textContent;
        quantityPieces.value = tds[4].textContent;
        salesPrice.value = parseInt(tds[5].textContent.slice(1, tds[5].length));

        salesForm.style.display = "flex";
        overlay2.style.display = "flex";
        document.getElementById("forSales").textContent = "Update Form";

        submitSales.style.display = "none";
        updateSales.style.display = "flex";

    }
})

updateSales.addEventListener('click', (e) => {

    e.preventDefault();

            
    let dateSold = document.getElementById("sales-date");
    let sizeSold = document.getElementById("sizes");
    let quantityTrays = document.getElementById("sales-trays");
    let quantityPieces = document.getElementById("sales-pieces");
    let salesPrice = document.getElementById("sales-price");

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
    let totalTrays = parseInt(quantityTrays.value) * parseInt(salesPrice.value);
    let totalPieces = parseInt(quantityPieces.value) * (parseInt(salesPrice.value) / 30);
    let total = totalTrays + totalPieces;

    salesForm.style.display = "none";
    overlay2.style.display = "none";

    Swal.fire({
        title: "Updated successfully!",
        text: "The sales record has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK"
    });
            
    salesData.forEach((item) => {
        if (item.id == idS){
            item.date = dateSold.value;
            item.size = sizeSold.value;
            item.trays = parseInt(quantityTrays.value);
            item.pieces = parseInt(quantityPieces.value);
            item.price = parseInt(salesPrice.value);
            item.total = parseInt(total)
        }
    })

    localStorage.setItem("salesData", JSON.stringify(salesData));

    displaySales();
    showProfit();
    salesChart();
    checkSales();  
    salesForm.reset(); 

});


// EXPENSES JS


const expensesForm = document.getElementById("addExpensesForm");
const expensesAdd = document.getElementById("addExpenses");
const cancelExpenses = document.getElementById("cancelExpenses");
const overlay3 = document.getElementById("overlay3");
const submitExpenses = document.getElementById("submitExpenses");
const expensesTbody = document.getElementById("expenses-tbody");
const updateExpenses = document.getElementById("updateExpenses");
const selectExp = document.getElementById("category");
const others = document.getElementById("other");

expensesAdd.addEventListener('click', () => {
    expensesForm.style.display = "flex";
    overlay3.style.display = "flex";
    updateExpenses.style.display = "none";
    submitExpenses.style.display = "flex";
    others.style.display = "none";

})

selectExp.addEventListener('change', () => {
    if (selectExp.value == 'others'){
        others.style.display = "flex";
    }
    else{
        others.style.display = "none";
    }
})

let expensesData = JSON.parse(localStorage.getItem("expensesData")) || [];
let idExpenses = JSON.parse(localStorage.getItem("id")) || Array(1).fill(0);

submitExpenses.addEventListener('click', (e) => {
    
    e.preventDefault();

    let dateExpenses = document.getElementById("expenses-date").value;
    let categoryExpenses = document.getElementById("category").value;
    let expensesDesc = document.getElementById("expenses-desc").value;
    let expensesAmount = document.getElementById("expenses-amount").value;
    let expenseOther = document.getElementById("expenses-expense").value;
    let categ = "";
    // let isExist = expensesData.some((item) => item.date == dateExpenses);

    if (parseInt(expensesAmount) <= 0){
        Swal.fire({
            icon: "error",
            title: "Invalid!",
            text: "Please input only natural numbers.",
        });
        return;
    }

    if (others.style.display == "flex"){
        if (!expenseOther){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }
        else{
            categ = expenseOther;
        }
    }
    else{
        categ = categoryExpenses;
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

    idExpenses[0] += 1

    expensesData.push({
        id: `E${idExpenses}`,
        date: dateExpenses,
        category: categ,
        description: expensesDesc,
        amount: parseInt(expensesAmount)
    });

    localStorage.setItem("expensesData", JSON.stringify(expensesData));
    localStorage.setItem("id", JSON.stringify(idExpenses));

    expensesChart();
    expensesBar();
    displayExpenses();
    showProfit();
    expensesForm.reset();
})

cancelExpenses.addEventListener('click', (e) => {

    e.preventDefault();

    expensesForm.style.display = "none";
    overlay3.style.display = "none";

    expensesForm.reset();
})

let barExpensesData = JSON.parse(localStorage.getItem("expensesBar")) || Array(5).fill(0);


function expensesBar(){

    barExpensesData.fill(0);

    expensesData.forEach((item) => {

        switch (item.category){
            case "feeds":
                barExpensesData[0] += item.amount;
                break;
            case "vitamins":
                barExpensesData[1] += item.amount;
                break;
            case "gas":
                barExpensesData[2] += item.amount;
                break;
            case "foods":
                barExpensesData[3] += item.amount;
                break;
            case "parcel":
                barExpensesData[4] += item.amount;
                break;  
        }

    })

    localStorage.setItem("expensesBar", JSON.stringify(barExpensesData));
}

expensesBar();

// let dateNow = new Date();
// console.log(expensesData[0].date);
// console.log(String(dateNow.getMonth() + 1).padStart(2, '0'));
function displayExpenses(){

    expensesTbody.innerHTML = "";
    let dateNow = new Date();
    let dateToday = String(dateNow.getMonth() + 1).padStart(2, '0');
    let totalExpenses = 0, thisMonth = 0;

    expensesData.forEach((item) => {
        addExpenses(item.id, item.date, item.category, item.description, item.amount);

        totalExpenses += parseInt(item.amount);

        let month = item.date.split('-')[1];

        if (month == dateToday){
            thisMonth += parseInt(item.amount);
        }

    })

    document.getElementById("expenses-month").textContent = `₱${thisMonth}`;
    document.getElementById("expenses-total").textContent = `₱${totalExpenses}`;
    document.getElementById("total-expenses").textContent = `₱${totalExpenses}`;

}

function addExpenses(id, date, category, desc, amount){
    const tr = document.createElement("tr");
    const idE = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    idE.textContent = id;
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

    tr.append(idE, td1, td2, td3, td4, td5);
    expensesTbody.appendChild(tr);
}

displayExpenses();

let idEx;

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

                expensesData = expensesData.filter((item) => item.id != tds[0].textContent);
                localStorage.setItem("expensesData", JSON.stringify(expensesData));
     
                expensesChart();
                expensesBar();
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
    else if (e.target.classList.contains("update")){
        let dateExpenses = document.getElementById("expenses-date");
        let categoryExpenses = document.getElementById("category");
        let expensesDesc = document.getElementById("expenses-desc");
        let expensesAmount = document.getElementById("expenses-amount");
        let expenseOther = document.getElementById("expenses-expense");

        others.style.display = "none";

        const td = e.target.parentElement;
        const tr = td.parentElement;
        const tds = tr.querySelectorAll("td");

        idEx = tds[0].textContent;

        dateExpenses.value = tds[1].textContent;
        if (tds[2].textContent == "feeds" ||
            tds[2].textContent == "vitamins" ||
            tds[2].textContent == "gas" ||
            tds[2].textContent == "foods"
        ){
            categoryExpenses.value = tds[2].textContent;
        }
        else{
            others.style.display = "flex";
            categoryExpenses.value = "others";
            expenseOther.value = tds[2].textContent;
        }
        expensesDesc.value = tds[3].textContent;
        expensesAmount.value = parseInt(tds[4].textContent.slice(1, tds[4].textContent.length));

        document.getElementById("forExpenses").textContent = "Update Form";

        expensesForm.style.display = "flex";
        overlay3.style.display = "flex";
        updateExpenses.style.display = "flex";
        submitExpenses.style.display = "none";
    }
})

    updateExpenses.addEventListener('click', (e) => {
        e.preventDefault();

        let dateExpenses = document.getElementById("expenses-date").value;
        let categoryExpenses = document.getElementById("category").value;
        let expensesDesc = document.getElementById("expenses-desc").value;
        let expensesAmount = document.getElementById("expenses-amount").value;
        let expenseOther = document.getElementById("expenses-expense");
        let categ = "";

        // let isExist = expensesData.some((item) => item.date == dateExpenses);

        if (others.style.display == "flex"){
            if (!expenseOther.value){
                    Swal.fire({
                    icon: "error",
                    title: "Invalid!",
                    text: "Please input only natural numbers.",
                });
                return;
            }
            else{
                categ = expenseOther.value;
            }
        }
        else{
            categ = categoryExpenses;
        }

        if (parseInt(expensesAmount) <= 0){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input only natural numbers.",
            });
            return;
        }
        if (!dateExpenses || !expensesDesc || !expensesAmount){
            Swal.fire({
                icon: "error",
                title: "Invalid!",
                text: "Please input something.",
            });
            return;
        }

        Swal.fire({
            title: "Updated successfully!",
            text: "The expenses record has been successfully updated.",
            icon: "success",
            confirmButtonText: "OK"
        });

        expensesData.forEach((item) => {
            if (item.id == idEx){
                item.date = dateExpenses,
                item.category = categ,
                item.description = expensesDesc,
                item.amount = expensesAmount
            }
        })

        localStorage.setItem("expensesData", JSON.stringify(expensesData));

        expensesChart();
        expensesBar();
        displayExpenses();
        showProfit();
        expensesForm.style.display = "none";
        overlay3.style.display = "none";
    })

// PROFIT

function showProfit(){
    let totalE = 0, totalS = 0, profit = 0;
    netprof = document.getElementById("total-profit");
    profitImg = document.getElementById("profitImg");

    expensesData.forEach((item) => {
        totalE += item.amount;
    })
    salesData.forEach((item) => {
        totalS += item.total;       
    })

    profit =  totalS - totalE;
    if (profit > 0){
         netprof.style.color = "green";
         profitImg.style.backgroundColor = "#0ce60c29";
         profitImg.src = "../images/up.png"
    }
    else if (profit < 0){
         netprof.style.color = "red";
         profitImg.style.backgroundColor = "#e60c0c29";
         profitImg.src = "../images/loss.png"
         
    }
    netprof.textContent = `₱${profit}`;

}

showProfit();



// CHARTS AND GRAPHS



productionChart();

function productionChart() { 
    var ctx1 = document.getElementById("myGraph").getContext("2d");

    new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Egg Production",
                data: [mp[0], mp[1], mp[2], mp[3], mp[4], mp[5], mp[6], mp[7], mp[8], mp[9], mp[10], mp[11]],
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
}

expensesChart();

function expensesChart() { 
    var ctx2 = document.getElementById("myChart").getContext("2d");

    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Feeds", "Vitamins", "Gas", "Foods", "Parcel"],
            datasets: [{
                label: "Expenses bar each category",
                data: [barExpensesData[0], barExpensesData[1], barExpensesData[2], barExpensesData[3], barExpensesData[4]],
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
}

salesChart();

function salesChart() { 

    var ctx3 = document.getElementById("mySales").getContext("2d");

    new Chart(ctx3, {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
        {
            label: "Small Eggs",
            data: sm.map((item) => item[0]),
            backgroundColor: "rgba(137, 43, 226, 0.7)"
        },
        {
            label: "Medium Eggs",
            data: sm.map((item) => item[1]),
            backgroundColor: "rgba(54, 162, 235, 0.7)"
        },
        {
            label: "Large Eggs",
            data: sm.map((item) => item[2]),
            backgroundColor: "rgba(255, 159, 64, 0.7)"
        },
        {
            label: "Extra-large Eggs",
            data: sm.map((item) => item[3]),
            backgroundColor: "rgba(255, 64, 169, 0.84)"
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
}


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
