const token = "fake_token";
const host = "https://cookies-seven.vercel.app"

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
