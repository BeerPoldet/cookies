const host = "https://cookies-seven.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const result_label = document.querySelector("#result");

  function verify() {
    const saved_user_token = localStorage.getItem("user_token_from_button");
    result_label.innerHTML = "Saved token: " + saved_user_token;
  }

  verify();
});
