# Budget-Expense-Calculator


## Project Description
This is a Budget Expense Calculator project created for adding/modifying/deleting user budgets and expenses for each month and then displaying interactive dashboards for generating spending analysis. The project has Signup, Login, Logout, Budget and expense addition options and dashboard section. Additonally timeout token feature is also implemented which gives a pop-up every 40 seconds and provides an option to refresh the token so the user can continue his activity in the app.

## Feature Details

### Before User Authentication:
1. Signup: New user needs to first register in the app to begin adding his monthly activities. The signup option requires First Name, Last Name, Email and Password details for user registration. The user password needs to be minimum 8 characters long in length. Additionally, user email needs to be in valid format. If all these conditions are met, user registration is successful.
   
2. Login: If it is a returning user to the website, the user needs to enter his email and password to log into his dashboard. The credentials provided need to match with the details stored in database while registration. Incorrect credentials will lead to error message.

### After User Authentication:   
1. Budget: The user needs to add budget by providing category and amount. The budget category will be used to map expenses under different categories. Each budget has amount which needs to be mentioned by the user.
   
2. Expense: Once budget is added, the user can now add all his expenses in the expenses section. The expense model requires Name, Description, Budget Type, Amount and Date. Budget Type will be used to map the expense with the appropriate budget which will be used in visualization. Additionally, the date provided will add the budget to respective month and this will again be used in visualization.
   
3. Dashboard: The dashboard section shows 3 visualizations namely Bar Chart, Pie Chart and Line Chart.
   - The Current Month Expense Pie Chart has a drop down to select months from January to December. The pie chart will show all expenses done in the selected month only from the dropdown.
   - The Budget Vs Expense Bar Chart will show all budgets and expenses added for current month(December) only and will update as the month changes.
   - The All Expenses For Each Month Line Chart maps all expenses for each month as a point in the line chart. If the expenses done in previous month was higher then current month then a downward line graph is displayed and vice versa.

4. Logout: This ends the session for the current user and expires his token. The user is redirected to the main page of the website.

### Refresh Token
A token functionality is also implemented in the project to enforce data privacy. Every 40 seconds, the currently logged in user will receive a popup to either refresh token or close the popup. If the refresh token option is selected, a new token is generated for the user and the user can continue his activity. If the user selects close, after 20 seconds the user will be automatically logged out if no activity is detected.


## Tech Stack Used
- Frontend: Angular, chartJS, Bootstrap.
- Backend: NodeJS, ExpressJS, Mongoose.
- Hosting: Digital Ocean, MongoDB Atlas.
