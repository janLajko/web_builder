import { useState, ReactNode } from 'react';
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

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: Placement;
  className?: string;
}

export function Dropdown({ trigger, children, placement = 'bottom-end', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
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
        className="cursor-pointer inline-flex items-center"
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
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`bg-[#0B132B]/80 backdrop-blur-md text-[#F8FAFC] min-w-[160px] rounded-xl p-1.5 shadow-[0_0_20px_rgba(255,63,216,0.15)] border border-[#9333EA]/30 overflow-hidden ${className}`}
                onClick={() => setIsOpen(false)} // Close on item click
              >
                {children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export function DropdownItem({ 
  children, 
  onClick, 
  icon,
  danger 
}: { 
  children: ReactNode; 
  onClick?: () => void; 
  icon?: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors duration-200
        ${danger 
          ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
          : 'hover:bg-[#151C36] hover:text-[#FF3FD8]'
        }`}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center opacity-70">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="h-px bg-white/10 my-1 mx-2" />;
}
