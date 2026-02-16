export default class EmployeeCollection {
  constructor() {
    this.employees = [];
    this.filtered = [];
  }

  setEmployees(list) {
    this.employees = list;
    this.filtered = [...list];
  }

  search(term) {
    this.filtered = this.employees.filter(
      (e) =>
        e.name.toLowerCase().includes(term.toLowerCase()) ||
        e.role.toLowerCase().includes(term.toLowerCase()) ||
        e.department.toLowerCase().includes(term.toLowerCase()),
    );
  }

  filterDepartments(depts) {
    if (!depts.length) {
      this.filtered = [...this.employees];
      return;
    }
    this.filtered = this.employees.filter((e) => depts.includes(e.department));
  }

  add(emp) {
    this.employees.unshift(emp);
    this.filtered.unshift(emp);
  }

  delete(id) {
    this.employees = this.employees.filter((e) => e.id !== id);
    this.filtered = this.filtered.filter((e) => e.id !== id);
  }

  getDepartments() {
    const departmentsList = [];
    this.employees.forEach((e) => {
      if (!departmentsList.includes(e.department)) {
        departmentsList.push(e.department);
      }
    });
    return departmentsList;
  }
}
