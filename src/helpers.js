import { publicVAPIDKey } from "./config";

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

export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) {
    return null;
  }
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
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

export const URLBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const checkNotificationSupport = () => "Notification" in window;

export const checkNotificationPromise = () => {
  try {
    Notification.requestPermission().then();
  } catch (error) {
    return false;
  }

  return true;
};

export const getNotificationPermission = () => {
  if (checkNotificationSupport()) {
    return Notification.permission;
  }

  return false;
};

export const askNotificationPermission = async () => {
  if (!checkNotificationSupport()) {
    throw new Error("This browser does not support notifications.");
  } else {
    let result;
    if (checkNotificationPromise()) {
      result = await Notification.requestPermission().then(
        (permission) => permission
      );
    } else {
      result = await Notification.requestPermission((permission) => permission);
    }

    if (result === "denied") {
      throw new Error("Enable notifications in browser settings.");
    }

    return result;
  }
};

export const getServiceWorkerRegistration = async () =>
  navigator.serviceWorker.ready.then(
    (serviceWorkerRegistration) => serviceWorkerRegistration
  );

export const subscribeToNotifications = async () => {
  const registration = await getServiceWorkerRegistration();

  const subscription = registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: URLBase64ToUint8Array(publicVAPIDKey),
  });

  return subscription;
};

export const unsubscribeFromNotifications = async () => {
  const subscription = await getNotificationsSubscription();
  subscription?.unsubscribe();
};

export const getNotificationsSubscription = async () => {
  const registration = await getServiceWorkerRegistration();

  return registration.pushManager.getSubscription();
};

export const convertDate = (date) => {
  if (!date) {
    return null;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(date).toLocaleString("en-US", options);
};

export const randomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  const color = "#" + hex.toString(16);

  return color;
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};
