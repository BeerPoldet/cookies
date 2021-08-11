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
  console.log("COOKIE", document.cookie);
  document.querySelector("#launch_message_spring").addEventListener('click', () => {
    issueToken().then(() => {
      console.log("verified");
    });
  })
});

