/*

Review

ReviewId
UserId
RestaurantId
ReviewDate
ReviewContent
ReviewRating

*/
export interface Review {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  restId: string;
  rating: number;

}
