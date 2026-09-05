import { useState, createContext, useContext, useEffect } from "react";
import { Colors } from "../constants/theme";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ThemeContext = createContext<
  | {
      theme: "light" | "dark";
      colors: typeof Colors.dark;
      toggleTheme: () => void;
    }
  | undefined
>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [user, setUser] = useState<User | null>(null);
  const colors = Colors[theme];

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return setUser(null);
      setUser(currentUser);
      try {
        const preference = await getDoc(
          doc(db, "users", currentUser?.uid || ""),
        );
        if (preference.exists()) {
          const data = preference.data();
          if (data?.preferences?.theme) {
            return setTheme(data.preferences.theme);
          }
        }
      } catch (error) {
        console.error("Error fetching theme preference:", error);
      }
    });
    return subscriber;
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          "preferences.theme": newTheme,
        });
      } catch (error) {
        console.error("Error updating theme preference:", error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
