/**
 * ============================================================================
 * VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS), ERODE - 12
 * DEPARTMENT OF INFORMATION TECHNOLOGY
 * ACADEMIC YEAR: 2026 - 2027 (ODD) | CLASS: 25IT3A
 * PROJECT-BASED ASSESSMENT
 * Scenario 9: Retail Store Inventory and Sales Analysis System
 * Student Name: Ashvika K | Register Number: 732925ITR009
 * ============================================================================
 * Application Logic & Controller
 * ============================================================================
 */

// Initial Seed Data (Matches database/sample_data.sql)
const SEED_PRODUCTS = [
    { id: 'PRD-101', name: 'Basmati Rice Premium 1kg', category: 'Groceries', brand: 'India Gate', cost: 95.0, price: 130.0, stock: 45, reorder: 10, unit: 'kg' },
    { id: 'PRD-102', name: 'Whole Wheat Atta 5kg', category: 'Groceries', brand: 'Aashirvaad', cost: 190.0, price: 240.0, stock: 30, reorder: 8, unit: 'pack' },
    { id: 'PRD-103', name: 'Toor Dal Supreme 1kg', category: 'Groceries', brand: 'Tata Sampann', cost: 120.0, price: 155.0, stock: 25, reorder: 10, unit: 'kg' },
    { id: 'PRD-104', name: 'Sunflower Cooking Oil 1L', category: 'Groceries', brand: 'Fortune', cost: 115.0, price: 145.0, stock: 4, reorder: 15, unit: 'litre' },
    { id: 'PRD-105', name: 'Iodized Salt 1kg', category: 'Groceries', brand: 'Tata Salt', cost: 18.0, price: 26.0, stock: 60, reorder: 20, unit: 'pack' },

    { id: 'PRD-201', name: 'Toned Fresh Milk 500ml', category: 'Dairy & Beverages', brand: 'Aavin', cost: 20.0, price: 25.0, stock: 50, reorder: 15, unit: 'pouch' },
    { id: 'PRD-202', name: 'Salted Butter 100g', category: 'Dairy & Beverages', brand: 'Amul', cost: 42.0, price: 56.0, stock: 3, reorder: 10, unit: 'pack' },
    { id: 'PRD-203', name: 'Green Tea Classic 25 bags', category: 'Dairy & Beverages', brand: 'Tetley', cost: 110.0, price: 160.0, stock: 18, reorder: 5, unit: 'box' },
    { id: 'PRD-204', name: 'Cold Pressed Apple Juice 1L', category: 'Dairy & Beverages', brand: 'Real', cost: 85.0, price: 120.0, stock: 2, reorder: 8, unit: 'bottle' },
    { id: 'PRD-205', name: 'Filter Coffee Powder 200g', category: 'Dairy & Beverages', brand: 'Bru Gold', cost: 140.0, price: 195.0, stock: 22, reorder: 6, unit: 'pack' },

    { id: 'PRD-301', name: 'Neem Aloe Vera Soap 125g', category: 'Personal Care', brand: 'Medimix', cost: 28.0, price: 38.0, stock: 65, reorder: 15, unit: 'bar' },
    { id: 'PRD-302', name: 'Anti-Dandruff Shampoo 180ml', category: 'Personal Care', brand: 'Head & Shoulders', cost: 125.0, price: 175.0, stock: 14, reorder: 5, unit: 'bottle' },
    { id: 'PRD-303', name: 'Herbal Toothpaste 150g', category: 'Personal Care', brand: 'Colgate Max', cost: 65.0, price: 92.0, stock: 35, reorder: 10, unit: 'tube' },
    { id: 'PRD-304', name: 'Moisturizing Cream 100ml', category: 'Personal Care', brand: 'Nivea Soft', cost: 130.0, price: 180.0, stock: 8, reorder: 5, unit: 'jar' },

    { id: 'PRD-401', name: 'Liquid Floor Cleaner 1L', category: 'Household', brand: 'Lizol', cost: 130.0, price: 185.0, stock: 16, reorder: 5, unit: 'bottle' },
    { id: 'PRD-402', name: 'Detergent Powder 1kg', category: 'Household', brand: 'Surf Excel', cost: 105.0, price: 148.0, stock: 28, reorder: 10, unit: 'pack' },
    { id: 'PRD-403', name: 'Dishwash Gel 500ml', category: 'Household', brand: 'Vim Gel', cost: 72.0, price: 105.0, stock: 0, reorder: 8, unit: 'bottle' }, // Out of stock

    { id: 'PRD-501', name: 'Marie Gold Biscuits 200g', category: 'Snacks', brand: 'Britannia', cost: 22.0, price: 30.0, stock: 80, reorder: 20, unit: 'pack' },
    { id: 'PRD-502', name: 'Classic Salted Potato Chips', category: 'Snacks', brand: 'Lays', cost: 15.0, price: 20.0, stock: 40, reorder: 15, unit: 'pack' },
    { id: 'PRD-503', name: 'Dairy Milk Silk 60g', category: 'Snacks', brand: 'Cadbury', cost: 55.0, price: 75.0, stock: 32, reorder: 10, unit: 'bar' }
];

const SEED_TRANSACTIONS = [
    {
        id: 'TXN-20261115-001',
        date: '2026-11-15 10:30',
        customer: 'Suresh Kumar',
        phone: '9842100001',
        payment: 'UPI',
        subtotal: 500.0,
        tax: 25.0,
        discount: 0.0,
        total: 525.0,
        items: [
            { id: 'PRD-101', name: 'Basmati Rice Premium 1kg', price: 130.0, qty: 2, subtotal: 260.0 },
            { id: 'PRD-102', name: 'Whole Wheat Atta 5kg', price: 240.0, qty: 1, subtotal: 240.0 }
        ]
    },
    {
        id: 'TXN-20261115-002',
        date: '2026-11-15 14:15',
        customer: 'Priya Dharshini',
        phone: '9842100002',
        payment: 'Card',
        subtotal: 780.0,
        tax: 39.0,
        discount: 20.0,
        total: 799.0,
        items: [
            { id: 'PRD-103', name: 'Toor Dal Supreme 1kg', price: 155.0, qty: 2, subtotal: 310.0 },
            { id: 'PRD-402', name: 'Detergent Powder 1kg', price: 148.0, qty: 2, subtotal: 296.0 },
            { id: 'PRD-302', name: 'Anti-Dandruff Shampoo 180ml', price: 174.0, qty: 1, subtotal: 174.0 }
        ]
    },
    {
        id: 'TXN-20261116-001',
        date: '2026-11-16 11:00',
        customer: 'Karthik Raja',
        phone: '9842100003',
        payment: 'Cash',
        subtotal: 360.0,
        tax: 18.0,
        discount: 0.0,
        total: 378.0,
        items: [
            { id: 'PRD-203', name: 'Green Tea Classic 25 bags', price: 160.0, qty: 1, subtotal: 160.0 },
            { id: 'PRD-503', name: 'Dairy Milk Silk 60g', price: 75.0, qty: 2, subtotal: 150.0 },
            { id: 'PRD-201', name: 'Toned Fresh Milk 500ml', price: 25.0, qty: 2, subtotal: 50.0 }
        ]
    },
    {
        id: 'TXN-20261116-002',
        date: '2026-11-16 16:45',
        customer: 'Ananya Sharma',
        phone: '9842100004',
        payment: 'UPI',
        subtotal: 1230.0,
        tax: 61.5,
        discount: 50.0,
        total: 1241.5,
        items: [
            { id: 'PRD-101', name: 'Basmati Rice Premium 1kg', price: 130.0, qty: 3, subtotal: 390.0 },
            { id: 'PRD-102', name: 'Whole Wheat Atta 5kg', price: 240.0, qty: 2, subtotal: 480.0 },
            { id: 'PRD-304', name: 'Moisturizing Cream 100ml', price: 180.0, qty: 2, subtotal: 360.0 }
        ]
    },
    {
        id: 'TXN-20261117-001',
        date: '2026-11-17 12:20',
        customer: 'Venkatesh S',
        phone: '9842100005',
        payment: 'Cash',
        subtotal: 640.0,
        tax: 32.0,
        discount: 0.0,
        total: 672.0,
        items: [
            { id: 'PRD-205', name: 'Filter Coffee Powder 200g', price: 195.0, qty: 2, subtotal: 390.0 },
            { id: 'PRD-201', name: 'Toned Fresh Milk 500ml', price: 25.0, qty: 4, subtotal: 100.0 },
            { id: 'PRD-501', name: 'Marie Gold Biscuits 200g', price: 30.0, qty: 5, subtotal: 150.0 }
        ]
    },
    {
        id: 'TXN-20261117-002',
        date: '2026-11-17 17:30',
        customer: 'Suresh Kumar',
        phone: '9842100001',
        payment: 'Card',
        subtotal: 890.0,
        tax: 44.5,
        discount: 30.0,
        total: 904.5,
        items: [
            { id: 'PRD-401', name: 'Liquid Floor Cleaner 1L', price: 185.0, qty: 2, subtotal: 370.0 },
            { id: 'PRD-103', name: 'Toor Dal Supreme 1kg', price: 155.0, qty: 2, subtotal: 310.0 },
            { id: 'PRD-502', name: 'Classic Salted Potato Chips', price: 20.0, qty: 7, subtotal: 140.0 },
            { id: 'PRD-301', name: 'Neem Aloe Vera Soap 125g', price: 38.0, qty: 2, subtotal: 70.0 }
        ]
    },
    {
        id: 'TXN-20261118-001',
        date: '2026-11-18 10:15',
        customer: 'Priya Dharshini',
        phone: '9842100002',
        payment: 'UPI',
        subtotal: 430.0,
        tax: 21.5,
        discount: 0.0,
        total: 451.5,
        items: [
            { id: 'PRD-104', name: 'Sunflower Cooking Oil 1L', price: 145.0, qty: 2, subtotal: 290.0 },
            { id: 'PRD-503', name: 'Dairy Milk Silk 60g', price: 75.0, qty: 1, subtotal: 75.0 },
            { id: 'PRD-501', name: 'Marie Gold Biscuits 200g', price: 30.0, qty: 2, subtotal: 65.0 }
        ]
    },
    {
        id: 'TXN-20261118-002',
        date: '2026-11-18 15:50',
        customer: 'Karthik Raja',
        phone: '9842100003',
        payment: 'UPI',
        subtotal: 1094.0,
        tax: 54.7,
        discount: 40.0,
        total: 1108.7,
        items: [
            { id: 'PRD-101', name: 'Basmati Rice Premium 1kg', price: 130.0, qty: 4, subtotal: 520.0 },
            { id: 'PRD-205', name: 'Filter Coffee Powder 200g', price: 195.0, qty: 2, subtotal: 390.0 },
            { id: 'PRD-303', name: 'Herbal Toothpaste 150g', price: 92.0, qty: 2, subtotal: 184.0 }
        ]
    },
    {
        id: 'TXN-20261119-001',
        date: '2026-11-19 11:10',
        customer: 'Ananya Sharma',
        phone: '9842100004',
        payment: 'Cash',
        subtotal: 680.0,
        tax: 34.0,
        discount: 0.0,
        total: 714.0,
        items: [
            { id: 'PRD-102', name: 'Whole Wheat Atta 5kg', price: 240.0, qty: 2, subtotal: 480.0 },
            { id: 'PRD-203', name: 'Green Tea Classic 25 bags', price: 160.0, qty: 1, subtotal: 160.0 },
            { id: 'PRD-502', name: 'Classic Salted Potato Chips', price: 20.0, qty: 2, subtotal: 40.0 }
        ]
    },
    {
        id: 'TXN-20261119-002',
        date: '2026-11-19 15:20',
        customer: 'Venkatesh S',
        phone: '9842100005',
        payment: 'Card',
        subtotal: 934.0,
        tax: 46.7,
        discount: 25.0,
        total: 955.7,
        items: [
            { id: 'PRD-402', name: 'Detergent Powder 1kg', price: 148.0, qty: 3, subtotal: 444.0 },
            { id: 'PRD-103', name: 'Toor Dal Supreme 1kg', price: 155.0, qty: 2, subtotal: 310.0 },
            { id: 'PRD-304', name: 'Moisturizing Cream 100ml', price: 180.0, qty: 1, subtotal: 180.0 }
        ]
    }
];

// App State
let products = [];
let transactions = [];
let cart = [];
let activeTab = 'dashboard';
let chartsInstances = {};

// Load State from LocalStorage
function initDatabase() {
    const savedProducts = localStorage.getItem('vcet_retail_products');
    const savedTxns = localStorage.getItem('vcet_retail_transactions');

    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = JSON.parse(JSON.stringify(SEED_PRODUCTS));
        saveProducts();
    }

    if (savedTxns) {
        transactions = JSON.parse(savedTxns);
    } else {
        transactions = JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
        saveTransactions();
    }
}

function saveProducts() {
    localStorage.setItem('vcet_retail_products', JSON.stringify(products));
}

function saveTransactions() {
    localStorage.setItem('vcet_retail_transactions', JSON.stringify(transactions));
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.className = `fixed bottom-5 right-5 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-y-0 ${
        type === 'error' ? 'bg-red-600' : (type === 'warning' ? 'bg-amber-600' : 'bg-emerald-600')
    }`;
    toast.innerHTML = `
        <span class="mr-2">${type === 'error' ? '⚠️' : (type === 'warning' ? '⚡' : '✅')}</span>
        <span>${message}</span>
    `;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3500);
}

// Navigation & Tab Switching
function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-tab-btn').forEach(el => el.classList.remove('active'));

    const targetPane = document.getElementById(`pane-${tabId}`);
    const targetBtn = document.getElementById(`tab-btn-${tabId}`);

    if (targetPane) targetPane.classList.remove('hidden');
    if (targetBtn) targetBtn.classList.add('active');

    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'inventory') renderInventoryTable();
    if (tabId === 'pos') renderPOS();
    if (tabId === 'reports') renderReports();
    if (tabId === 'analytics') renderAnalyticsCharts();
}

// ----------------------------------------------------------------------------
// 1. DASHBOARD CONTROLLER
// ----------------------------------------------------------------------------
function renderDashboard() {
    const totalProducts = products.length;
    let totalStockUnits = 0;
    let totalInventoryValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach(p => {
        totalStockUnits += p.stock;
        totalInventoryValue += (p.stock * p.price);
        if (p.stock === 0) outOfStockCount++;
        else if (p.stock <= p.reorder) lowStockCount++;
    });

    const todayStr = new Date().toISOString().slice(0, 10);
    const todaySales = transactions
        .filter(t => t.date.startsWith(todayStr) || t.date.startsWith('2026-11-19'))
        .reduce((sum, t) => sum + t.total, 0);

    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);

    document.getElementById('stat-total-products').textContent = totalProducts;
    document.getElementById('stat-total-valuation').textContent = `₹${totalInventoryValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    document.getElementById('stat-today-revenue').textContent = `₹${todaySales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    document.getElementById('stat-total-revenue').textContent = `₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    document.getElementById('stat-low-stock').textContent = lowStockCount;
    document.getElementById('stat-out-stock').textContent = outOfStockCount;

    // Render Recent Transactions on Dashboard
    const recentTxnsTable = document.getElementById('dashboard-recent-txns');
    if (recentTxnsTable) {
        recentTxnsTable.innerHTML = transactions.slice(0, 5).map(t => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="py-2.5 px-3 font-mono text-xs font-semibold text-blue-600">${t.id}</td>
                <td class="py-2.5 px-3 text-sm">${t.date}</td>
                <td class="py-2.5 px-3 text-sm font-medium">${t.customer}</td>
                <td class="py-2.5 px-3 text-xs">
                    <span class="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">${t.payment}</span>
                </td>
                <td class="py-2.5 px-3 text-sm font-bold text-slate-800 text-right">₹${t.total.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    // Mini Chart on Dashboard
    renderMiniSalesChart();
}

function renderMiniSalesChart() {
    const canvas = document.getElementById('miniSalesChart');
    if (!canvas) return;

    // Aggregate daily sales
    const dailyMap = {};
    transactions.forEach(t => {
        const d = t.date.slice(0, 10);
        dailyMap[d] = (dailyMap[d] || 0) + t.total;
    });

    const dates = Object.keys(dailyMap).sort();
    const data = dates.map(d => dailyMap[d]);

    if (chartsInstances['miniSales']) chartsInstances['miniSales'].destroy();

    chartsInstances['miniSales'] = new Chart(canvas, {
        type: 'line',
        data: {
            labels: dates.map(d => d.slice(5)),
            datasets: [{
                label: 'Daily Revenue (₹)',
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 2.5,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#1d4ed8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// ----------------------------------------------------------------------------
// 2. INVENTORY & PRODUCT MANAGEMENT (FR1)
// ----------------------------------------------------------------------------
function renderInventoryTable() {
    const searchVal = (document.getElementById('inv-search')?.value || '').toLowerCase();
    const catVal = document.getElementById('inv-cat-filter')?.value || 'ALL';
    const statusVal = document.getElementById('inv-status-filter')?.value || 'ALL';

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchVal) || 
                            p.id.toLowerCase().includes(searchVal) || 
                            p.brand.toLowerCase().includes(searchVal);
        const matchCat = catVal === 'ALL' || p.category === catVal;
        let matchStatus = true;
        if (statusVal === 'IN_STOCK') matchStatus = p.stock > p.reorder;
        if (statusVal === 'LOW_STOCK') matchStatus = p.stock <= p.reorder && p.stock > 0;
        if (statusVal === 'OUT_OF_STOCK') matchStatus = p.stock === 0;
        return matchSearch && matchCat && matchStatus;
    });

    const tbody = document.getElementById('inventory-table-body');
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-400">No products match your search/filter criteria.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        let statusBadge = '<span class="px-2.5 py-1 text-xs font-semibold rounded-full badge-in-stock">In Stock</span>';
        if (p.stock === 0) {
            statusBadge = '<span class="px-2.5 py-1 text-xs font-semibold rounded-full badge-out-of-stock">Out of Stock</span>';
        } else if (p.stock <= p.reorder) {
            statusBadge = `<span class="px-2.5 py-1 text-xs font-semibold rounded-full badge-low-stock">Low Stock (${p.stock}/${p.reorder})</span>`;
        }

        const margin = p.price - p.cost;
        const marginPct = ((margin / p.price) * 100).toFixed(1);

        return `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="py-3 px-3 font-mono text-xs font-bold text-slate-700">${p.id}</td>
                <td class="py-3 px-3">
                    <div class="font-semibold text-slate-900 text-sm">${p.name}</div>
                    <div class="text-xs text-slate-400">${p.brand}</div>
                </td>
                <td class="py-3 px-3 text-xs text-slate-600">
                    <span class="px-2 py-0.5 bg-slate-100 rounded text-slate-700">${p.category}</span>
                </td>
                <td class="py-3 px-3 text-sm text-slate-600">₹${p.cost.toFixed(2)}</td>
                <td class="py-3 px-3 text-sm font-semibold text-slate-800">₹${p.price.toFixed(2)}</td>
                <td class="py-3 px-3 text-sm font-bold ${p.stock <= p.reorder ? 'text-amber-600' : 'text-slate-700'}">
                    ${p.stock} <span class="text-xs font-normal text-slate-400">${p.unit}</span>
                </td>
                <td class="py-3 px-3">${statusBadge}</td>
                <td class="py-3 px-3 text-xs font-medium text-emerald-600">
                    ₹${margin.toFixed(2)} (${marginPct}%)
                </td>
                <td class="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                    <button onclick="quickRestock('${p.id}')" class="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition" title="Restock">
                        + Restock
                    </button>
                    <button onclick="openEditProductModal('${p.id}')" class="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition">
                        Edit
                    </button>
                    <button onclick="deleteProduct('${p.id}')" class="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openAddProductModal() {
    document.getElementById('product-modal-title').textContent = 'Add New Product';
    document.getElementById('prod-form').reset();
    document.getElementById('prod-id').readOnly = false;
    document.getElementById('prod-id').value = `PRD-${Math.floor(100 + Math.random() * 900)}`;
    document.getElementById('product-modal').classList.remove('hidden');
}

function openEditProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('product-modal-title').textContent = 'Edit Product Details';
    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-id').readOnly = true;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-cat').value = p.category;
    document.getElementById('prod-brand').value = p.brand;
    document.getElementById('prod-cost').value = p.cost;
    document.getElementById('prod-price').value = p.price;
    document.getElementById('prod-stock').value = p.stock;
    document.getElementById('prod-reorder').value = p.reorder;
    document.getElementById('prod-unit').value = p.unit;

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function handleSaveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('prod-id').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-cat').value;
    const brand = document.getElementById('prod-brand').value.trim();
    const cost = parseFloat(document.getElementById('prod-cost').value);
    const price = parseFloat(document.getElementById('prod-price').value);
    const stock = parseInt(document.getElementById('prod-stock').value);
    const reorder = parseInt(document.getElementById('prod-reorder').value);
    const unit = document.getElementById('prod-unit').value.trim();

    if (!id || !name || isNaN(cost) || isNaN(price) || isNaN(stock)) {
        showToast('Please fill all mandatory fields correctly.', 'error');
        return;
    }

    if (cost < 0 || price < 0 || stock < 0) {
        showToast('Values cannot be negative.', 'error');
        return;
    }

    const existingIndex = products.findIndex(x => x.id === id);
    if (existingIndex >= 0 && !document.getElementById('prod-id').readOnly) {
        showToast(`Product with code ${id} already exists!`, 'error');
        return;
    }

    const prodObj = { id, name, category, brand, cost, price, stock, reorder, unit };

    if (existingIndex >= 0) {
        products[existingIndex] = prodObj;
        showToast(`Product ${id} updated successfully.`);
    } else {
        products.push(prodObj);
        showToast(`New product ${id} added to catalog.`);
    }

    saveProducts();
    closeProductModal();
    renderInventoryTable();
    renderDashboard();
}

function quickRestock(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const qtyStr = prompt(`Enter quantity to add to stock for "${p.name}" (Current stock: ${p.stock}):`, "20");
    if (!qtyStr) return;

    const qty = parseInt(qtyStr);
    if (isNaN(qty) || qty <= 0) {
        showToast('Invalid quantity entered.', 'error');
        return;
    }

    p.stock += qty;
    saveProducts();
    renderInventoryTable();
    renderDashboard();
    showToast(`Restocked ${qty} units. New stock: ${p.stock} ${p.unit}`);
}

function deleteProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    if (confirm(`Are you sure you want to delete "${p.name}" (${p.id})?`)) {
        products = products.filter(x => x.id !== id);
        saveProducts();
        renderInventoryTable();
        renderDashboard();
        showToast(`Product ${id} deleted.`);
    }
}

// ----------------------------------------------------------------------------
// 3. POINT OF SALE (POS) & CASHIER CHECKOUT (FR2, FR3, FR4)
// ----------------------------------------------------------------------------
let posActiveCategory = 'ALL';

function renderPOS() {
    const searchVal = (document.getElementById('pos-search')?.value || '').toLowerCase();
    const productGrid = document.getElementById('pos-product-grid');
    if (!productGrid) return;

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchVal) || p.id.toLowerCase().includes(searchVal);
        const matchCat = posActiveCategory === 'ALL' || p.category === posActiveCategory;
        return matchSearch && matchCat;
    });

    productGrid.innerHTML = filtered.map(p => {
        const isOut = p.stock <= 0;
        const isLow = p.stock <= p.reorder && p.stock > 0;
        let badgeColor = 'bg-emerald-100 text-emerald-800';
        if (isOut) badgeColor = 'bg-red-100 text-red-800';
        else if (isLow) badgeColor = 'bg-amber-100 text-amber-800';

        return `
            <div class="product-card glass-card p-3 flex flex-col justify-between ${isOut ? 'disabled' : ''}" 
                 onclick="${isOut ? '' : `addToCart('${p.id}')`}">
                <div>
                    <div class="flex items-center justify-between mb-1">
                        <span class="font-mono text-xs font-semibold text-blue-600">${p.id}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor}">
                            ${isOut ? 'Out of Stock' : `${p.stock} ${p.unit}`}
                        </span>
                    </div>
                    <h4 class="font-semibold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">${p.name}</h4>
                    <p class="text-xs text-slate-400">${p.category}</p>
                </div>
                <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span class="text-base font-bold text-slate-900">₹${p.price.toFixed(2)}</span>
                    <button class="px-2.5 py-1 text-xs font-semibold rounded ${isOut ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 transition'}">
                        ${isOut ? 'Sold Out' : '+ Add'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    renderCart();
}

function filterPosCategory(cat) {
    posActiveCategory = cat;
    document.querySelectorAll('.pos-cat-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('bg-slate-100', 'text-slate-700');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-slate-100', 'text-slate-700');
        }
    });
    renderPOS();
}

/**
 * FR4: Check stock availability before adding to cart!
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if out of stock
    if (product.stock <= 0) {
        showToast(`Cannot add "${product.name}"! It is currently OUT OF STOCK.`, 'error');
        return;
    }

    const existingCartItem = cart.find(item => item.id === productId);
    const currentInCart = existingCartItem ? existingCartItem.qty : 0;

    // FR4 Guard: Prevent requested quantity exceeding available physical stock
    if (currentInCart + 1 > product.stock) {
        showToast(`Stock limit reached! Only ${product.stock} units available for "${product.name}".`, 'error');
        return;
    }

    if (existingCartItem) {
        existingCartItem.qty += 1;
        existingCartItem.subtotal = existingCartItem.qty * existingCartItem.price;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            unit: product.unit,
            subtotal: product.price
        });
    }

    showToast(`Added 1x ${product.name} to cart.`);
    renderCart();
}

function updateCartQty(productId, delta) {
    const item = cart.find(x => x.id === productId);
    const product = products.find(p => p.id === productId);
    if (!item || !product) return;

    const newQty = item.qty + delta;

    if (newQty <= 0) {
        cart = cart.filter(x => x.id !== productId);
        renderCart();
        return;
    }

    // FR4 Guard: Strict stock check on quantity increase
    if (delta > 0 && newQty > product.stock) {
        showToast(`Cannot add more! Stock is limited to ${product.stock} units.`, 'error');
        return;
    }

    item.qty = newQty;
    item.subtotal = item.qty * item.price;
    renderCart();
}

function removeCartItem(productId) {
    cart = cart.filter(x => x.id !== productId);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const discountInput = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-grand-total');
    const checkoutBtn = document.getElementById('btn-checkout');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="h-48 flex flex-col items-center justify-center text-slate-400">
                <svg class="w-12 h-12 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p class="text-sm">Cart is empty. Select products from the list.</p>
            </div>
        `;
        subtotalEl.textContent = '₹0.00';
        taxEl.textContent = '₹0.00';
        totalEl.textContent = '₹0.00';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    let subtotal = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        subtotal += item.subtotal;
        return `
            <div class="flex items-center justify-between py-2 border-b border-slate-100">
                <div class="flex-1 pr-2">
                    <div class="font-medium text-slate-800 text-sm line-clamp-1">${item.name}</div>
                    <div class="text-xs text-slate-400">₹${item.price.toFixed(2)} × ${item.qty}</div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="flex items-center border border-slate-200 rounded overflow-hidden">
                        <button onclick="updateCartQty('${item.id}', -1)" class="px-2 py-0.5 bg-slate-50 text-slate-600 hover:bg-slate-200 text-xs font-bold">-</button>
                        <span class="px-2.5 py-0.5 text-xs font-semibold text-slate-800">${item.qty}</span>
                        <button onclick="updateCartQty('${item.id}', 1)" class="px-2 py-0.5 bg-slate-50 text-slate-600 hover:bg-slate-200 text-xs font-bold">+</button>
                    </div>
                    <div class="text-sm font-bold text-slate-800 w-16 text-right">₹${item.subtotal.toFixed(2)}</div>
                    <button onclick="removeCartItem('${item.id}')" class="text-slate-300 hover:text-red-500 text-sm">✕</button>
                </div>
            </div>
        `;
    }).join('');

    const tax = subtotal * 0.05; // 5% GST
    const discount = parseFloat(discountInput?.value || 0) || 0;
    const grandTotal = Math.max(0, (subtotal + tax) - discount);

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${grandTotal.toFixed(2)}`;
}

/**
 * FR3: Process Checkout & Automatic Stock Deduction
 */
function processCheckout() {
    if (cart.length === 0) {
        showToast('Cart is empty!', 'error');
        return;
    }

    // 1. Double check stock availability for all cart items (Atomicity guard)
    for (let item of cart) {
        const prod = products.find(p => p.id === item.id);
        if (!prod || prod.stock < item.qty) {
            showToast(`Transaction Failed! Insufficient stock for ${item.name}.`, 'error');
            return;
        }
    }

    const custName = document.getElementById('cart-cust-name')?.value.trim() || 'Walk-in Customer';
    const custPhone = document.getElementById('cart-cust-phone')?.value.trim() || 'N/A';
    const paymentMode = document.getElementById('cart-payment-mode')?.value || 'Cash';
    const discount = parseFloat(document.getElementById('cart-discount')?.value || 0) || 0;

    let subtotal = 0;
    cart.forEach(it => subtotal += it.subtotal);
    const tax = subtotal * 0.05;
    const grandTotal = Math.max(0, (subtotal + tax) - discount);

    const now = new Date();
    const dateFormatted = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
    const txnId = `TXN-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;

    // 2. FR3: Decrement stock quantity for each purchased item
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
            prod.stock -= item.qty;
        }
    });

    // 3. Save completed transaction record (FR2)
    const newTxn = {
        id: txnId,
        date: dateFormatted,
        customer: custName,
        phone: custPhone,
        payment: paymentMode,
        subtotal: subtotal,
        tax: tax,
        discount: discount,
        total: grandTotal,
        items: JSON.parse(JSON.stringify(cart))
    };

    transactions.unshift(newTxn);

    // Save to LocalStorage
    saveProducts();
    saveTransactions();

    // 4. Show Printable Receipt
    renderReceiptModal(newTxn);

    // 5. Reset Cart and Refresh Views
    cart = [];
    document.getElementById('cart-cust-name').value = '';
    document.getElementById('cart-cust-phone').value = '';
    document.getElementById('cart-discount').value = '0';
    renderCart();
    renderPOS();
    renderDashboard();

    showToast(`Order ${txnId} completed! Stock deducted automatically.`);
}

function renderReceiptModal(txn) {
    const modal = document.getElementById('receipt-modal');
    const content = document.getElementById('printableReceipt');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="text-center pb-4 border-b border-dashed border-slate-300">
            <h2 class="text-xl font-black text-slate-900 tracking-tight">VCET RETAIL SUPERMARKET</h2>
            <p class="text-xs text-slate-500">Department of IT | Scenario 9: Inventory &amp; Sales System</p>
            <p class="text-xs text-slate-400">Thindal, Erode, Tamil Nadu - 638012</p>
            <div class="mt-2 text-xs font-mono font-bold text-blue-600">${txn.id}</div>
            <div class="text-xs text-slate-500">${txn.date}</div>
        </div>

        <div class="py-3 text-xs space-y-1 border-b border-dashed border-slate-300">
            <div class="flex justify-between">
                <span class="text-slate-500">Customer:</span>
                <span class="font-medium text-slate-800">${txn.customer}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Payment Mode:</span>
                <span class="font-semibold text-slate-800">${txn.payment}</span>
            </div>
        </div>

        <div class="py-3">
            <table class="w-full text-xs">
                <thead>
                    <tr class="border-b text-slate-400 font-medium">
                        <th class="text-left pb-1">Item</th>
                        <th class="text-center pb-1">Qty</th>
                        <th class="text-right pb-1">Rate</th>
                        <th class="text-right pb-1">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${txn.items.map(it => `
                        <tr>
                            <td class="py-1.5 text-slate-800">${it.name}</td>
                            <td class="py-1.5 text-center text-slate-600">${it.qty}</td>
                            <td class="py-1.5 text-right text-slate-600">₹${it.price.toFixed(2)}</td>
                            <td class="py-1.5 text-right font-semibold text-slate-900">₹${it.subtotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="pt-3 border-t border-dashed border-slate-300 text-xs space-y-1">
            <div class="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>₹${txn.subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-slate-600">
                <span>GST Tax (5%):</span>
                <span>₹${txn.tax.toFixed(2)}</span>
            </div>
            ${txn.discount > 0 ? `
                <div class="flex justify-between text-emerald-600 font-medium">
                    <span>Discount:</span>
                    <span>-₹${txn.discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total:</span>
                <span class="text-blue-600">₹${txn.total.toFixed(2)}</span>
            </div>
        </div>

        <div class="mt-6 pt-4 text-center border-t border-slate-200 text-xs text-slate-400">
            <p>Thank you for shopping at VCET Supermarket!</p>
            <p class="font-mono text-[10px] mt-1">Student: Ashvika K | Reg: 732925ITR009</p>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeReceiptModal() {
    document.getElementById('receipt-modal').classList.add('hidden');
}

// ----------------------------------------------------------------------------
// 4. REPORTS & INVOICES (FR5)
// ----------------------------------------------------------------------------
function renderReports() {
    // 1. Daily Sales Summary
    const dailyMap = {};
    transactions.forEach(t => {
        const d = t.date.slice(0, 10);
        if (!dailyMap[d]) {
            dailyMap[d] = { orders: 0, gross: 0, tax: 0, discount: 0, net: 0 };
        }
        dailyMap[d].orders += 1;
        dailyMap[d].gross += t.subtotal;
        dailyMap[d].tax += t.tax;
        dailyMap[d].discount += t.discount;
        dailyMap[d].net += t.total;
    });

    const dailyTbody = document.getElementById('report-daily-sales');
    if (dailyTbody) {
        const sortedDates = Object.keys(dailyMap).sort().reverse();
        dailyTbody.innerHTML = sortedDates.map(d => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="py-2.5 px-3 font-semibold text-slate-800 text-sm">${d}</td>
                <td class="py-2.5 px-3 text-center text-sm">${dailyMap[d].orders}</td>
                <td class="py-2.5 px-3 text-sm text-right">₹${dailyMap[d].gross.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-sm text-right">₹${dailyMap[d].tax.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-sm text-right text-emerald-600">₹${dailyMap[d].discount.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-sm text-right font-bold text-blue-600">₹${dailyMap[d].net.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    // 2. Low-Stock Reorder Report
    const lowStockTbody = document.getElementById('report-low-stock');
    if (lowStockTbody) {
        const lowItems = products.filter(p => p.stock <= p.reorder).sort((a,b) => a.stock - b.stock);
        if (lowItems.length === 0) {
            lowStockTbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-emerald-600 font-medium">All products are healthy! No items below reorder threshold.</td></tr>`;
        } else {
            lowStockTbody.innerHTML = lowItems.map(p => {
                const deficit = Math.max(0, p.reorder - p.stock);
                return `
                    <tr class="border-b hover:bg-slate-50 transition">
                        <td class="py-2.5 px-3 font-mono text-xs font-bold text-slate-700">${p.id}</td>
                        <td class="py-2.5 px-3 text-sm font-medium text-slate-900">${p.name}</td>
                        <td class="py-2.5 px-3 text-sm text-slate-600">${p.category}</td>
                        <td class="py-2.5 px-3 text-sm font-bold ${p.stock === 0 ? 'text-red-600' : 'text-amber-600'}">
                            ${p.stock} ${p.unit}
                        </td>
                        <td class="py-2.5 px-3 text-sm text-slate-500">${p.reorder} ${p.unit}</td>
                        <td class="py-2.5 px-3 text-right">
                            <button onclick="quickRestock('${p.id}')" class="px-2.5 py-1 text-xs bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition">
                                Order / Restock
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // 3. Top Fast-Selling Products
    const topTbody = document.getElementById('report-top-products');
    if (topTbody) {
        const prodSalesMap = {};
        transactions.forEach(t => {
            t.items.forEach(it => {
                if (!prodSalesMap[it.id]) {
                    prodSalesMap[it.id] = { name: it.name, qty: 0, revenue: 0 };
                }
                prodSalesMap[it.id].qty += it.qty;
                prodSalesMap[it.id].revenue += it.subtotal;
            });
        });

        const topList = Object.values(prodSalesMap).sort((a, b) => b.qty - a.qty).slice(0, 5);
        topTbody.innerHTML = topList.map((tp, idx) => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="py-2.5 px-3 font-bold text-sm text-blue-600">#${idx + 1}</td>
                <td class="py-2.5 px-3 text-sm font-semibold text-slate-900">${tp.name}</td>
                <td class="py-2.5 px-3 text-sm text-center font-bold text-slate-700">${tp.qty} units</td>
                <td class="py-2.5 px-3 text-sm text-right font-bold text-slate-900">₹${tp.revenue.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    // 4. Completed Invoices History
    const invTbody = document.getElementById('report-all-invoices');
    if (invTbody) {
        invTbody.innerHTML = transactions.map(t => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="py-2.5 px-3 font-mono text-xs font-bold text-blue-600">${t.id}</td>
                <td class="py-2.5 px-3 text-xs text-slate-500">${t.date}</td>
                <td class="py-2.5 px-3 text-sm font-medium text-slate-800">${t.customer}</td>
                <td class="py-2.5 px-3 text-xs text-slate-600">${t.payment}</td>
                <td class="py-2.5 px-3 text-xs text-center">${t.items.length} items</td>
                <td class="py-2.5 px-3 text-sm font-bold text-slate-900 text-right">₹${t.total.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-right">
                    <button onclick="viewPastReceipt('${t.id}')" class="px-2 py-1 text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-medium transition">
                        View Receipt
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function viewPastReceipt(id) {
    const txn = transactions.find(t => t.id === id);
    if (txn) renderReceiptModal(txn);
}

// ----------------------------------------------------------------------------
// 5. VISUAL ANALYTICS CHARTS (FR6)
// ----------------------------------------------------------------------------
function renderAnalyticsCharts() {
    // Chart 1: Daily Revenue Trend (Line Chart)
    const dailyMap = {};
    transactions.forEach(t => {
        const d = t.date.slice(0, 10);
        dailyMap[d] = (dailyMap[d] || 0) + t.total;
    });
    const sortedDates = Object.keys(dailyMap).sort();
    const dailyRevData = sortedDates.map(d => dailyMap[d]);

    const ctx1 = document.getElementById('chartRevenueTrend');
    if (ctx1) {
        if (chartsInstances['revTrend']) chartsInstances['revTrend'].destroy();
        chartsInstances['revTrend'] = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: sortedDates,
                datasets: [{
                    label: 'Daily Revenue (₹)',
                    data: dailyRevData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.15)',
                    fill: true,
                    tension: 0.35,
                    borderWidth: 3,
                    pointBackgroundColor: '#1d4ed8',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Daily Sales Revenue Trend (Nov 2026)', font: { size: 14, weight: 'bold' } }
                }
            }
        });
    }

    // Chart 2: Category Revenue Contribution (Doughnut)
    const catMap = {};
    transactions.forEach(t => {
        t.items.forEach(it => {
            const prod = products.find(p => p.id === it.id);
            const cat = prod ? prod.category : 'General';
            catMap[cat] = (catMap[cat] || 0) + it.subtotal;
        });
    });

    const ctx2 = document.getElementById('chartCategoryShare');
    if (ctx2) {
        if (chartsInstances['catShare']) chartsInstances['catShare'].destroy();
        chartsInstances['catShare'] = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: Object.keys(catMap),
                datasets: [{
                    data: Object.values(catMap),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Revenue Contribution by Category', font: { size: 14, weight: 'bold' } }
                }
            }
        });
    }

    // Chart 3: Top 5 Best Sellers (Bar Chart)
    const prodSalesMap = {};
    transactions.forEach(t => {
        t.items.forEach(it => {
            prodSalesMap[it.name] = (prodSalesMap[it.name] || 0) + it.qty;
        });
    });
    const sortedProds = Object.entries(prodSalesMap).sort((a,b) => b[1] - a[1]).slice(0, 5);

    const ctx3 = document.getElementById('chartTopProducts');
    if (ctx3) {
        if (chartsInstances['topProds']) chartsInstances['topProds'].destroy();
        chartsInstances['topProds'] = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: sortedProds.map(p => p[0].slice(0, 18)),
                datasets: [{
                    label: 'Units Sold',
                    data: sortedProds.map(p => p[1]),
                    backgroundColor: '#10b981',
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Top 5 Fast-Moving Items (Units Sold)', font: { size: 14, weight: 'bold' } }
                }
            }
        });
    }

    // Chart 4: Stock vs Reorder Levels
    const stockItems = products.slice(0, 8);
    const ctx4 = document.getElementById('chartStockLevels');
    if (ctx4) {
        if (chartsInstances['stockLvl']) chartsInstances['stockLvl'].destroy();
        chartsInstances['stockLvl'] = new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: stockItems.map(p => p.name.slice(0, 15)),
                datasets: [
                    { label: 'Current Stock', data: stockItems.map(p => p.stock), backgroundColor: '#3b82f6', borderRadius: 4 },
                    { label: 'Reorder Level', data: stockItems.map(p => p.reorder), backgroundColor: '#f59e0b', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Current Stock vs Reorder Threshold (FR5)', font: { size: 14, weight: 'bold' } }
                }
            }
        });
    }
}

// ----------------------------------------------------------------------------
// 6. BACKUP & SEED DATA CONTROLLER
// ----------------------------------------------------------------------------
function resetToDemoData() {
    if (confirm('Reset catalog and transactions to default demo dataset?')) {
        products = JSON.parse(JSON.stringify(SEED_PRODUCTS));
        transactions = JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
        cart = [];
        saveProducts();
        saveTransactions();
        renderDashboard();
        renderInventoryTable();
        renderPOS();
        renderReports();
        renderAnalyticsCharts();
        showToast('Database reset to official VCET demo dataset.');
    }
}

function exportDatabaseJSON() {
    const data = { products, transactions, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vcet_retail_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database JSON backup downloaded.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    renderDashboard();

    // Attach form submit
    const prodForm = document.getElementById('prod-form');
    if (prodForm) {
        prodForm.addEventListener('submit', handleSaveProduct);
    }
});
