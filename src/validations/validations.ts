import { Appointment } from "../entities/appointments/appointmentModel";


const validateDate = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date) {
        return "you must insert a date"
    }

    if (typeof (date) !== "string") {
        return "date incorrect, you can put only strings, try again"
    };


};
const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email) {
        return "you must insert an email"
    }

    if (typeof (email) !== "string") {
        return 'Incorrect email, it should only contain strings'
    };

    if (email.length > 100) {
        return 'Email is too long, please try a shorter one. Maximum 100 characters'
    };

};
const validateAvailableDate = async (date: string, idToken: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;

    const todayFormatDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if (todayFormatDate > date) {
        return {
            isValid: false,
            message: "this day is prior to the current day, try again."
        };
    }
}

module.exports = {
    validateAvailableDate,
    validateDate,
    validateEmail,
}