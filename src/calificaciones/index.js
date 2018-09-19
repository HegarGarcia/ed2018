class Grades {
  constructor(grades = []) {
    this.grades = grades;
  }

  average() {
    return (
      this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
    );
  }

  filterStudentsGrades(callback, opc = null) {
    const students = this.grades.filter(callback);
    const amount = opc === '%'
      ? (students.length / this.grades.length) * 100
      : students.length;

    return { students, amount };
  }

  getApprovedStudents(opc = null) {
    return this.filterStudentsGrades(grade => grade > 6, opc);
  }

  getFailedStudents(opc = null) {
    return this.filterStudentsGrades(grade => grade < 6, opc);
  }

  getGradesOver(baseGrade, opc = null) {
    return this.filterStudentsGrades(grade => grade >= baseGrade, opc);
  }
}

module.exports = Grades;
