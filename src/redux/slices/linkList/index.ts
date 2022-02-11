import { createSlice } from "@reduxjs/toolkit";

interface IMockData {
  count: number,
  linkList: Array<Object>,
  searchKey: string;
  pageIndex: number,
  pageSize: number,
}

const initialState: IMockData = {
  count: 20,
  linkList: JSON.parse(localStorage.getItem('linkList')) || [],
  searchKey: '',
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
