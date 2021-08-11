const user_token = "fake_token";
const host = "https://cookies-seven.vercel.app";

function issueToken() {
  return fetch(host + "/api/issue-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ user_token }),
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
  document
    .querySelector("#launch_message_spring_button")
    .addEventListener("click", () => {
      localStorage.setItem("user_token_from_button", state.data || user_token);
      issueToken().then(() => {
        console.log("verified");
      });
    });
});
