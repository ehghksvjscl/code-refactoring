function calculateCharge(date, quantity, plan) {
  
  return isSummer()
  ? calculateSummerCharge()
  : regularCharge()

  function isSummer() {
    return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
  }
  
  function calculateSummerCharge() {
    return quantity * plan.summerRate
  }
  
  function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge
  }
}