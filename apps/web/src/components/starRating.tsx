import React from 'react';

type StarRatingProps = {
  rating: number; // Rating between 0 and 5, supports decimals
  showValue?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, showValue = true }) => {
  const clamped = Math.max(0, Math.min(rating, 5));
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} color="text-yellow-400" />;
        } else if (i === fullStars && hasHalf) {
          return <HalfStar key={i} />;
        } else {
          return <Star key={i} color="text-gray-300" />;
        }
      })}
      {showValue && (
        <span className="ml-2 text-sm text-gray-700 font-medium">{clamped.toFixed(1)}</span>
      )}
    </div>
  );
};

const Star = ({ color }: { color: string }) => (
  <svg className={`w-5 h-5 ${color}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09L5.74 12.545 1 8.91l6.06-.882L10 2.5l2.94 5.528L19 8.91l-4.74 3.636 1.618 5.545z" />
  </svg>
);

const HalfStar = () => (
  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="lightgray" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGrad)"
      d="M10 15l-5.878 3.09L5.74 12.545 1 8.91l6.06-.882L10 2.5l2.94 5.528L19 8.91l-4.74 3.636 1.618 5.545z"
    />
  </svg>
);

export default StarRating;
