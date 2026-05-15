DebtApi folder is the WebApi Solution
Debt-UI folder is the React front end.

Run the Web Api Project in Visual Studio

1) Clone the repo

2) Database in Sql server
	- Manually create a database in SQL Server named DebtDb
    - Open the script file from /DebtApp/DbScripts in SSMS and run to create the tables in DebtDb

3) Open the Webi in Visual Studio by clicking \DebtApi\DebtApi.slnx
    - Change the appsettings file conectionstring to point to the sql server instance
    - build the solution
    - Run as https and select yes to trust the ASP.NET Code SSL certificate
    - The console window which opens show the port number for the https url
    - In a browser enter url : https://localhost:{port}/swagger/index.html

A Swagger UI page shows 3 endpoints
  
Endpoints

POST /api/Debt
Allows the user to add a repayment plan

GET /api/Debt/customerid
Allows the user to obtain a list of debt using the id of the customer

GET /api/Debt/id
Allows the user to obtain the debt details using a debtid

Test the connection to the database from Swagger UI by trying out endpoint /api/Debt/customerid and enter a value of 101 and checking the 
response.


Run the React UI

1) In VS Code click File\Open Folder and select the Debt-UI folder
2) In services\debtService modify the url for all 3 service functions with the port number to point the
   local running DebtApi.
3) Open git bash in the Debt-UI folder and type npm start

The React UI should open in the browser and display a list of debts.

If a port is already being used, click y in the shown prompt to user a different port.

Limitations

1) The customer id is hardcoded as 101 in the dat-table.js component when calling getDebts function
2) The user can add mulitple repayment plans for a selected debt.  The UI display the most recently added plan.

   
