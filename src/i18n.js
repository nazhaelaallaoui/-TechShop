import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  fr: {
    translation: {
      // Navigation
      "home": "Accueil",
      "products": "Produits",
      "cart": "Panier",
      "wishlist": "Liste de souhaits",
      "orders": "Commandes",
      "settings": "Paramètres",
      "profile": "Profil",
      "about": "À propos",
      "contact": "Contact",
      "login": "Connexion",
      "register": "Inscription",
      "logout": "Déconnexion",

      // Common
      "search": "Rechercher",
      "filter": "Filtrer",
      "sort": "Trier",
      "price": "Prix",
      "category": "Catégorie",
      "brand": "Marque",
      "rating": "Évaluation",
      "addToCart": "Ajouter au panier",
      "buyNow": "Acheter maintenant",
      "viewDetails": "Voir les détails",
      "quantity": "Quantité",
      "total": "Total",
      "subtotal": "Sous-total",
      "shipping": "Livraison",
      "tax": "TVA",
      "checkout": "Paiement",
      "continueShopping": "Continuer les achats",

      // Product
      "productDetails": "Détails du produit",
      "specifications": "Spécifications",
      "reviews": "Avis",
      "writeReview": "Écrire un avis",
      "customerReviews": "Avis clients",
      "relatedProducts": "Produits similaires",
      "recommended": "Recommandés",

      // Cart
      "yourCart": "Votre panier",
      "emptyCart": "Votre panier est vide",
      "removeItem": "Retirer l'article",
      "clearCart": "Vider le panier",
      "updateQuantity": "Modifier la quantité",

      // Checkout
      "billingAddress": "Adresse de facturation",
      "shippingAddress": "Adresse de livraison",
      "paymentMethod": "Méthode de paiement",
      "orderSummary": "Récapitulatif de commande",
      "placeOrder": "Passer la commande",

      // User
      "welcome": "Bienvenue",
      "myAccount": "Mon compte",
      "orderHistory": "Historique des commandes",
      "personalInfo": "Informations personnelles",
      "changePassword": "Changer le mot de passe",

      // Admin
      "adminPanel": "Panneau d'administration",
      "manageProducts": "Gérer les produits",
      "manageUsers": "Gérer les utilisateurs",
      "manageOrders": "Gérer les commandes",
      "analytics": "Analyses",

      // Messages
      "addedToCart": "Ajouté au panier",
      "removedFromCart": "Retiré du panier",
      "addedToWishlist": "Ajouté à la liste de souhaits",
      "orderPlaced": "Commande passée avec succès",
      "paymentSuccessful": "Paiement réussi",
      "error": "Erreur",
      "success": "Succès",
      "warning": "Avertissement",
      "info": "Information",

      // Search & Filter
      "searchProducts": "Rechercher des produits...",
      "noResults": "Aucun résultat trouvé",
      "sortBy": "Trier par",
      "priceLowToHigh": "Prix croissant",
      "priceHighToLow": "Prix décroissant",
      "ratingHighToLow": "Meilleures évaluations",
      "newest": "Plus récent",
      "popularity": "Popularité",

      // Categories
      "smartphones": "Smartphones",
      "laptops": "Ordinateurs portables",
      "tablets": "Tablettes",
      "audio": "Audio",
      "accessories": "Accessoires",

      // Status
      "pending": "En attente",
      "processing": "En traitement",
      "shipped": "Expédié",
      "delivered": "Livré",
      "cancelled": "Annulé",

      // Chatbot
      "chatSupport": "Support en ligne",
      "typeMessage": "Tapez votre message...",
      "online": "En ligne",
      "offline": "Hors ligne"
    }
  },
  ar: {
    translation: {
      // Navigation
      "home": "الرئيسية",
      "products": "المنتجات",
      "cart": "السلة",
      "wishlist": "قائمة الرغبات",
      "orders": "الطلبات",
      "settings": "الإعدادات",
      "profile": "الملف الشخصي",
      "about": "حولنا",
      "contact": "اتصل بنا",
      "login": "تسجيل الدخول",
      "register": "التسجيل",
      "logout": "تسجيل الخروج",

      // Common
      "search": "بحث",
      "filter": "تصفية",
      "sort": "ترتيب",
      "price": "السعر",
      "category": "الفئة",
      "brand": "العلامة التجارية",
      "rating": "التقييم",
      "addToCart": "إضافة إلى السلة",
      "buyNow": "شراء الآن",
      "viewDetails": "عرض التفاصيل",
      "quantity": "الكمية",
      "total": "المجموع",
      "subtotal": "المجموع الفرعي",
      "shipping": "الشحن",
      "tax": "الضريبة",
      "checkout": "الدفع",
      "continueShopping": "متابعة التسوق",

      // Product
      "productDetails": "تفاصيل المنتج",
      "specifications": "المواصفات",
      "reviews": "التقييمات",
      "writeReview": "كتابة تقييم",
      "customerReviews": "تقييمات العملاء",
      "relatedProducts": "منتجات مشابهة",
      "recommended": "موصى به",

      // Cart
      "yourCart": "سلتك",
      "emptyCart": "سلتك فارغة",
      "removeItem": "إزالة العنصر",
      "clearCart": "إفراغ السلة",
      "updateQuantity": "تحديث الكمية",

      // Checkout
      "billingAddress": "عنوان الفواتير",
      "shippingAddress": "عنوان الشحن",
      "paymentMethod": "طريقة الدفع",
      "orderSummary": "ملخص الطلب",
      "placeOrder": "تقديم الطلب",

      // User
      "welcome": "مرحباً",
      "myAccount": "حسابي",
      "orderHistory": "تاريخ الطلبات",
      "personalInfo": "المعلومات الشخصية",
      "changePassword": "تغيير كلمة المرور",

      // Admin
      "adminPanel": "لوحة الإدارة",
      "manageProducts": "إدارة المنتجات",
      "manageUsers": "إدارة المستخدمين",
      "manageOrders": "إدارة الطلبات",
      "analytics": "التحليلات",

      // Messages
      "addedToCart": "تمت الإضافة إلى السلة",
      "removedFromCart": "تم الحذف من السلة",
      "addedToWishlist": "تمت الإضافة إلى قائمة الرغبات",
      "orderPlaced": "تم تقديم الطلب بنجاح",
      "paymentSuccessful": "تم الدفع بنجاح",
      "error": "خطأ",
      "success": "نجح",
      "warning": "تحذير",
      "info": "معلومات",

      // Search & Filter
      "searchProducts": "البحث عن المنتجات...",
      "noResults": "لا توجد نتائج",
      "sortBy": "ترتيب حسب",
      "priceLowToHigh": "السعر من الأقل للأعلى",
      "priceHighToLow": "السعر من الأعلى للأقل",
      "ratingHighToLow": "أفضل التقييمات",
      "newest": "الأحدث",
      "popularity": "الشعبية",

      // Categories
      "smartphones": "الهواتف الذكية",
      "laptops": "أجهزة الكمبيوتر المحمولة",
      "tablets": "الأجهزة اللوحية",
      "audio": "الصوتيات",
      "accessories": "الإكسسوارات",

      // Status
      "pending": "في الانتظار",
      "processing": "قيد المعالجة",
      "shipped": "تم الشحن",
      "delivered": "تم التسليم",
      "cancelled": "تم الإلغاء",

      // Chatbot
      "chatSupport": "الدعم عبر الدردشة",
      "typeMessage": "اكتب رسالتك...",
      "online": "متصل",
      "offline": "غير متصل"
    }
  },
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "products": "Products",
      "cart": "Cart",
      "wishlist": "Wishlist",
      "orders": "Orders",
      "settings": "Settings",
      "profile": "Profile",
      "about": "About",
      "contact": "Contact",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",

      // Common
      "search": "Search",
      "filter": "Filter",
      "sort": "Sort",
      "price": "Price",
      "category": "Category",
      "brand": "Brand",
      "rating": "Rating",
      "addToCart": "Add to Cart",
      "buyNow": "Buy Now",
      "viewDetails": "View Details",
      "quantity": "Quantity",
      "total": "Total",
      "subtotal": "Subtotal",
      "shipping": "Shipping",
      "tax": "Tax",
      "checkout": "Checkout",
      "continueShopping": "Continue Shopping",

      // Product
      "productDetails": "Product Details",
      "specifications": "Specifications",
      "reviews": "Reviews",
      "writeReview": "Write Review",
      "customerReviews": "Customer Reviews",
      "relatedProducts": "Related Products",
      "recommended": "Recommended",

      // Cart
      "yourCart": "Your Cart",
      "emptyCart": "Your cart is empty",
      "removeItem": "Remove Item",
      "clearCart": "Clear Cart",
      "updateQuantity": "Update Quantity",

      // Checkout
      "billingAddress": "Billing Address",
      "shippingAddress": "Shipping Address",
      "paymentMethod": "Payment Method",
      "orderSummary": "Order Summary",
      "placeOrder": "Place Order",

      // User
      "welcome": "Welcome",
      "myAccount": "My Account",
      "orderHistory": "Order History",
      "personalInfo": "Personal Information",
      "changePassword": "Change Password",

      // Admin
      "adminPanel": "Admin Panel",
      "manageProducts": "Manage Products",
      "manageUsers": "Manage Users",
      "manageOrders": "Manage Orders",
      "analytics": "Analytics",

      // Messages
      "addedToCart": "Added to cart",
      "removedFromCart": "Removed from cart",
      "addedToWishlist": "Added to wishlist",
      "orderPlaced": "Order placed successfully",
      "paymentSuccessful": "Payment successful",
      "error": "Error",
      "success": "Success",
      "warning": "Warning",
      "info": "Information",

      // Search & Filter
      "searchProducts": "Search products...",
      "noResults": "No results found",
      "sortBy": "Sort by",
      "priceLowToHigh": "Price: Low to High",
      "priceHighToLow": "Price: High to Low",
      "ratingHighToLow": "Highest Rated",
      "newest": "Newest",
      "popularity": "Popularity",

      // Categories
      "smartphones": "Smartphones",
      "laptops": "Laptops",
      "tablets": "Tablets",
      "audio": "Audio",
      "accessories": "Accessories",

      // Status
      "pending": "Pending",
      "processing": "Processing",
      "shipped": "Shipped",
      "delivered": "Delivered",
      "cancelled": "Cancelled",

      // Chatbot
      "chatSupport": "Live Chat",
      "typeMessage": "Type your message...",
      "online": "Online",
      "offline": "Offline"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
