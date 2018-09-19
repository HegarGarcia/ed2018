class Grades {
  constructor(grades = []) {
    this.grades = grades;
  }

  average() {
    return (
      this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
    );
  }

  getStatistics() {}
}

module.exports = Grades;
