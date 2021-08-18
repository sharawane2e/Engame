export const getClassNames = (defaultClasses, dynamicClasses) => {
  if (dynamicClasses) {
    return defaultClasses + " " + dynamicClasses;
  }
  return defaultClasses;
};
