import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Get all orders
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/orders");
            return response.data.orders;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

// Get single order
export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return response.data.order;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch order"
            );
        }
    }
);

// Create order
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await api.post("/orders", orderData);
            return response.data.order;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create order"
            );
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/orders/${id}/status`, {
                status,
            });

            return response.data.order;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update order status"
            );
        }
    }
);

// Delete order
export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/orders/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete order"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",

    initialState: {
        orders: [],
        selectedOrder: null,
        loading: false,
        error: null,
        successMessage: null,
    },

    reducers: {
        clearOrderMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },

        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Fetch orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch single order
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload);
                state.successMessage = "Order created successfully";
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;

                const updatedOrder = action.payload;

                state.orders = state.orders.map((order) =>
                    order.id === updatedOrder.id ? updatedOrder : order
                );

                if (state.selectedOrder?.id === updatedOrder.id) {
                    state.selectedOrder = updatedOrder;
                }

                state.successMessage = "Order status updated successfully";
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;

                state.orders = state.orders.filter(
                    (order) => order.id !== action.payload
                );

                state.successMessage = "Order deleted successfully";
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearOrderMessages,
    clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
