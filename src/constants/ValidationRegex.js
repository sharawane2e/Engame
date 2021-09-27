const ValidationRegex = {
  EMAIL:
    /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/,
  NUM: /^\d{1,}(\.\d{1,})?$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9_]*$/,
  ONLY_ALPHA: /^[a-zA-Z ]*$/,
  NUM_DECIMALS: /^\d*\.?\d*$/,
  ONLY_NUMBER: /^[0-9\b]+$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
};

export default ValidationRegex;
