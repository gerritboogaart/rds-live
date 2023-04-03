import { createSlice } from "@reduxjs/toolkit";
import { getClauses } from "../api/api";

const initialState = [];

const clausesSlice = createSlice({
  name: "clauses",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    async getClausesFromApi(state, action) {
      // const { id, text } = action.payload;
      // "Mutating" update syntax thanks to Immer, and no `return` needed

      const res = await getClauses();

      console.log("test", res);

      state.clauses.push({
        clauses: res,
        completed: true,
      });
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { getClausesFromApi } = todosSlice.actions;

// Export the slice reducer as the default export
export default clausesSlice.reducer;
