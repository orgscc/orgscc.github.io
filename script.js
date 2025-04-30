const products = [
        { name: "بوت سيستم", priceSAR: convertPrice("5.75"), priceCredit: convertPrice("20m"), image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348932000475648002/discotools-xyz-icon_1.png?ex=68040412&is=6802b292&hm=762f446c712a74b4823b882d427440f8b27a342833e180696666c202d1cbceb6&" },
        { name: "بوت إدارة", priceSAR: convertPrice("25.75"), priceCredit: convertPrice("1.5m"), image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348937486759362591/discotools-xyz-icon_3.png?ex=6804092e&is=6802b7ae&hm=f87be6aa1c41e608506f2b9202f7ac2019ba05bf7b3ae3cf5b49c0e3a8570832&" },
        { name: "بوت تكت", priceSAR: convertPrice("15.00"), priceCredit: convertPrice("2.5m"), image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348938332213743668/discotools-xyz-icon_4.png?ex=680409f8&is=6802b878&hm=9bda54a28bfd341db7c6127aa3ca3b5d9406942eaeb8357c8e8b572d6a358aba&" },
        { name: "بوت لعبة تحدي العائلات", priceSAR: convertPrice("7.50"), priceCredit: convertPrice("100000k"), image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348938332213743668/discotools-xyz-icon_4.png?ex=680409f8&is=6802b878&hm=9bda54a28bfd341db7c6127aa3ca3b5d9406942eaeb8357c8e8b572d6a358aba&" }
    ];

    const productsContainer = document.getElementById("products-container");

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>
                <img src="https://cdn.discordapp.com/attachments/1186721878363091031/1348942342140465193/Saudi_Riyal_Symbol-1.png?ex=680b4df4&is=6809fc74&hm=bfa18473461f34d4e4a2b18fa0bcd077e0c4290b7086a80fdaa34aa1aa842e00&" style="width: 19px; vertical-align: middle;"> 
                <span style="font-weight: bold; font-size: 19px;">${formatPrice(product.priceSAR)} </span>
            </p>
            <p>
                <img src="https://cdn.discordapp.com/attachments/1186721878363091031/1349643586026868747/cedi.png?ex=680b380a&is=6809e68a&hm=791dcd24ad2b20f090affb9d8a10ef75be9e487384d20f71cc60ed018f04ec62&" style="width: 21px; vertical-align: middle;"> 
                <span>${formatPrice(product.priceCredit)}</span>
            </p>
            <button onclick="addToCart('${product.name}', ${product.priceSAR}, ${product.priceCredit}, 'SAR')">أضف للسلة</button>
            <a href="product-details.html?name=${encodeURIComponent(product.name)}" class="details-btn">تفاصيل المنتج</a>
        `;

        productsContainer.appendChild(productElement);
    });

function convertPrice(price) {
    if (price.includes('M') || price.includes('m')) {
        return parseFloat(price.replace('M', '').replace('m', '')) * 1000000;
    } else if (price.includes('K')) {
        return parseFloat(price.replace('K', '')) * 1000;
    } else {
        return parseFloat(price);
    }
}

function formatPrice(price) {
    if (price >= 1000000) {
        return (price / 1000000).toFixed(2) + "M";
    } else if (price >= 1000) {
        return (price / 1000).toFixed(2) + "K";
    } else {
        return price.toFixed(2);
    }
}

function addToCart(name, priceSAR, priceCredit, currency) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const formattedPrice = currency === 'SAR' ? `${priceSAR.toFixed(2)} ريال` : `${priceCredit} كريدت`;

    const existingProductIndex = cart.findIndex(item => item.name === name && item.currency === currency);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name, price: currency === 'SAR' ? priceSAR : priceCredit, currency, formattedPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("cart-count").innerText = cart.length;
}

function goToCheckoutPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const lastProduct = cart[cart.length - 1];

    if (!lastProduct) return;

    const totalAmount = lastProduct.price * lastProduct.quantity;
    const totalAmountFormatted = lastProduct.currency === 'SAR' ? `${totalAmount.toFixed(2)} ريال` : `${totalAmount} كريدت`;

    document.getElementById("checkout-product-name").innerText = lastProduct.name;
    document.getElementById("checkout-price").innerText = totalAmountFormatted;

    document.getElementById("stc-pay-btn").href = `https://stc-pay-link.com/payment?amount=${totalAmountFormatted}`;
    document.getElementById("discord-pay-btn").href = `https://yourdiscordserver.com/payment?amount=${totalAmount}`;
}
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("DOMContentLoaded", () => {
        // التحقق من الوضع المخزن
        const savedTheme = localStorage.getItem('theme');
        const toggleBtn = document.getElementById('toggle-theme');
        
        // إذا كان الوضع مخزن كـ "light" أو "dark"
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            toggleBtn.src = lightImageUrl; // تغيير صورة الزر للوضع الساطع
        } else {
            document.body.classList.remove('light-mode');
            toggleBtn.src = darkImageUrl; // تغيير صورة الزر للوضع المظلم
        }
    
        // التبديل بين الوضعين عند الضغط على الزر
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                toggleBtn.src = lightImageUrl; // تحديث الصورة
            } else {
                localStorage.setItem('theme', 'dark');
                toggleBtn.src = darkImageUrl; // تحديث الصورة
            }
        });
    });
    


        document.body.appendChild(welcomeScreen);

        setTimeout(() => {
            welcomeScreen.style.opacity = "0";
            setTimeout(() => {
                welcomeScreen.style.display = "none";
                localStorage.setItem("hasVisited", "true");
            }, 1000);
        }, 5000);
    }
);
// دالة لإضافة منتج إلى السلة
function addToCart(product) {
    // جلب السلة الحالية من localStorage (أو مصفوفة فارغة إذا كانت السلة فارغة)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // إضافة المنتج إلى السلة
    cart.push(product);
    
    // حفظ السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // حفظ عدد المنتجات في السلة
    localStorage.setItem('cartCount', cart.length);

    // تحديث العدد المعروض في أيقونة السلة
    updateCartCount();
}

// دالة لتحديث الرقم المعروض بجانب السلة
function updateCartCount() {
    // جلب عدد المنتجات من localStorage
    let cartCount = localStorage.getItem('cartCount') || 0;

    // جلب العنصر الذي يحتوي على الرقم (أيقونة السلة)
    let cartIcon = document.getElementById('cart-icon');
    
    // تحديث النص المعروض في الأيقونة
    if (cartIcon) {
        cartIcon.textContent = `سلة التسوق (${cartCount})`;
    }
}

// استدعاء الدالة عند تحميل الصفحة لتحديث العدد
window.onload = updateCartCount;

// ضبط السنة تلقائي
document.getElementById('year').textContent = new Date().getFullYear();
const images = document.querySelectorAll('.protected-image');

images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault(); // يمنع السحب
    });
});
