import { Dimensions } from 'react-native';

export const getSize = () =>
  `H:${Dimensions.get('window').height} X W:${Dimensions.get('window').width}`;

export const buildMatrix = (height, width) => {
  const matrix = [];
  let viva = 0;
  let cont = 0;
  const MAX = height * width;

  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let j = 0; j < width; j++) {
      viva = Math.round(Math.random()) === 0 ? 0 : 1;
      if (viva) cont++;
      matrix[i][j] = viva === 1 && cont <= MAX ? 1 : 0;
    }
  }
  return matrix;
};
