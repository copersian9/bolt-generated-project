export function calculateQuote(details) {
      let basePrice = 100;
      let modifiers = 1;

      switch (details.type) {
        case 'auto':
          modifiers += details.driverAge < 25 ? 0.5 : 0;
          modifiers += details.drivingHistory === 'poor' ? 0.3 : 0;
          break;
        case 'home':
          modifiers += details.squareFootage > 2000 ? 0.2 : 0;
          modifiers += details.location === 'high-risk' ? 0.4 : 0;
          break;
        case 'life':
          modifiers += details.age > 50 ? 0.6 : 0;
          modifiers += details.healthConditions ? 0.5 : 0;
          break;
        default:
          break;
      }

      const total = basePrice * modifiers;
      return {
        monthly: Math.round(total),
        annual: Math.round(total * 12)
      };
    }
