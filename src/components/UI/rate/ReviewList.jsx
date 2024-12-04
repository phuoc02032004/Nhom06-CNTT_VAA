const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-5">
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 border-b pb-3">
          <div className="flex items-center justify-between">
            <h5 className="font-bold">{review.name}</h5>
            <span className="text-gray-500 text-sm">{review.date}</span>
          </div>
          <div className="text-yellow-500">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <p className="mt-2">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
