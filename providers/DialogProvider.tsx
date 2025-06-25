// providers/DialogProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DialogKey = string;

type DialogContextType = {
  open: (key: DialogKey) => void;
  close: () => void;
  activeDialog: DialogKey | null;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<DialogKey | null>(null);

  const open = (key: DialogKey) => setActiveDialog(key);
  const close = () => setActiveDialog(null);

  return (
    <DialogContext.Provider value={{ open, close, activeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}
