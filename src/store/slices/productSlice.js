import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunks
export const fetchProducts = createAsyncThunk('products/fetchAll', async (page = 1, { rejectWithValue }) => {
    try {
        const response = await api.get(`/products?page=${page}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchProduct = createAsyncThunk('products/fetchOne', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createProduct = createAsyncThunk('products/create', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/products/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/products/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products:   [],
        product:    null,
        pagination: null,
        loading:    false,
        errors:     null,
    },
    reducers: {
        clearErrors: (state) => { state.errors = null; },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('API response:', action.payload);
                state.loading    = false;
                state.products   = action.payload.data?.data ?? action.payload.data ?? [];
                state.pagination = action.payload.data?.current_page ? {
                    currentPage: action.payload.data.current_page,
                    lastPage:    action.payload.data.last_page,
                    total:       action.payload.data.total,
                } : null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.errors  = action.payload;
            })

            // Fetch One
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload.data;
            })

            // Create
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.errors  = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload.data);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.errors  = action.payload.errors;
            })

            // Update
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.data.id);
                if (index !== -1) state.products[index] = action.payload.data;
            })

            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })
    },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
