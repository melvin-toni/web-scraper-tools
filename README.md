# Web Scraper Tools

## How to run this project on local environment
1. Download this project from github or pull from git using ```git clone https://github.com/melvin-toni/web-scraper-tools.git``` in command prompt
2. Make sure **node.js** and **npm** installed on the local environment, otherwise project can't run on local
3. Type ```npm install``` in command prompt
4. Open **Postman** app or any Restful API test tools
5. Create new request in the Postman and insert following params
```javascript
    URL: http://localhost:3010/api/scrape
    Method: POST
```
6. Send request and get the result in JSON format and CSV files
7. CSV file saved inside project folder ```/CSV```

![Screenshot](./installer/postman-example.jpg?raw=true "Postman example")