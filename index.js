const cart = [];
const cartBox = document.getElementById("cart");
const cartTotals = document.getElementById("cart-totals");
const orderBtn = document.getElementById("order-btn");
const orderStatus = document.getElementById("order-status");

// گرفتن تمام دکمه‌های افزودن به سبد
document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".menu-card");
    const id = parseInt(card.dataset.id);
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    const found = cart.find(p => p.id === id);
    if (found) {
      found.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
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
  let html = "";
  cart.forEach(p => {
    const itemTotal = p.price * p.qty;
    total += itemTotal;
    html += `<p>${p.name} × ${p.qty} = ${itemTotal.toLocaleString()} تومان</p>`;
  });

  const discount = Math.round(total * 0.1);
  const finalTotal = total - discount;

  cartBox.innerHTML = html;
  cartTotals.innerHTML = `
    <p>مجموع: ${total.toLocaleString()} تومان</p>
    <p>تخفیف: ${discount.toLocaleString()} تومان</p>
    <b>قابل پرداخت: ${finalTotal.toLocaleString()} تومان</b>
  `;
}
/// ثبت سفارش
orderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("سبد شما خالی است!");
    return;
  }
  orderStatus.textContent = "سفارش شما ثبت شد و به زودی آماده می‌شود!";
});
