const host = "https://cookies-seven.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#launch_message_spring_input");
  const iframe = document.querySelector("iframe").contentWindow;
  input.addEventListener("input", (e) => {
    iframe.postMessage(e.target.value, host);
  });
});
