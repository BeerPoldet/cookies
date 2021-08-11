const token = "fake_token";
const host = "http://localhost:3000"

function verityToken() {
  return fetch(host + "/verify", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("ready");
  verityToken().then(() => {
    console.log("verified");
  });
});
