import EmployeeAPI from "./api/EmployeeAPI.js";
import DataService from "./services/DataService.js";
import EmployeeCollection from "./models/EmployeeCollection.js";
import TableComponent from "./components/TableComponent.js";
import SearchComponent from "./components/SearchComponent.js";
import { exportCSV, exportJSON, showMessage } from "./utils/helpers.js";
import Employee from "./models/Employee.js";

class App {
  async init() {
    const api = new EmployeeAPI("https://dummyjson.com");
    const service = new DataService(api);
    this.collection = new EmployeeCollection();

    const employees = await service.loadEmployees();
    this.collection.setEmployees(employees);

    this.table = new TableComponent(this.collection);
    this.table.render();
    this.updateRowsCount();

    // new SearchComponent(this.collection, this.table);

    this.initSearch();
    this.initDelete();
    this.initDepartmentFilter();
    this.initExport();
    this.initModal();
  }

  updateRowsCount() {
    const employeesCount = $(".rows-count");
    employeesCount.text(`${this.collection.filtered.length} employees`);
  }

  initSearch() {
    $("#search-input").on("input", (e) => {
      this.collection.search(e.target.value);
      this.table.render();

      this.updateRowsCount();
    });
  }

  initDelete() {
    $(document).on("click", ".delete-btn", (e) => {
      const id = Number($(e.currentTarget).data("id"));
      if (confirm("Delete employee?")) {
        this.collection.delete(id);
        this.table.render();

        this.updateRowsCount();
      }

      showMessage("Employee deleted successfully✅");

      this.updateRowsCount();
    });
  }

  initDepartmentFilter() {
    const $deptSelect = $("#dept-filter");
    const $filterClearButton = $(".filter-clear-btn");

    this.collection.getDepartments().forEach((d) => {
      $deptSelect.append(`<option value="${d}">${d}</option>`);
    });

    $deptSelect.on("change", () => {
      $filterClearButton.removeClass("hidden");

      const selected = $deptSelect.val() || [];
      this.collection.filterDepartments(selected);
      this.table.render();

      this.updateRowsCount();
    });

    $filterClearButton.on("click", () => {
      const $filterClearButton = $(".filter-clear-btn");

      this.collection.filterDepartments(this.collection);
      this.table.render();

      this.updateRowsCount();

      $deptSelect.val("");
      $filterClearButton.addClass("hidden");
    });
  }

  initExport() {
    $("#export-csv").on("click", () => exportCSV(this.collection.filtered));

    $("#export-json").on("click", () => exportJSON(this.collection.filtered));
  }

  initModal() {
    const $modal = $("#add-new-employee-modal");

    // Open modal
    $("#add-employee-btn").on("click", () => {
      $modal.removeClass("hidden");
    });

    // Close modal (Cancel button)
    $("#close-modal").on("click", () => {
      $modal.addClass("hidden");
    });

    // Close modal by clicking outside content
    $modal.on("click", (e) => {
      if (e.target.id === "modal") {
        $modal.addClass("hidden");
      }
    });

    //Populate department dropdown
    let employeeDepartmentSelect = $("#emp-department");
    const departmentsList = this.collection.getDepartments();

    for (const department in departmentsList) {
      const departmentName = departmentsList[department];
      employeeDepartmentSelect.append(
        `<option value="${departmentName}">${departmentName}</option>`,
      );
    }

    // Save employee
    $("#save-employee").on("click", () => {
      const name = $("#emp-name").val();
      const email = $("#emp-email").val();
      const role = $("#emp-role").val();
      const dept = $("#emp-department").val();

      if (!name) {
        alert("Please enter employee's name!");
        return;
      }

      if (!email) {
        alert("Please enter employee's email address!");
        return;
      }

      if (!role) {
        alert("Please enter employee's role!");
        return;
      }

      if (!dept) {
        alert("Please select a department!");
        return;
      }

      const [firstName, lastName = ""] = name.split(" ");

      const emp = new Employee({
        id: Date.now(),
        firstName,
        lastName,
        email,
        company: { title: role, department: dept },
      });

      this.collection.add(emp);
      this.table.render();
      this.updateRowsCount();

      // Hide modal & clear inputs
      $modal.addClass("hidden");
      $("#emp-name, #emp-email, #emp-role, #emp-department").val("");
    });
  }
}

$(document).ready(() => {
  const app = new App();
  app.init();
});
