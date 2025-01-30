import React from 'react';

interface PaginationDotsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisibleDots = 5;
    const halfVisibleDots = Math.floor(maxVisibleDots / 2);

    // Adjusted to handle pages starting from 0
    let start = Math.max(currentPage - halfVisibleDots, 0);
    let end = Math.min(currentPage + halfVisibleDots, totalPages - 1);

    // Handle edge cases if the dots are less than maxVisibleDots
    if (end - start + 1 < maxVisibleDots) {
        if (start === 0) {
            end = Math.min(start + maxVisibleDots - 1, totalPages - 1);
        } else {
            start = Math.max(end - maxVisibleDots + 1, 0);
        }
    }

    // Create an array of dots based on the start and end values
    const dots = [];
    for (let i = start; i <= end; i++) {
        dots.push(i);
    }

    return (
        <div className="flex space-x-4 bg-gray-100 p-4 rounded-full">
            {dots.map((dot, index) => (
                <button
                    key={dot}
                    onClick={() => onPageChange(dot)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out 
                        ${dot === currentPage 
                            ? 'bg-tertiary' 
                            : 'bg-gray-400 hover:bg-gray-500 hover:scale-125'} 
                        ${index === 0 && start > 0 ? 'opacity-25 scale-75' : ''} 
                        ${index === dots.length - 1 && end < totalPages - 1 ? 'opacity-25 scale-75' : ''}
                        ${dot === currentPage ? 'transform scale-150' : ''}`}
                />
            ))}
        </div>
    );
};

export default PaginationDots;
