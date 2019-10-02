const fixed = (amount: number) => `${amount}rem`;
const relative = (amount: number) => `${amount}em`;

const small = fixed(2);
const medium = fixed(3);
const large = fixed(4);

export default {
  fixed,
  relative,
  small,
  medium,
  large
};
