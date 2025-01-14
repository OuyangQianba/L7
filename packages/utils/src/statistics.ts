interface IItemData {
  [key: string]: any;
}
function max(x: number[]) {
  if (x.length === 0) {
    throw new Error('max requires at least one data point');
  }

  let value = x[0];
  for (let i = 1; i < x.length; i++) {
    // On the first iteration of this loop, max is
    // undefined and is thus made the maximum element in the array
    if (x[i] > value) {
      value = x[i];
    }
  }
  return value;
}

function min(x: number[]) {
  if (x.length === 0) {
    throw new Error('min requires at least one data point');
  }

  let value = x[0];
  for (let i = 1; i < x.length; i++) {
    // On the first iteration of this loop, min is
    // undefined and is thus made the minimum element in the array
    if (x[i] < value) {
      value = x[i];
    }
  }
  return value;
}

function sum(x: number[]) {
  // If the array is empty, we needn't bother computing its sum
  if (x.length === 0) {
    return 0;
  }

  // Initializing the sum as the first number in the array
  let sumNum = x[0] * 1;

  // Keeping track of the floating-point error correction
  let correction = 0;

  let transition;

  for (let i = 1; i < x.length; i++) {
    transition = sumNum + x[i] * 1;

    // Here we need to update the correction in a different fashion
    // if the new absolute value is greater than the absolute sum
    if (Math.abs(sumNum) >= Math.abs(x[i])) {
      correction += sumNum - transition + x[i];
    } else {
      correction += x[i] - transition + sumNum;
    }

    sumNum = transition;
  }

  // Returning the corrected sum
  return sumNum + correction * 1;
}
function mean(x: number[]) {
  if (x.length === 0) {
    throw new Error('mean requires at least one data point');
  }
  return sum(x) / x.length;
}

function mode(x: any[]) {
  if (x.length === 0) {
    throw new Error('mean requires at least one data point');
  }
  if (x.length < 3) {
    return x[0];
  }
  x.sort();
  let last = x[0];
  let value = NaN;
  let maxSeen = 0;
  let seenThis = 1;

  for (let i = 1; i < x.length + 1; i++) {
    if (x[i] !== last) {
      if (seenThis > maxSeen) {
        maxSeen = seenThis;
        value = last;
      }
      seenThis = 1;
      last = x[i];
    } else {
      seenThis++;
    }
  }
  return value;
}

export { sum, max, min, mean, mode };
export const statMap: { [key: string]: any } = {
  min,
  max,
  mean,
  sum,
  mode,
};
export function getColumn(data: IItemData[], columnName: string) {
  return data.map((item: IItemData) => {
    return item[columnName];
  });
}

export function getSatByColumn(type: string, column: number[]) {
  return statMap[type](column);
}
