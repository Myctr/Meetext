export const validationRules = {
  name: { minLength: 2, maxLength: 60 },
  nickname: { minLength: 3, maxLength: 30 },
  password: { minLength: 6, maxLength: 128 },
  roomName: { minLength: 2, maxLength: 60 },
  roomPassword: { minLength: 4, maxLength: 128 },
  connectionId: { minLength: 6, maxLength: 100 },
};

export const validateText = (value, label, rule, t) => {
  const normalizedValue = value.trim();
  if (!normalizedValue) return t("validation.required", { label });
  if (normalizedValue.length < rule.minLength) {
    return t("validation.min", { label, count: rule.minLength });
  }
  if (normalizedValue.length > rule.maxLength) {
    return t("validation.max", { label, count: rule.maxLength });
  }
  return "";
};

export const validatePassword = (value, label, t) => {
  if (!value) return t("validation.required", { label });
  if (value.length < validationRules.password.minLength) {
    return t("validation.min", {
      label,
      count: validationRules.password.minLength,
    });
  }
  if (value.length > validationRules.password.maxLength) {
    return t("validation.max", {
      label,
      count: validationRules.password.maxLength,
    });
  }
  return "";
};
