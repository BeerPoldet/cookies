const host = "https://cookies-seven.vercel.app";

function verityToken(user_token_from_button) {
  return fetch(host + "/api/verify-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ user_token: user_token_from_button }),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("COOKIE", document.cookie);
  const user_session_button = document.querySelector(
    "#check_user_session_button"
  );
  const result_label = document.querySelector("#result");
  user_session_button.addEventListener("click", () => {
    const user_token_from_button = localStorage.getItem(
      "user_token_from_button"
    );
    if (user_token_from_button) {
      verityToken(user_token_from_button).then(() => {
        console.log("verified");
        result_label.innerHTML = "Verified: " + user_token_from_button;
      });
    }
  });
});
