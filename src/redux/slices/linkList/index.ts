import { createSlice } from "@reduxjs/toolkit";
import { linkList } from "components/constants";

interface IMockData {
  count: number,
  linkList: Array<Object>,
  searchKey: string;
  pageIndex: number,
  pageSize: number,
}

const initialState: IMockData = {
  count: 20,
  linkList: linkList,
  searchKey: '',
  pageIndex: 1,
  pageSize: 5,
};

const mockDataSlice = createSlice({
  name: "linkList",
  initialState,
  reducers: {
    handlePageIndexChange: (state, action) => {
      state.pageIndex = action.payload
    }
  },
});

export const { handlePageIndexChange } = mockDataSlice.actions;

export default mockDataSlice.reducer;
