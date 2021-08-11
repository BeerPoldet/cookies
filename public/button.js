const host = "https://cookies-seven.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const state = {};
  const label = document.querySelector("#launch_message_spring_label");
  window.addEventListener("message", (event) => {
    // Check if event comes from Munisison's hostname
    state.data = event.data;
    label.innerHTML = state.data;
  });
  const status = document.querySelector("#launch_message_spring_status");
  document
    .querySelector("#launch_message_spring_button")
    .addEventListener("click", () => {
      status.innerHTML = "Token " + state.data;
      localStorage.setItem("user_token_from_button", state.data);
      window.open(host + "/public", "_blank");
    });
});
