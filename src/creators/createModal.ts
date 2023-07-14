// Creators use to fast create Modal and Modal Item.
import { HTMLModal } from "../classes/HTMLModal";

import { HTMLModalOptions } from "../classes/HTMLModal";

export function createModal(options?: HTMLModalOptions) {
  const htmlModal = new HTMLModal(options);
  return htmlModal;
}