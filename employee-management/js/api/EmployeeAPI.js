export default class EmployeeAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchEmployees() {
    const res = await fetch(`${this.baseUrl}/users?limit=100`);
    const data = await res.json();
    return data.users;
  }
}
