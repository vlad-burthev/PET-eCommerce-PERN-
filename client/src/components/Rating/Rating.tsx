import { useState, type FC, useEffect } from "react";
import StarIcon from "./icons/star.svg?react";
import classNames from "classnames";

interface I_Rating {
  userId: number;
  deviceId: number;
  rating: number;
  id: number;
}

interface RatingProps {
  ratingArray: I_Rating[];
  slug: string;
}

import styles from "./Rating.module.scss";
import { useAddRatingMutation } from "../../services/deviceAPI";

const star = new Array(5).fill(<StarIcon />);

const Rating: FC<RatingProps> = ({ ratingArray, slug }) => {
  const [rate, setRate] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [addRating] = useAddRatingMutation();

  useEffect(() => {
    const rate = Math.round(
      ratingArray.reduce((acc: number, cur: any) => acc + cur.rating, 0) /
        ratingArray.length
    );
    setCurrentRating(rate);
    setRate(currentRating);
  }, [ratingArray, currentRating]);

  const addRatingHandler = async (rating: number) => {
    await addRating({ slug, rating: Number(rating) });
  };

  return (
    <div>
      {star.map((e, i) => (
        <span
          key={i}
          onClick={() => addRatingHandler(i + 1)}
          onMouseEnter={() => setRate(i + 1)}
          onMouseLeave={() => setRate(currentRating)}
          className={classNames(
            i + 1 <= rate ? styles.active : "",
            styles.star
          )}
        >
          {e}
        </span>
      ))}
    </div>
  );
};

export default Rating;
