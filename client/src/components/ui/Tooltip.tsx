import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  Placement
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: Placement;
  className?: string;
}

export function Tooltip({ content, children, placement = 'top', className = '' }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[context.placement.split('-')[0]] as string;

  return (
    <>
      {React.cloneElement(children, getReferenceProps({
        ref: refs.setReference,
        ...children.props,
      }))}
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
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`bg-[#151C36] text-[#F8FAFC] px-3 py-1.5 rounded-md text-sm shadow-[0_0_15px_rgba(255,63,216,0.35)] border border-[#9333EA]/40 pointer-events-none relative ${className}`}
              >
                {content}
                <div
                  ref={arrowRef}
                  className="absolute bg-[#151C36] w-2 h-2 rotate-45 border-[#9333EA]/40"
                  style={{
                    left: context.middlewareData.arrow?.x != null ? `${context.middlewareData.arrow.x}px` : '',
                    top: context.middlewareData.arrow?.y != null ? `${context.middlewareData.arrow.y}px` : '',
                    [staticSide]: '-4px',
                    borderBottomWidth: staticSide === 'bottom' || staticSide === 'right' ? '1px' : '0',
                    borderRightWidth: staticSide === 'bottom' || staticSide === 'left' ? '1px' : '0',
                    borderTopWidth: staticSide === 'top' || staticSide === 'left' ? '1px' : '0',
                    borderLeftWidth: staticSide === 'top' || staticSide === 'right' ? '1px' : '0',
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
