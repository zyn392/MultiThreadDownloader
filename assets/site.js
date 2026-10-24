(function () {
  var versionNode = document.getElementById("latestVersion");
  var notesNode = document.getElementById("latestNotes");
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
      if (notesNode) {
        var notes = (manifest && (manifest.description || manifest.notes)) || "";
        notesNode.textContent = notes;
        notesNode.hidden = !notes;
      }
    })
    .catch(function () {
      // 页面仍可使用；版本号保留 HTML 中的默认值。
    });
})();
