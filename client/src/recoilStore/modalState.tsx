import { atom } from "recoil";

export const closedModalState = { open: false, content: null }

export const modalState = atom<{
    open: boolean;
    content: React.ReactNode | null;
}>({
    key: "modalState",
    default: closedModalState,
});
