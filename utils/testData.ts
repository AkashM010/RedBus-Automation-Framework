export const bookingTestData = {
    source: {
        long: 'Hyderabad',
        short: 'Hyd'
    },
    destination: {
        long: 'Bangalore',
        short: 'Ban'
    },
    date: {
        getRelativeDate: (daysFromNow?: number) => {
            // If no value is passed, generate a random one (1-8) inside the function
            const actualDays = daysFromNow ?? Math.floor(Math.random() * 8 + 1);

            const date = new Date();
            date.setDate(date.getDate() + actualDays);
            return {
                day: date.getDate(),
                month: date.toLocaleString('default', { month: 'long' }),
                year: date.getFullYear()
            }
        }
    },
    getRandomFilter: () => {
        const filters = ['AC', 'SLEEPER', 'SINGLE SEATS', 'SEATER', 'NONAC'];
        const randomIndex = Math.floor(Math.random() * filters.length);
        return filters[randomIndex];
    }
};