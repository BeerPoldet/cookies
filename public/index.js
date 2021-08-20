$(function () {
  const api_key = $("#api_key");
  const username = $("#username");
  $("#launch-app-btn").on("click", () => {
    if (!api_key.val() || !username.val()) {
      return;
    }

    window.open(
      ["/api/messagespring", api_key.val(), username.val()].join("/"),
      "_blank"
    );
  });
});
