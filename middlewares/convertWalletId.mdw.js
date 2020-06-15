const firstNumberWallet = 1208;
const firstNumberSaving = 1698;

const lastNumberWallet = 12;
const minusNumberWallet = 7;
const numberWallet = 1000;


module.exports = {
    encodeWalletId: (number, isSaving = false) => {
        return isSaving ? firstNumberSaving * numberWallet + number * minusNumberWallet + lastNumberWallet : firstNumberWallet * numberWallet + number * minusNumberWallet + lastNumberWallet;
    },
    decodeWalletId: (walletId, isSaving = false) => {
        return isSaving ? (walletId - lastNumberWallet) % (firstNumberSaving * numberWallet) / minusNumberWallet : (walletId - lastNumberWallet) % (firstNumberWallet * numberWallet) / minusNumberWallet
    }
}