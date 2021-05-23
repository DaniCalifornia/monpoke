// /* eslint-disable no-unused-vars */
// class Media {
//   constructor(title, yor) {
//     this.title = title;
//     this.yearOfRelease = yor;
//     this.ratings = [];
//   }
//   getTitle() {
//     return this.title;
//   }
//   getYearOfRelease() {
//     return this.yearOfRelease;
//   }
//   getAverageRating() {
//     if (this.ratings.length == 0) return 'this is not rated';
//     return this.ratings.reduce((acc, key) => acc + key) / this.ratings.length;
//   }
//   addRating(rating) {
//     if (rating > 0 && rating < 101) this.ratings.push(rating);
//     else return `${rating} is not a valid rating, ratings must be 1-100`;
//   }
// }

// class Album extends Media {
//   constructor(title, yor, artist, tracks) {
//     super(title, yor);
//     this.artist = artist;
//     this.tracks = tracks;
//   }
// }
