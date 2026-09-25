export const validationRules = {
  name: { minLength: 2, maxLength: 60 },
  nickname: { minLength: 3, maxLength: 30 },
  password: { minLength: 6, maxLength: 128 },
  roomName: { minLength: 2, maxLength: 60 },
  roomPassword: { minLength: 4, maxLength: 128 },
  connectionId: { minLength: 6, maxLength: 100 },
};

export const validateText = (value, label, rule) => {
  const normalizedValue = value.trim();
  if (!normalizedValue) return `${label} zorunludur.`;
  if (normalizedValue.length < rule.minLength) {
    return `${label} en az ${rule.minLength} karakter olmalı.`;
  }
  if (normalizedValue.length > rule.maxLength) {
    return `${label} en fazla ${rule.maxLength} karakter olabilir.`;
  }
  return "";
};

export const validatePassword = (value, label = "Şifre") => {
  if (!value) return `${label} zorunludur.`;
  if (value.length < validationRules.password.minLength) {
    return `${label} en az ${validationRules.password.minLength} karakter olmalı.`;
  }
  if (value.length > validationRules.password.maxLength) {
    return `${label} en fazla ${validationRules.password.maxLength} karakter olabilir.`;
  }
  return "";
};
