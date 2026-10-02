import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColorStore = {
  submittedColors: string;
  addAColor: (color: string) => void;
  removeAColor: (color: string) => void;
  /** Provide an array of the correctly formatted `c.isValid `colors */
  removeSomeColors: (colors: string[]) => void;
};

export const useColorStore = create<ColorStore>()(
  persist(
    (set, get) => ({
      submittedColors: "",
      addAColor: (color) => {
        // don't want to store duplicates
        const foundColor = get()
          .submittedColors.split("__")
          .find((c) => c === color);

        // only store the incoming value if it's not found in localstorage
        if (!foundColor) {
          // A small check to make sure the formatting of the first color
          // in the list is not suffixed
          // ❌ "#2563eb__"
          // ✔️ "#2563eb"
          if (get().submittedColors) {
            // This block runs if there's already an entry and will prefix
            // the current localstorage value with the valueToStore + "__" + ...
            set({ submittedColors: `${color}__${get().submittedColors}` });
          } else {
            set({ submittedColors: color });
          }
        }
      },
      removeAColor: (color) => {
        let value = get().submittedColors || "";
        // Need to find out where it is in the string.
        // Don't want to delete the '#111' from '#000__#111__#222' and have '#000____#222' remaining.
        // This would break the .split("__") logic everywhere and cause '#000____#222' to be an invalid color.
        if (value.includes(`__${color}`)) {
          value = value.replace(`__${color}`, "");
        } else if (value.includes(`${color}__`)) {
          value = value.replace(`${color}__`, "");
        } else if (value.includes(`__${color}__`)) {
          value = value.replace(`__${color}__`, "");
        } else if (value.includes(color)) {
          value = value.replace(color, "");
        }
        set({ submittedColors: value });
      },
      removeSomeColors: (colors) => {
        let value = get().submittedColors || "";
        value = value
          .split("__")
          .filter((color) => !colors.includes(color))
          .join("__");

        set({ submittedColors: value });
      },
    }),
    {
      name: "submitted-colors", // name of the item in the storage (must be unique)
      // partialize: (state) => ({ submittedColors: state.submittedColors }),
    },
  ),
);
