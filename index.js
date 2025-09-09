const cart = [];
const cartBox = document.getElementById("cart");
const cartTotals = document.getElementById("cart-totals");
const orderBtn = document.getElementById("order-btn");
const orderStatus = document.getElementById("order-status");

let menu = [];

// خواندن JSON از فایل جدا
fetch("menu.json")
  .then(response => response.json())
  .then(data => {
    menu = data;
  })
  .catch(err => console.error("خطا در خواندن فایل JSON:", err));

// گرفتن تمام دکمه‌های افزودن به سبد
document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".menu-card");
    const id = parseInt(card.dataset.id);
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    // گرفتن زمان از JSON بر اساس id
    const item = menu.find(m => m.id === id);
    const time = item ? item.time : 0;

    const found = cart.find(p => p.id === id);
    if (found) {
      found.qty++;
    } else {
      cart.push({ id, name, price, time, qty: 1 });
    }

    renderCart();
  });
});

// تابع سبد خرید
function renderCart() {
  if (cart.length === 0) {
    cartBox.innerHTML = `<p class="cart-empty">سبد شما خالی است.</p>`;
    cartTotals.innerHTML = "";
    orderStatus.textContent = "";
    return;
  }

  let total = 0;
  let totalTime = 0;
  let html = "";
  cart.forEach(p => {
    const itemTotal = p.price * p.qty;
    total += itemTotal;
    totalTime += p.time * p.qty;
    html += `<p>${p.name} × ${p.qty} = ${itemTotal.toLocaleString()} تومان (زمان آماده‌سازی: ${p.time} دقیقه)</p>`;
  });

  const discount = Math.round(total * 0.1);
  const finalTotal = total - discount;

  cartBox.innerHTML = html;
  cartTotals.innerHTML = `
    <p>مجموع: ${total.toLocaleString()} تومان</p>
    <p>تخفیف: ${discount.toLocaleString()} تومان</p>
    <b>قابل پرداخت: ${finalTotal.toLocaleString()} تومان</b>
    <p>زمان کل: ${totalTime} دقیقه</p>
  `;
}

// ثبت سفارش
orderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("سبد شما خالی است!");
    return;
  }
  orderStatus.textContent = "سفارش شما ثبت شد و به زودی آماده می‌شود!";
});
