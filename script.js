//Check the product items are number
function addToCart() {
  let product = parseInt(prompt("Enter total number of items:"));
  // Asked to user untill valid number is entered
  while (isNaN(product) || product < 0) {
    product = prompt("Please enter a valid number ");
  }
}

//Check if the user have valid name
function checkout() {
  let userName = prompt("Enter your name:");
  while (!userName || !isNaN(userName)) {
    userName = prompt("Enter a valid name");
  }
  generateReceipt(userName);
}

//Array to store the cart items nd gst
const cart = [];
const gstRate = 0.13;

//Function to add items via validation through quantity
function addToCart(product, productPrice, itemId) {
  const quantity = prompt(`Enter the quantity for ${product}:`);
  //  Check the quantity is valid and greater than 0.
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ product, quantity, productPrice });
    alert(`${quantity} ${product}(s) added to the cart.`);
    const quantitySpan = document.getElementById(`item-${itemId}-qty`);
    quantitySpan.innerText = `x ${quantity}`;
  } else {
    alert("Invalid quantity.Please Enter right quantity value.");
  }
}


//To create a receipt table depending on cart item and user name
function generateReceipt(userName) {
  // Initialize the html content for the receipt with the user name
  let receiptHTML = `<h2>Receipt for ${userName}</h2>`;
  let subtotal = 0;
  // Table for creating receipt
  receiptHTML += "<table>";
  receiptHTML += "<tr><th>Product</th><th>Quantity</th><th>Cost</th></tr>";

  //Loop through each item in cart to calculate total costs
  cart.forEach((item) => {
    const totalCost = item.quantity * item.productPrice;
    receiptHTML += `<tr><td>${item.product}</td><td>${
      item.quantity
      //.tofixed function changes decimal to number of places
    }</td><td>$${totalCost.toFixed(2)}</td></tr>`;
    subtotal += totalCost;
  });
  //Calculate GST and totalcost with tax
  const gst = subtotal * gstRate;
  const totalCostWithGST = subtotal + gst;
  // Add rows for subtotal,GST and total cost of table and .tofixed function to format a number with a specific number of digits to the right of the decimal
  receiptHTML += `<tr><td ="2"><strong>Subtotal:</strong></td><td>$${subtotal.toFixed(2
  )}</td></tr>`;
  receiptHTML += `<tr><td ="2"><strong>GST (${
    gstRate * 100
  }%):</strong></td><td>$${gst.toFixed(2)}</td></tr>`;
  receiptHTML += `<tr><td ="2"><strong>Total Cost:</strong></td><td>$${totalCostWithGST.toFixed(
    2
  )}</td></tr>`;
  receiptHTML += "</table>";

  // Assign the html content of the receipt div and make it visible
  document.getElementById("receipt").innerHTML = receiptHTML;
  document.getElementById("receipt").classList.remove("hidden");
}
