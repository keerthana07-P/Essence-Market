// app.js - Centralized State Management

const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getWishlist = () => JSON.parse(localStorage.getItem('wishlist') || '[]');
const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const updateCartBadge = () => {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge, #cart-badge'); // Support multiple badges
    
    badges.forEach(badge => {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
};

const updateWishlistBadge = () => {
    const count = getWishlist().length;
    const badges = document.querySelectorAll('.wishlist-badge, #wishlist-badge-nav');
    
    badges.forEach(badge => {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
};

// Calculate Cart Totals
const getCartTotals = () => {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.08); // 8% mock tax
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
};

// Global init to ensure badges are correct across all pages
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateWishlistBadge();
});
