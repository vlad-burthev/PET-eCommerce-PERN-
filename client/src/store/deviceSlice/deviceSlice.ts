import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandId: null,
  typeId: null,
  page: 1,
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setBrandId: (state, { payload }) => {
      state.brandId = payload;
    },
    setTypeId: (state, { payload }) => {
      state.typeId = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { setBrandId, setTypeId, setPage } = deviceSlice.actions;
export default deviceSlice.reducer;
