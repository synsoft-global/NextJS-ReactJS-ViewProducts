import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreSliceTypes {
  countries: any;
  states: any;
  home: any;
  storeData: any;
  headerRefHeight?: any;
}

const initialState = {
  countries: [],
  states: [],
  storeData: {},
  home: {},
} as StoreSliceTypes;

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreDetails(state, action: PayloadAction<any>) {
      return {
        ...state,
        countries: action.payload.countries,
        states: action.payload.states,
        storeData: action.payload.storeData,
        subDomain: action.payload.subDomain,
        includeHeaderFooter: action.payload.includeHeaderFooter,
        headerRefHeight: action?.payload?.headerRefHeight,
      };
    },
    setHomeDetails(state, action: PayloadAction<any>) {
      return {
        ...state,
        home: action.payload.home,
      };
    },
  },
});
export const { setStoreDetails, setHomeDetails } = storeSlice.actions;
export default storeSlice.reducer;
