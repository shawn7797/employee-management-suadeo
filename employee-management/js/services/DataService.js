import Employee from "../models/Employee.js";

export default class DataService {
  constructor(api) {
    this.api = api;
  }

  async loadEmployees() {
    const apiData = await this.api.fetchEmployees();
    return apiData.map((user) => new Employee(user));
  }
}
