export default class TableComponent {
  constructor(collection) {
    this.collection = collection;
    this.container = document.getElementById("table-body");
    this.visibleCount = 40; // simple virtual scroll
  }

  render() {
    this.container.innerHTML = "";
    const data = this.collection.filtered.slice(0, this.visibleCount);

    data.forEach((emp) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.role}</td>
        <td>${emp.department}</td>
        <td><button data-id="${emp.id}" class="delete-btn">Delete</button></td>
      `;
      this.container.appendChild(row);
    });
  }
}
