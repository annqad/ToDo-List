/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  const data = event.data.json();

  let title;
  let body;

  self.clients.matchAll().then((clients) => {
    if (clients && clients.length) {
      const client = clients[0];
      client.postMessage(data);
    }
  });

  switch (data.type) {
    case "TASK_REMIND": {
      title = "REMIND";
      body = `Task "${data.task.title}" remind!`;
      break;
    }
    default:
  }

  self.registration.showNotification(title, {
    body,
  });
});
