export default function generateCode(quantity: number): string {
  let result = '';

  for (let i = 0; i < quantity; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit;
  }

  return result;
}
