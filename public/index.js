const host = "https://cookies-seven.vercel.app";

function verityToken(saved_user_token) {
  return fetch(host + "/api/verify-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ user_token: saved_user_token }),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const user_session_button = document.querySelector(
    "#check_user_session_button"
  );
  const result_label = document.querySelector("#result");

  function verify() {
    const saved_user_token = localStorage.getItem("user_token_from_button");
    result_label.innerHTML = "Verifing: " + saved_user_token;
    if (saved_user_token) {
      verityToken(saved_user_token).then(() => {
        console.log("verified");
        result_label.innerHTML = "Verified: " + saved_user_token;
      });
    }
  }

  user_session_button.addEventListener("click", () => {
    verify();
  });

  verify();
});
