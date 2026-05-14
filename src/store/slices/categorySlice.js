import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createCategory = createAsyncThunk('categories/create', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/categories', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/categories/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading:    false,
        errors:     null,
    },
    reducers: {
        clearErrors: (state) => { state.errors = null; },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading    = false;
                state.categories = action.payload.data;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.errors  = action.payload;
            })

            // Create
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.errors  = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                console.log('response:', action.payload);
                state.categories.push(action.payload.data);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.errors  = action.payload.errors;
            })

            // Update
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(c => c.id === action.payload.data.id);
                if (index !== -1) state.categories[index] = action.payload.data;
            })

            // Delete
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c.id !== action.payload);
            })
    },
});

export const { clearErrors } = categorySlice.actions;
export default categorySlice.reducer;
