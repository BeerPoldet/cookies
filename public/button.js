const host = "https://cookies-seven.vercel.app";

function issueToken(user) {
  return fetch(host + "/api/issue-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ user }),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const state = {};
  const label = document.querySelector("#launch_message_spring_label");
  window.addEventListener("message", (event) => {
    console.log(event);
    state.data = event.data;
    label.innerHTML = state.data;
  });
  const status = document.querySelector("#launch_message_spring_status");
  document
    .querySelector("#launch_message_spring_button")
    .addEventListener("click", () => {
      status.innerHTML = "Issuing a token for " + state.data;
      issueToken(state.data)
        .then(() => delay(1))
        .then(() => {
          console.log("verified");
          localStorage.setItem("user_token_from_button", state.data);
          window.open(host + "/public", "_blank");
        });
    });
});

function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
