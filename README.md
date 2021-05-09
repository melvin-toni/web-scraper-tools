# Web Scraper Tools

## How to run this project on local environment
1. Download this project from github or pull from git using ```git clone https://github.com/melvin-toni/web-scraper-tools.git``` in command prompt
2. Make sure **node.js** and **npm** installed on the local environment, otherwise project can't run on local
3. Type ```npm install``` in command prompt
4. Type ```npm run start``` in command prompt
5. Open **Postman** app or any Restful API test tools
6. Create new request in the Postman and insert following params
```javascript
    URL: http://localhost:3010/api/scrape
    Method: POST
```
7. Send request and get the result in JSON format and CSV files
8. CSV file saved inside project folder ```/CSV/result.csv```

![Screenshot](./installer/result-in-csv.jpg?raw=true "Result in CSV")
![Screenshot](./installer/postman-example.jpg?raw=true "Postman example")