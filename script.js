let cart = JSON.parse(localStorage.getItem('kukirin_cart')) || [];


function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    

    localStorage.setItem('kukirin_cart', JSON.stringify(cart));
    

    updateCartCounters();
    
  
    renderCartPage();
    

    alert(name + ' успішно додано до кошика!');
}


function updateCartCounters() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.innerText = totalCount;
    }
}


function renderCartPage() {
    const container = document.getElementById('cart-page-items');
    const summaryCount = document.getElementById('summary-count');
    const summaryPrice = document.getElementById('summary-price');
    

    if (!container) return; 

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; background: white; border-radius:12px; width: 100%;">
                <h3 style="margin-bottom:15px;">Ваш кошик порожній 🛒</h3>
                <a href="index.html#catalog" class="btn-primary" style="text-decoration:none;">Повернутись до каталогу</a>
            </div>
        `;
        if (summaryCount) summaryCount.innerText = "0";
        if (summaryPrice) summaryPrice.innerText = "0 ₴";
        return;
    }

    let html = '';
    let totalPrice = 0;
    let totalCount = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        totalCount += item.quantity;

        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding:20px; border-radius:12px; margin-bottom:15px; box-shadow:0 4px 10px rgba(0,0,0,0.02); width:100%;">
                <div>
                    <h4 style="font-size:18px; margin-bottom:5px;">${item.name}</h4>
                    <p style="color:#666;">Ціна: ${item.price.toLocaleString()} ₴</p>
                </div>
                <div style="display:flex; align-items:center; gap:15px;">
                    <button onclick="changeQty(${index}, -1)" style="padding:5px 10px; cursor:pointer; font-weight:bold; border:1px solid #ddd; background:#f8f9fa;">-</button>
                    <span style="font-weight:600; min-width:20px; text-align:center;">${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)" style="padding:5px 10px; cursor:pointer; font-weight:bold; border:1px solid #ddd; background:#f8f9fa;">+</button>
                    <strong style="margin-left:15px; min-width:90px; text-align:right;">${itemTotal.toLocaleString()} ₴</strong>
                    <button onclick="deleteItem(${index})" style="background:none; border:none; color:red; cursor:pointer; margin-left:15px; font-size:18px;">🗑️</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if (summaryCount) summaryCount.innerText = totalCount;
    if (summaryPrice) summaryPrice.innerText = totalPrice.toLocaleString() + " ₴";
}


function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('kukirin_cart', JSON.stringify(cart));
    updateCartCounters();
    renderCartPage();
}


function deleteItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('kukirin_cart', JSON.stringify(cart));
    updateCartCounters();
    renderCartPage();
}


function confirmOrder(event) {
    event.preventDefault(); 
    alert('Дякуємо за покупку! Замовлення успішно підтверджено. Наш менеджер вже зв\'язується з вами.');
    cart = []; 
    localStorage.setItem('kukirin_cart', JSON.stringify(cart));
    updateCartCounters();
    window.location.href = 'index.html'; 
}


document.addEventListener("DOMContentLoaded", () => {
    updateCartCounters();
    renderCartPage();
});
