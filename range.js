function controlFromInput(fromSlider, fromMin, toMax, controlSlider) {
  const [from, to] = getParsed(fromMin, toMax);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#000', controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromMin.value = to;
  } else {
      fromSlider.value = from;
  }
}

function controlToMax(toSlider, fromMin, toMax, controlSlider) {
  const [from, to] = getParsed(fromMin, toMax);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#000', controlSlider);
  setToggleAccessible(toMax);
  if (from <= to) {
      toMax.value = to;
      toSlider.value = to;
  } else {
      toMax.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromMin) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#000', toSlider);
  if (from > to) {
      fromMin.value = to;
      fromSlider.value = to;
  } else {
      fromMin.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toMax) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#000', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
      toSlider.value = to;
      toMax.value = to;
  } else {
      toMax.value = from;
      toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
    ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
    ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

function updateProductsByPriceRange(from, to) {
  const productContainers = document.querySelectorAll('.product-container');

  productContainers.forEach(container => {
      const productPrice = parseFloat(container.getAttribute('data-price'));

      if (productPrice >= from && productPrice <= to) {
          container.style.display = 'block';
      } else {
          container.style.display = 'none';
      }
  });
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromMin = document.querySelector('#fromMin');
const toMax = document.querySelector('#toMax');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#000', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromMin);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toMax);
fromMin.oninput = () => controlFromInput(fromSlider, fromMin, toMax, toSlider);
toMax.oninput = () => controlToMax(toSlider, fromMin, toMax, toSlider);


fromSlider.oninput = () => {
  controlFromSlider(fromSlider, toSlider, fromMin);
  updateProductsByPriceRange(parseFloat(fromMin.value), parseFloat(toMax.value));
};

toSlider.oninput = () => {
  controlToSlider(fromSlider, toSlider, toMax);
  updateProductsByPriceRange(parseFloat(fromMin.value), parseFloat(toMax.value));
};

fromMin.oninput = () => {
  controlFromInput(fromSlider, fromMin, toMax, toSlider);
  updateProductsByPriceRange(parseFloat(fromMin.value), parseFloat(toMax.value));
};

toMax.oninput = () => {
  controlToMax(toSlider, fromMin, toMax, toSlider);
  updateProductsByPriceRange(parseFloat(fromMin.value), parseFloat(toMax.value));
};

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= toSlider.min) {
      toSlider.style.zIndex = 2;
  } else {
      toSlider.style.zIndex = 0;
  }
}
