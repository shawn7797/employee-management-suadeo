export function exportCSV(data) {
  const rows = data.map(
    (e) => `${e.name},${e.email},${e.role},${e.department}`,
  );
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "employees.csv";
  link.click();
}

export function exportJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "employees.json";
  link.click();
}

export function showMessage(text, duration = 2000) {
  const msg = $("#message");
  msg.text(text).removeClass("hidden").addClass("show");

  setTimeout(() => {
    msg.removeClass("show").addClass("hidden");
  }, duration);
}
