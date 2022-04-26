const register = async () => {
  await navigator.serviceWorker.register(
    `${process.env.PUBLIC_URL}/notifications.js`,
    {
      scope: "/",
    }
  );
};

if ("serviceWorker" in navigator) {
  register().catch((error) => console.error(error));
}
