import { IUserImages } from '@/@type/params';

export const favoriteCount = (album: IUserImages[]): number => {
  let count = 0;
  album.forEach((image: IUserImages) => {
    if (image.isFavorite) count++;
  });

  return count;
};
