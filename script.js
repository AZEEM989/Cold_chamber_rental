

function calculateTotal() {
    let  BOX_WEIGHT= parseFloat(document.getElementById("weight").value) || 0;
    let BOX_QUANTITY= parseFloat(document.getElementById("quantity").value) || 0;
    let TOTAL_AMOUNT= BOX_WEIGHT * BOX_QUANTITY * 4; // ₹3 per kg
    document.getElementById("total").value = TOTAL_AMOUNT;
    calculateBalance();
}

function calculateBalance() {
    let TOTAL_AMOUNT = parseFloat(document.getElementById("total").value) || 0;
    let PAID_AMOUNT = parseFloat(document.getElementById("paid").value) || 0;
    let UNPAID_AMOUNT = TOTAL_AMOUNT - PAID_AMOUNT;
    document.getElementById("balance").value = UNPAID_AMOUNT;
}

function submitData() {
    let NAME = document.getElementById("name").value;
    let ADDRESS = document.getElementById("address").value;
    let MOBILE_NO= document.getElementById("mobile").value;
    let LOT_NO= document.getElementById("lotno").value;
    let fruit = document.getElementById("fruit").value;
    let BOX_WEIGHT = document.getElementById("weight").value;
    let BOX_QUANTITY= document.getElementById("quantity").value;
    let TOTAL_AMOUNT = document.getElementById("total").value;
    let PAID_AMOUNT= document.getElementById("paid").value;
    let  UNPAID_AMOUNT= document.getElementById("balance").value;
    
    let data = { NAME, ADDRESS, MOBILE_NO, LOT_NO,fruit, BOX_WEIGHT, BOX_QUANTITY, TOTAL_AMOUNT, PAID_AMOUNT, UNPAID_AMOUNT };
    fetch('http://127.0.0.1:5000/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    
    .then(response => response.json())
    .then(result => {
        alert(result.message || "Data Submitted Successfully!");
    })
    .catch(error => console.error('Error:', error));
}