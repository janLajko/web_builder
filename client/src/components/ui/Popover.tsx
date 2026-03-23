import React, { useState, ReactNode } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: Placement;
  className?: string;
  isOpenState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function Popover({ trigger, content, placement = 'bottom', className = '', isOpenState }: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = isOpenState || [internalIsOpen, setInternalIsOpen];

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 12 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-flex"
      >
        {trigger}
      </div>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={{
                 ...floatingStyles,
                 zIndex: 50,
              }}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25,
                  mass: 0.8
                }}
                className={`bg-[#151C36]/90 backdrop-blur-xl text-[#F8FAFC] rounded-2xl p-4 shadow-[0_8px_32px_rgba(255,63,216,0.15)] border border-t-[#FF3FD8]/30 border-[#9333EA]/30 ${className}`}
              >
                {content}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
