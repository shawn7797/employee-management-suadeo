export default class Employee {
  constructor({ id, firstName, lastName, email, company }) {
    this.id = id;
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.role = company?.title || "N/A";
    this.department = company?.department || "General";
  }
}
