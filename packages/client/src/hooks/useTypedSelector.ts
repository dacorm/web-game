import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppStateType } from "../redux/store";


export const useTypedSelector: TypedUseSelectorHook<AppStateType>=useSelector