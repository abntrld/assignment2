const apiBase = 'http://localhost:3000';

const customerApi = `${apiBase}/customers`;
async function loadCustomers() {
    const res = await fetch(customerApi);
    const customers = await res.json();
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = '';
    customers.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.customer_id}</td>
            <td>${c.full_name}</td>
            <td>${c.phone}</td>
            <td>${c.email}</td>
            <td><button onclick="deleteCustomer(${c.customer_id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });

    const select = document.getElementById('order_customer');
    select.innerHTML = '';
    customers.forEach(c => select.innerHTML += `<option value="${c.customer_id}">${c.full_name}</option>`);
}

async function addCustomer() {
    const full_name = document.getElementById('full_name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    await fetch(customerApi, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({full_name, phone, email})
    });
    document.getElementById('full_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    loadCustomers();
}

async function deleteCustomer(id) {
    await fetch(`${customerApi}/${id}`, { method: 'DELETE' });
    loadCustomers();
}

const empApi = `${apiBase}/employees`;
async function loadEmployees() {
    const res = await fetch(empApi);
    const employees = await res.json();
    const tbody = document.querySelector('#employeesTable tbody');
    tbody.innerHTML = '';
    employees.forEach(e => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.employee_id}</td>
            <td>${e.full_name}</td>
            <td>${e.phone}</td>
            <td>${e.position}</td>
            <td><button onclick="deleteEmployee(${e.employee_id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });

    const select = document.getElementById('order_employee');
    select.innerHTML = '';
    employees.forEach(e => select.innerHTML += `<option value="${e.employee_id}">${e.full_name}</option>`);
}

async function addEmployee() {
    const full_name = document.getElementById('emp_full_name').value;
    const phone = document.getElementById('emp_phone').value;
    const position = document.getElementById('emp_position').value;
    await fetch(empApi, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({full_name, phone, position})
    });
    document.getElementById('emp_full_name').value = '';
    document.getElementById('emp_phone').value = '';
    document.getElementById('emp_position').value = '';
    loadEmployees();
}

async function deleteEmployee(id) {
    await fetch(`${empApi}/${id}`, { method: 'DELETE' });
    loadEmployees();
}

const prodApi = `${apiBase}/products`;
async function loadProducts() {
    const res = await fetch(prodApi);
    const products = await res.json();
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';
    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.product_id}</td>
            <td>${p.product_name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td><button onclick="deleteProduct(${p.product_id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function addProduct() {
    const product_name = document.getElementById('prod_name').value;
    const category = document.getElementById('prod_category').value;
    const price = parseFloat(document.getElementById('prod_price').value);
    const stock = parseInt(document.getElementById('prod_stock').value);
    await fetch(prodApi, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({product_name, category, price, stock})
    });
    document.getElementById('prod_name').value = '';
    document.getElementById('prod_category').value = '';
    document.getElementById('prod_price').value = '';
    document.getElementById('prod_stock').value = '';
    loadProducts();
}

async function deleteProduct(id) {
    await fetch(`${prodApi}/${id}`, { method: 'DELETE' });
    loadProducts();
}

const orderApi = `${apiBase}/orders`;
async function loadOrders() {
    const res = await fetch(orderApi);
    const orders = await res.json();
    const tbody = document.querySelector('#ordersTable tbody');
    tbody.innerHTML = '';
    orders.forEach(o => {
        const items = o.items.map(i => `Prod:${i.product_id} x${i.quantity}`).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${o.order_id}</td>
            <td>${o.customer_id}</td>
            <td>${o.employee_id}</td>
            <td>${o.order_date}</td>
            <td>${items}</td>
            <td><button onclick="deleteOrder(${o.order_id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function placeOrder() {
    const customer_id = document.getElementById('order_customer').value;
    const employee_id = document.getElementById('order_employee').value;
    const itemsText = document.getElementById('order_items').value; // e.g., 1:2,3:1
    const items = itemsText.split(',').map(x => {
        const [product_id, quantity] = x.split(':');
        return { product_id: parseInt(product_id), quantity: parseInt(quantity) };
    });

    await fetch(orderApi, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({customer_id, employee_id, items})
    });
    document.getElementById('order_items').value = '';
    loadOrders();
}

async function deleteOrder(id) {
    await fetch(`${orderApi}/${id}`, { method: 'DELETE' });
    loadOrders();
}

loadCustomers();
loadEmployees();
loadProducts();
loadOrders();
