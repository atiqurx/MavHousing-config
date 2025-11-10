// Generates random 6 digit verification code
export function genVCode():number{
  let randomSixDigit = '';
  for (let i = 0; i < 6; i++) {
      randomSixDigit += Math.floor(Math.random() * 10);
  }
  return parseInt(randomSixDigit)
}