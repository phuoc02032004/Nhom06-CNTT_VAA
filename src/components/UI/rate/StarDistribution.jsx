const StarDistribution = ({ ratings }) => {
  return (
    <div>
      {ratings.starDistribution.map((star) => (
        <div key={star.stars} className="flex items-center mb-2">
          <span className="w-6">{star.stars}★</span>
          <div className="bg-gray-300 w-full h-2 mx-2 relative">
            <div
              className="bg-yellow-500 h-2"
              style={{
                width: `${(star.count / ratings.totalReviews) * 100}%`,
              }}
            ></div>
          </div>
          <span>{star.count} đánh giá</span>
        </div>
      ))}
    </div>
  );
};

export default StarDistribution;
