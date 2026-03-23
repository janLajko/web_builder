import { useState, ReactNode, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useRole,
  useDismiss,
  useInteractions,
  FloatingPortal,
  VirtualElement
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuProps {
  children: ReactNode;
  content: ReactNode;
}

export function ContextMenu({ children, content }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const virtualElementRef = useRef<VirtualElement>({
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }),
  });

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
    ],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    virtualElementRef.current = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: e.clientX,
        y: e.clientY,
        top: e.clientY,
        left: e.clientX,
        right: e.clientX,
        bottom: e.clientY,
      }),
    };
    refs.setReference(virtualElementRef.current);
    setIsOpen(true);
  };

  return (
    <>
      <div 
        onContextMenu={handleContextMenu} 
        style={{ display: 'contents' }}
      >
        {children}
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
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="bg-[#151C36] text-[#F8FAFC] min-w-[160px] rounded-lg p-1.5 shadow-[0_4px_20px_rgba(255,63,216,0.15)] border border-[#9333EA]/30"
                onClick={() => setIsOpen(false)} // close on item click
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

export function ContextMenuItem({ 
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
      className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2 transition-colors duration-200
        ${danger 
          ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
          : 'hover:bg-[#0B132B] hover:text-[#FF3FD8]'
        }`}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center opacity-70">{icon}</span>}
      {children}
    </button>
  );
}
