const whois = require("whois");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const dotenv = require('dotenv');
const extractWhoisDetails=require('./src/extractWhois');
const sendEmail=require('./src/sendEmail')
dotenv.config();
// import whois from node-whois;

// WHOIS server configuration
const whoisServer = "whois.verisign-grs.com"; 
const whoisOptions = { server: whoisServer, follow: 2 };

// Email configuration
const emailConfig = {
  host: "smtp.gmail.com", // SMTP host
  port: 587, // SMTP port
  secure: true, // Set to true if using a secure connection (e.g., SSL/TLS)
  auth: {
    user: process.env.user, // Email address for sending the email
    pass: process.env.pass, // Email password or application-specific password
  },
};

// Email recipient
const recipientEmail = process.env.recipientEmail;

// Cron schedule in env file 
const cronSchedule = process.env.cronSchedule;

// Function to extract a specific value from WHOIS data based on the key
function extractValueByKey(data, key) {
  const match = data.match(new RegExp(`${key}:\\s*(.*?)\\s*`));
  return match ? match[1] : null;
}

// Function to write data to the CSV file
function writeToCSV(records) {
  return csvWriter.writeRecords(records);
}

cron.schedule(cronSchedule, run);
