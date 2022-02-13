import { createSlice } from "@reduxjs/toolkit";

export interface ILinkList {
  linkList: Array<Object>,
  pageIndex: number,
  pageSize: number,
}

export const initialState: ILinkList = {
  linkList: JSON.parse(localStorage.getItem('linkList')) || [],
  pageIndex: 1,
  pageSize: 5,
};

const mockDataSlice = createSlice({
  name: "linkList",
  initialState,
  reducers: {
    handleLinkChange: (state, action) => {
      state.linkList = action.payload;
      localStorage.setItem('linkList', JSON.stringify(action.payload));
    },
    handleLinkSort: (state, action) => {
      state.linkList = action.payload;
    },
    handlePageIndexChange: (state, action) => {
      state.pageIndex = action.payload
    }
  },
});

export const { handlePageIndexChange, handleLinkChange } = mockDataSlice.actions;

export default mockDataSlice.reducer;
