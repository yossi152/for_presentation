export default function isValidID(id) {
    // Check for non-numeric characters
    if (!/^\d+$/.test(id)) {
      return false;
    }
  
    // Check for valid length
    if (id.length !== 9) {
      return false;
    }
  
    // Calculate the checksum
    const sum = id
      .split('')
      .map(Number)
      .reduce((acc, digit, index) => {
        const weight = (index % 2) + 1;
        const product = digit * weight;
        return acc + (product > 9 ? product - 9 : product);
      }, 0);
  
    // Validate the checksum
    return sum % 10 === 0;
  }
  
  // Example usage:
//   const idNumber = '123456789';
//   if (isValidIsraeliID(idNumber)) {
//     console.log('Valid Israeli ID number.');
//   } else {
//     console.log('Invalid Israeli ID number.');
//   }
  