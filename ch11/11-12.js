// 에러를 반환하는 경우 명확하게 

function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23);
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super()
    this.errorCode = errorCode;
  }
}

try {
  const shippingRules = localShippingRules();
} catch (error) {
  if (error instanceof OrderProcessingError) {
    console.log(error);
  }
}
