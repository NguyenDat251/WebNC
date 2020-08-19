const firstNumberWallet = 1208;
const firstNumberSaving = 1698;

const lastNumberWallet = 12;
const minusNumberWallet = 7;
const numberWallet = 1000;


const encodeWalletId = (number, isSaving = false) => {
  return isSaving ? firstNumberSaving * numberWallet + number * minusNumberWallet + lastNumberWallet : firstNumberWallet * numberWallet + number * minusNumberWallet + lastNumberWallet;
}
const decodeWalletId = (walletId, isSaving = false) => {
  return isSaving ? (walletId - lastNumberWallet) % (firstNumberSaving * numberWallet) / minusNumberWallet : (walletId - lastNumberWallet) % (firstNumberWallet * numberWallet) / minusNumberWallet
}

console.log(encodeWalletId(6));
console.log(decodeWalletId(encodeWalletId(1)));