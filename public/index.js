$(function () {
  const api_key = $("#api_key");
  const env = $("#env");
  const username = $("#username");
  $("#launch-app-btn").on("click", () => {
    if (!env.val() || !api_key.val() || !username.val()) {
      return;
    }

    window.open(
      ["/api/messagespring", env.val(), api_key.val(), username.val()].join("/"),
      "_blank"
    );
  });
});
