/**
 * Create fast-access function for Modal Item.
 * Dialog
 * Snackbar
 * Side
 */
import { createModal } from "./creators/createModal";
import {
  DialogDefaultData,
  SnackbarDefaultData,
  SideDefaultData
} from "./types/index";

// Default names
const DEFAULT_MODAL_ITEM_NAMES = {
  DIALOG: "_DEFAULT_DIALOG_",
  SNACKBAR: "_DEFAULT_SNACKBAR_",
  SIDE: "_DEFAULT_LEFT_SIDE_",
}

// Create default Modal and get it `open` function.
const open = createModal({
  items: [
    // Add default Dialog
    {
      name: DEFAULT_MODAL_ITEM_NAMES.DIALOG,
      type: "dialog"
    },
    // Add default Snackbar
    {
      name: DEFAULT_MODAL_ITEM_NAMES.SNACKBAR,
      type: "snack-bar",
      position: "top"
    },
    // Add default Side
    {
      name: DEFAULT_MODAL_ITEM_NAMES.SIDE,
      type: "side",
      placeOn: "left"
    }
  ]
});

/**
 * Use to open default dialog.
 * @param data Data for default dialog.
 * @returns 
 */
export function dialog(data: DialogDefaultData) {
  return open!(DEFAULT_MODAL_ITEM_NAMES.DIALOG, data);
}

/**
 * Use to open default snackbar (top is default).
 * @param data Data for default snackbar.
 * @returns 
 */
export function snackbar(data: SnackbarDefaultData) {
  return open!(DEFAULT_MODAL_ITEM_NAMES.SNACKBAR, data);
}

/**
 * Use to open default side (left side is default).
 * @param data Data for default side.
 * @returns 
 */
export function side(data: SideDefaultData) {
  return open!(DEFAULT_MODAL_ITEM_NAMES.SIDE, data);
}