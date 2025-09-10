
let doubleburger = 0;
let cesarsalad = 0;
let pastaalfredo = 0;
let pizzamargherita = 0;
let firstb = true;
let data = [];
async function fetchData() {
  try {
    const response = await fetch('index.json');
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
fetchData();

function cartTotal() {
  const total = (doubleburger * data[2].price) +
                (cesarsalad * data[0].price) +
                (pastaalfredo * data[3].price) +
                (pizzamargherita * data[1].price);
  return firstb ? Math.round(total * 0.9) : total;
}
function updateCart() {
  const cart = document.getElementById('cart');
  if (!cart) return;

  let html = '';
  if (doubleburger) html += `${doubleburger} عدد برگر دوبل - ${doubleburger * data[2].price} تومان<br>`;
  if (cesarsalad) html += `${cesarsalad} عدد سالاد سزار - ${cesarsalad * data[0].price} تومان<br>`;
  if (pastaalfredo) html += `${pastaalfredo} عدد پاستا آلفردو - ${pastaalfredo * data[3].price} تومان<br>`;
  if (pizzamargherita) html += `${pizzamargherita} عدد پیتزا مارگاریتا - ${pizzamargherita * data[1].price} تومان<br>`;

  if (doubleburger || cesarsalad || pastaalfredo || pizzamargherita) {
    html += `<b>جمع کل: ${cartTotal()} تومان${firstb ? ' (۱۰٪ تخفیف اولین سفارش اعمال شد)' : ''}</b>`;
  } else {
    html = `<p class="cart-empty">سبد شما خالی است.</p>`;
  }

  cart.innerHTML = html;
}

function foods(food) {
  if (food === 'doubleburger') doubleburger++;
  else if (food === 'cesarsalad') cesarsalad++;
  else if (food === 'pastaalfredo') pastaalfredo++;
  else if (food === 'pizzamargherita') pizzamargherita++;

  updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-product-id');
      let food;
      if (id === '1') food = 'cesarsalad';
      else if (id === '2') food = 'pizzamargherita';
      else if (id === '3') food = 'doubleburger';
      else if (id === '4') food = 'pastaalfredo';
      foods(food);
    });
  });

  const submitBtn = document.getElementById('order-btn');
  if (submitBtn) submitBtn.addEventListener('click', submit);
});

function submit() {
  if (!doubleburger && !cesarsalad && !pastaalfredo && !pizzamargherita) {
    alert('لطفا غذایی را انتخاب کنید!');
    return;
  }

  const time = pizzamargherita * data[1].time +
               pastaalfredo * data[3].time +
               doubleburger * data[2].time +
               cesarsalad * data[0].time;

  const status = document.getElementById('order-status');
  if (status) {
    status.innerHTML = `سفارش شما تا ${time} دقیقه دیگر آماده خواهد شد | جمع کل: ${cartTotal()} تومان`;
    status.style.color = 'green';
  }

  doubleburger = 0;
  cesarsalad = 0;
  pastaalfredo = 0;
  pizzamargherita = 0;
  firstb = false;

  updateCart();
}
