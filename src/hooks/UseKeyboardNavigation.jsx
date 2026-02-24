import { useState, useEffect } from 'react';

/**
 * Hook for managing keyboard navigation (Arrow Up/Down, Enter) in lists.
 * 
 * @param {Array} items - The list of items to navigate through.
 * @param {boolean} isOpen - Whether the list is currently visible/active.
 * @param {Function} onSelect - Callback function to execute when an item is selected (Enter).
 * @param {Object} options - Configuration options.
 * @param {number} [options.initialIndex=-1] - The initial index to start from (default -1).
 * @param {React.RefObject} [options.scrollContainerRef] - Ref to the container for auto-scrolling.
 * 
 * @returns {Object} { activeIndex, setActiveIndex, handleKeyDown }
 */
const useKeyboardNavigation = (items, isOpen, onSelect, { initialIndex = -1, scrollContainerRef } = {}) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    // Reset index when items or visibility changes
    useEffect(() => {
        setActiveIndex(initialIndex);
    }, [items, isOpen, initialIndex]);

    // Scroll active item into view
    useEffect(() => {
        if (isOpen && activeIndex >= 0 && scrollContainerRef?.current) {
            const listContainer = scrollContainerRef.current;
            // Assumes the children of the ref are the list items
            const activeItem = listContainer.children[activeIndex];

            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [activeIndex, isOpen, scrollContainerRef]);

    const handleKeyDown = (e) => {
        // If not open or no items, pass through
        if (!isOpen || !items || items.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                // If we are at 0, going up should probably go back to -1 (input focus)
                setActiveIndex(prev => (prev > initialIndex ? prev - 1 : initialIndex));
                break;
            case 'Enter':
                // Only prevent default and select if we have a valid generic selection
                if (activeIndex >= 0 && items[activeIndex]) {
                    e.preventDefault();
                    onSelect(items[activeIndex]);
                }
                break;
            case 'Escape':
                // Optional: We could return a close handler or handle it here, 
                // but usually the specific component handles closing.
                // We'll reset index just in case.
                setActiveIndex(initialIndex);
                break;
            default:
                break;
        }
    };

    return { activeIndex, setActiveIndex, handleKeyDown };
};

export default useKeyboardNavigation;
