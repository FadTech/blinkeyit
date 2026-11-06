const generateOtp = () => {
    const otp = Math.floor(Math.random() * 900000)+100000; // Génère un OTP à 6 chiffres    
    return otp.toString();
}
export default generateOtp;