// src/utils/useLocalStorage.js
import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // Silenciamos el error, pero no dejamos el bloque vacío
      console.error(`useLocalStorage: no se pudo leer "${key}"`, err);
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // notificar a otros componentes (header badge, etc.)
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: value }));
    } catch (err) {
      console.error(`useLocalStorage: no se pudo guardar "${key}"`, err);
    }
  }, [key, value]);

  const update = useCallback((updater) => {
    setValue((prev) => (typeof updater === "function" ? updater(prev) : updater));
  }, []);

  return [value, update];
}
