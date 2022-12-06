export function reportYoungestAgeAndTotalSalary(people) {

  function youngest() {
    return Math.min(...people.map(p => p.page))
  }

  function totalSalary() {
    return people.reduce((total, p) => total += p.salary )
  }

  return `youngestAge: ${youngest()}, totalSalary: ${totalSalary()}`;
}
