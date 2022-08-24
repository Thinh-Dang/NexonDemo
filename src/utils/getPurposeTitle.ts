import { IPurpose } from '@/@type/params';

export const getPurposetitle = (
  id: string,
  purposes: IPurpose[],
): string | undefined => {
  const purpose = purposes.find((item) => item.id === id);
  if (!purpose) return undefined;
  return purpose.title;
};
