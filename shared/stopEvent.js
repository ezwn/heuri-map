export const stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
