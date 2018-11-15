const faker = require('faker');
const Table = require('cli-table');
class Empleado {
  constructor({ name, address, city, phone, email }) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.email = email;
  }

  toArray() {
    return [this.name, this.phone, this.email, this.address, this.city];
  }
}

function fakeEmployee() {
  return new Empleado(fakeData());
}

function fakeData() {
  return {
    name: faker.name.findName(),
    email: faker.name.findName(),
    city: faker.address.city(),
    address: faker.address.streetAddress(true),
    phone: faker.phone.phoneNumber()
  };
}

class Directory {
  constructor() {
    this.employees = [];
    this.employees[0] = fakeEmployee();
    this.employees[1] = fakeEmployee();
    this.employees[2] = fakeEmployee();
  }

  add(employeeData = fakeData()) {
    const employee = new Empleado(employeeData);
    this.employees.push(employee);
  }

  modify(id = 0, employeeData = fakeData()) {
    if (this.employees.length <= id) {
      throw new Error('ID no válido');
    }
    const employee = this.employees[id];
    const modifyEmployee = { ...employee, ...employeeData };
    this.employees[id] = new Empleado(modifyEmployee);
  }

  remove(id = 0) {
    this.employees.splice(id, 1);
  }

  report() {
    const table = new Table({
      head: ['ID', 'Nombre', 'Tel.', 'Email', 'Dirección', 'Ciudad'],
      colWidths: [5, 25, 25, 25, 25, 25]
    });
    const employeesData = this.employees.map((employee, id) => [
      id,
      ...employee.toArray()
    ]);
    table.push(...employeesData);
    console.log(table.toString());
  }
}

module.exports = Directory;
