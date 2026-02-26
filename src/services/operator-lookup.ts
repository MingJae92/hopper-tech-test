export interface OperatorInfo {
  operator: string;
  country: string;
  estimatedCostPerMinute: number;
}

export async function lookupOperator(
  phoneNumber: string,
  callDate: string
): Promise<OperatorInfo> {
  const delay = Math.floor(Math.random() * 200) + 100;
  await new Promise(resolve => setTimeout(resolve, delay));

  if (Math.random() < 0.05) throw new Error('Operator lookup service temporarily unavailable');

  if (phoneNumber.startsWith('+1')) {
    return {
      operator: phoneNumber.startsWith('+141') ? 'AT&T' : 'Verizon',
      country: 'United States',
      estimatedCostPerMinute: 0.02
    };
  } else if (phoneNumber.startsWith('+44')) {
    return {
      operator: phoneNumber.startsWith('+442') ? 'BT' : 'Vodafone',
      country: 'United Kingdom',
      estimatedCostPerMinute: 0.05
    };
  } else if (phoneNumber.startsWith('+49')) {
    return { operator: 'Deutsche Telekom', country: 'Germany', estimatedCostPerMinute: 0.04 };
  } else if (phoneNumber.startsWith('+33')) {
    return { operator: 'Orange', country: 'France', estimatedCostPerMinute: 0.045 };
  } else {
    return { operator: 'International Operator', country: 'Unknown', estimatedCostPerMinute: 0.10 };
  }
}