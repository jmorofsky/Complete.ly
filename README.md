# Complete.ly

Complete.ly is a task management web application. It allows you to track your tasks for the day, enabling you to stay organized and aware of all the work items you need to get done.

Create new tasks, delete or modify existing tasks, add subtasks, sort your tasks into lists or with tags, mark tasks as complete or incomplete, view upcoming tasks for the week, and more. All with Complete.ly!

![image](https://github.com/jmorofsky/Complete.ly/assets/80358703/20d718b1-d2a7-4000-875c-095a430f732c)


### Development

Complete.ly is a web application developed entirely by myself, Jason Morofsky.

It was created using React and React Router. Sample JSON data is loaded into context when the app is started, mimicing data retreived from an api call to a database. All further work done with the data is performed on the "client side"; that is, no additional "api calls" are made back to the sample data. 

In a real-world scenario, whenever the user made any changes, the data would need to be sent back to the database. Otherwise, the next time the user visited the page, all their changes would be lost. This is currently how the app behaves, since there is no backend implementation.

Still, all the behavior of the app is functional and works until the page is refreshed, upon which the data is reset back to default. React router allows us to navigate to different pages on the site without causing a refresh, letting us to hold onto any changes made by the user.

The React hooks useContext and useEffect ensure that any changes made to the data, such as the creation of a new tag, are immediately reflected in all other parts of the application. This works because each part of the app is sharing the same single point of data: the "api call" made to retreive the sample data, which is then saved to context and shared with each component which needs access to the data.

### Installation

To create a working build on your local machine, first clone the repository to your device.

    git clone https://github.com/jmorofsky/complete.ly

Navigate to the repository.

    cd complete.ly

Install dependencies.

    npm i

Start the development server.

    npm start

By default, the dev server is located on port 3000. You can access this server by typing

    localhost:3000

into your desired web browser.
