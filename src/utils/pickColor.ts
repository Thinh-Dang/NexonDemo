import { Color } from '@/common/enums/enum';

export const pickColor = (num: number): Color => {
  const remainder = num % 4;
  switch (remainder) {
    case 0:
      return Color.clr_light_blue;
      break;
    case 1:
      return Color.clr_light_green;
      break;
    case 2:
      return Color.clr_light_pink;
      break;
    case 3:
      return Color.clr_light_yellow;
      break;
    default:
      return Color.clr_light_green;
      break;
  }
};
