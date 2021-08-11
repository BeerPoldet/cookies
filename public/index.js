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

function verityToken() {
  return fetch(host + "/api/verify-token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("ready");
  console.log("COOKIE", document.cookie);
  if (location.href.startsWith(host)) {
    verityToken().then(() => {
      console.log("verified");
    });
  } else {
    issueToken().then(() => {
      console.log("verified");
    });
  }
});
