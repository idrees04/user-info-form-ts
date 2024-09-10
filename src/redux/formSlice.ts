import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    name: string;
    age: number;
    country: string;
}

const initialState: FormState = {
    name: '',
    age: 0,
    country: '',
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<FormState>) => {
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.country = action.payload.country;
        },
    },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
