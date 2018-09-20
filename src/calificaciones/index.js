class Grades {
  constructor(grades = []) {
    const valid = grades.every(grade => grade <= 10 && grade >= 0);

    if (!valid) {
      throw new Error('Calificaciones fuera del rango permitido');
    }

    this.grades = grades.filter(grade => grade || grade === 0);
  }

  average() {
    return (
      this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
    );
  }

  filter(callback, opc = null) {
    const students = this.grades.filter(callback);
    const amount = opc === '%'
      ? (students.length / this.grades.length) * 100
      : students.length;

    return { students, amount };
  }

  getApprovedStudents(opc = null) {
    return this.filter(grade => grade > 6, opc);
  }

  getFailedStudents(opc = null) {
    return this.filter(grade => grade < 6, opc);
  }

  getGradesOver(baseGrade, opc = null) {
    return this.filter(grade => grade >= baseGrade, opc);
  }
}

module.exports = Grades;
