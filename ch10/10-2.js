function disabilityAmount(employee) {
  if (isNotGetDisabilityAmount(employee)) {
    return 0
  }
  return 1;
}

function isNotGetDisabilityAmount(employee) {
  return employee.seniority < 2 || employee.monthsDisabled > 12 || employee.isPartTime;
}