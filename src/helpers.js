export const isAuth = () => !!localStorage.getItem("token");

export const setAuth = (token) => localStorage.setItem("token", token);

export const getAuth = () => localStorage.getItem("token");

export const clearStorage = () => localStorage.clear();

export const normalizeSentense = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}.`;

export const getErrorMessage = (error) =>
  error.response.data.error || normalizeSentense(error.response.statusText);

export const fieldsToData = (fields) => {
  const data = {};
  fields.forEach(({ name, value }) => (data[name] = value));
  return data;
};

export const keyToLabel = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });

export const getAudioDuration = (dataURL) =>
  new Promise((resolve) => {
    const audio = new Audio(dataURL);
    audio.addEventListener(
      "loadedmetadata",
      () => {
        resolve(audio.duration);
      },
      false
    );
  });

export const getInitials = (firstName, secondName) => {
  if (!firstName && !secondName) {
    return null;
  }
  return `${firstName}${secondName}`.toUpperCase();
};

export const msTo = (format, ms) => {
  switch (format) {
    case "seconds":
      return +(ms / 1000).toFixed();
    case "minutes":
      return +(ms / 1000 / 60).toFixed();
    case "hours":
      return +(ms / 1000 / 60 / 24).toFixed();
    default:
  }
};

export const getInputDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
