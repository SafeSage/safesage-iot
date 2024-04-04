const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const moment = require('moment');
const { execSync } = require('child_process');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzcwMmJhNzlhYTYwNmZhNzdlMGJhYyIsIm5hbWUiOiJNaXJhbmRhIEJhaWxleSIsImVtYWlsIjoibWlyYW5kYUBtYXJrNDIuMzNtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE3MTIyMjc3NzJ9.3VyJcQmadBDywTi2I-3OnxRhyH1V7AR_q8tVSLt7vRg

var medicines = [];




cron.schedule('*/15 * * * * *', async () => {
    console.log('Cron Job 2 Starting');
    var currDate = new Date();
    console.log(currDate);
    try {
        const response = await axios({
            method: "GET",
            url: "https://safesage.onrender.com/api/medicine/all/65770ff58e2e4e0a51683763",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzcwMmJhNzlhYTYwNmZhNzdlMGJhYyIsIm5hbWUiOiJNaXJhbmRhIEJhaWxleSIsImVtYWlsIjoibWlyYW5kYUBtYXJrNDIuMzNtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE3MTIyMjc3NzJ9.3VyJcQmadBDywTi2I-3OnxRhyH1V7AR_q8tVSLt7vRg"
            }
        });

        console.log(response.data.data);

        if (response.data.data) {
            medicines = response.data.data.medicines;
        }
        if (medicines.length >= 1) {

            for (let med of medicines) {
                for (let time of med?.times) {
                    console.log("here");
                    var medTime = moment(time);
                    const isPast5Seconds = moment().diff(medTime, 'seconds') <= 60;
                    console.log(isPast5Seconds);
                    if (isPast5Seconds) {
                        console.log("RINGGGG");
                    }

                }
            }
        }

    } catch (error) {
        console.log(error);
    }

    console.log('Cron Job Ending');
});

app.listen(3000, () => {
    console.log('Server is running!');
});
