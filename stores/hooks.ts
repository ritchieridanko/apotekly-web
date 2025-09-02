import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, IRootState } from "@/stores";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;