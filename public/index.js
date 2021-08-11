const user_token = "fake_token";
const host = "https://cookies-seven.vercel.app";

function verityToken() {
  return fetch(host + "/api/verify-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("COOKIE", document.cookie);
  issueToken().then(() => {
    console.log("verified");
  });
});
