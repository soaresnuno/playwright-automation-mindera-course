export const MOCK_HOME = {
  tabs: [
    { key: "home", label: "Home" },
    { key: "inventory", label: "Inventory" },
    { key: "catalog", label: "Catalog" },
    { key: "cart", label: "Cart" },
    { key: "payments", label: "Payments" },
    { key: "orders", label: "Orders" },
  ],
  sections: [
    {
      key: "inventory",
      title: "Inventory",
      description:
        "Manage the store\u2019s inventory and register new products by defining their name, price, and initial quantity.",
    },
    {
      key: "catalog",
      title: "Catalog",
      description:
        "Browse the available products, view details, and add them to your cart for purchase.",
    },
    {
      key: "cart",
      title: "Cart",
      description:
        "View the items you\u2019ve added. Quantities can be updated only inside the Catalog. When ready, proceed to checkout.",
    },
    {
      key: "payment",
      title: "Payment",
      description:
        "You\u2019ll see a full summary of the cart items. Select a payment method to complete your purchase.",
    },
    {
      key: "orders",
      title: "Orders",
      description:
        "Review your purchase history, including date, items, total, and payment method.",
    },
  ],
  pageDescription:
    "Learn how to make the most of all the features in our application with these quick and easy-to-follow instructions. Each section is designed to make your experience even better!",
};
