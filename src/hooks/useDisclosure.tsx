import { useCallback, useState } from "react";

export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((_isOpen) => !_isOpen);
  return {
    isOpen,
    onOpen: useCallback(onOpen, []),
    onClose: useCallback(onClose, []),
    onToggle: useCallback(onToggle, []),
  };
}
