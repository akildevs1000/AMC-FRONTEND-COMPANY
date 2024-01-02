const axios = require('axios');


const fs = require("fs");

// Define the URL you want to hit
const url = 'https://backend.eztime.online/api/employeesShortList?company_id=1';

// const url = 'https://backend.eztime.online/api/departments?company_id=1&per_page=51';


// Function to make the HTTP request
const makeHttpRequest = () => {
    axios
        .get(url)
        .then(({ data }) => {
            data.forEach(e => {
                let data = `${e.title},${e.first_name},${e.last_name},${e.display_name},${e.employee_id},${e.system_user_id}`;
                fs.appendFileSync("./mycsv.csv", data + "\n");

            });

        })
        .catch((error) => {
            // Handle any errors
            console.error('Request error:', error.message);
        });
};

makeHttpRequest()

// const interval = 2000;
// setInterval(makeHttpRequest, interval);

// // Log a message to indicate that the script is running
// console.log(`Requesting ${url} every ${interval / 1000} seconds...`);
