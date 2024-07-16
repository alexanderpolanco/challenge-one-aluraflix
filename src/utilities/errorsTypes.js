const errorsType = [
  "valueMissing",
  "typeMismatch",
  "rangeOverflow",
  "toolong",
  "patternMismatch",
];

const errorsMessageES = {
  titulo: {
    valueMissing: "El título del video es requerido",
    toolong: "La cantidad de caracteres excede el permitido (40)",
    patternMismatch: "Solo se permite ingresar letras y espacios",
  },
  urlImage: {
    valueMissing: "La URL de la imagen del video es requerida",
    typeMismatch: "Ingrese un formato de URL correcto. EJ: http://...",
    toolong: "La cantidad de caracteres excede el permitido (400)",
  },
  urlVideo: {
    valueMissing: "La URL del video es requerida",
    typeMismatch: "Ingrese un formato de URL correcto. EJ: http://...",
    toolong: "La cantidad de caracteres excede el permitido (400)",
  },
  descripcion: {
    valueMissing: "La descripción del video es requerida",
    toolong: "La cantidad de caracteres excede el permitido (200)",
  },
};

const errorsMessageEN = {
  titulo: {
    valueMissing: "The video title is required",
    toolong: "The number of characters exceeds the allowed limit (40)",
    patternMismatch: "Only letters and spaces are allowed",
  },
  urlImage: {
    valueMissing: "The video image URL is required",
    typeMismatch: "Enter a correct URL format. E.g.: http://...",
    toolong: "The number of characters exceeds the allowed limit (400)",
  },
  urlVideo: {
    valueMissing: "The video URL is required",
    typeMismatch: "Enter a correct URL format. E.g.: http://...",
    toolong: "The number of characters exceeds the allowed limit (400)",
  },
  descripcion: {
    valueMissing: "The video description is required",
    toolong: "The number of characters exceeds the allowed limit (200)",
  },
};

const messages = {
  "en-US": errorsMessageEN,
  "es-ES": errorsMessageES,
};

const userLanguage = navigator.language || "en-US";

const errorsMessage = messages[userLanguage] || messages["en-US"];

export { errorsType, errorsMessage };
