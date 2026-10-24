(function () {
  var versionNode = document.getElementById("latestVersion");
  if (!versionNode || !window.fetch) return;

  fetch("manifest.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("manifest unavailable");
      return response.json();
    })
    .then(function (manifest) {
      if (manifest && manifest.version) {
        versionNode.textContent = "v" + String(manifest.version).replace(/^v/i, "");
      }
    })
    .catch(function () {
      // 页面仍可使用；版本号保留 HTML 中的默认值。
    });
})();
