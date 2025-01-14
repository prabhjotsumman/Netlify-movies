import { combineReducers } from "redux";
import movieReducer from "./movieSlice";
import actorReducer from "./actorSlice";
import producerReducer from "./producerSlice";

// Combine all the reducers to create the root reducer
const rootReducer = combineReducers({
    movies: movieReducer,
    actors: actorReducer,
    producers: producerReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This will infer the types for the state
export default rootReducer;
