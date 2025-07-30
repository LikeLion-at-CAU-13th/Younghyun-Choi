import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      discount: 0,
      loading: false,

      sortOrder: "default",
      setSortOrder: (order) => set(() => ({ sortOrder: order })),

      addItem: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.name === product.name && item.price === product.price
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.name === product.name && item.price === product.price
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cartItems: [
              ...state.cartItems,
              { ...product, id: Date.now(), quantity: 1, checked: true },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      toggleItemChecked: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),

      toggleAllChecked: () =>
        set((state) => {
          const allChecked = state.cartItems.every((item) => item.checked);
          return {
            cartItems: state.cartItems.map((item) => ({
              ...item,
              checked: !allChecked,
            })),
          };
        }),

      applyDiscount: async (code) => {
        set((state) => ({ ...state, loading: true }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const discountMap = {
          XAERINOO: 0.1,
          ILOVECAU: 0.5,
        };
        const discount = discountMap[code.toUpperCase()] || 0;
        if (!discount) alert("유효하지 않은 할인 코드입니다.");
        set((state) => ({ ...state, discount, loading: false }));
      },

      getOriginalTotalPrice: () =>
        get().cartItems.reduce(
          (total, item) =>
            item.checked
              ? total + (item.price || 0) * (item.quantity || 1)
              : total,
          0
        ),

      getTotalPrice: () => {
        const total = get().cartItems.reduce(
          (total, item) =>
            item.checked ? total + item.price * item.quantity : total,
          0
        );
        return total * (1 - get().discount);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
export default useCartStore;
