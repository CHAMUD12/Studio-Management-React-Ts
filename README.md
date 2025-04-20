# Studio Management System

## Overview
The *Studio Management System* is a web application designed to manage event bookings and rental items efficiently. Built using modern technologies, the system provides a user-friendly interface with real-time updates, ensuring a seamless experience for both customers and administrators.

## 🚀 Features
- 📅 *Event Booking*: Users can browse and book event packages.
- 🎥 *Item Rental*: Customers can rent studio-related items.
- 🔄 *Real-Time Updates*: Live data updates for better user experience.
- 🎨 *User-Friendly Interface*: Built with responsive and intuitive design.
- 🔒 *Secure Authentication*: User login and access control.

## 🛠 Technologies Used
- 🖥 *Frontend*: React, Redux, TypeScript, Tailwind CSS
- ⚙ *Backend*: Node.js, Express.js
- 🗄 *Database*: MySQL
- 🏗 *State Management*: Redux Toolkit
- 🎨 *Styling*: Tailwind CSS
- 📝 *Version Control*: Git & GitHub

## 📥 Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps
1. 📂 Clone the repository:
   sh
   git clone https://github.com/CHAMUD12/Studio-Management-React-Ts.git
   cd studio-management-system

2. 📦 Install dependencies:
   sh
   npm install

3. ▶ Start the development server:
   sh
   npm run dev

4. 🌐 Open the application in your browser at http://localhost:3000

## 📡 API Endpoints
| ⚡ Method | 🔗 Endpoint               | 📌 Description           |
|--------|------------------------|-----------------------|
| GET    | /api/events            | Get all events       |
| POST   | /api/events/book       | Book an event        |
| GET    | /api/rentals           | Get rental items     |
| POST   | /api/rentals/rent      | Rent an item         |

## 📁 Project Structure

<pre>
📦 studio-management-system
┣ 📂 React Frontend
┃ ┣ 📂 src
┃ ┃ ┣ 📂 components
┃ ┃ ┣ 📂 pages
┃ ┃ ┣ 📂 reducers
┃ ┃ ┣ 📂 store
┃ ┃ ┣ 📜 App.tsx
┃ ┃ ┣ 📜 App.css
┃ ┃ ┣ 📜 main.tsx
┃ ┣ 📜 package.json
┣ 📂 server (Node.js Backend)
┃ 📜 README.md
</pre>

## 🔗 Backend Repository
The backend of this project is available separately and built with Node.js, Express, TypeScript, and Prisma ORM.

👉 [Studio-Management-Node-Express](https://github.com/CHAMUD12/Studio-Management-Node-Express.git)

## 🤝 Contributing
Feel free to fork this repository and make contributions. To contribute:
1. 🍴 Fork the repository.
2. 🌿 Create a new branch: git checkout -b feature-branch
3. 💾 Commit your changes: git commit -m "Added new feature"
4. 🚀 Push to the branch: git push origin feature-branch
5. 🔄 Open a pull request.

## 📜 License
This project is licensed under the MIT License.
[MIT](https://github.com/CHAMUD12/Studio-Management-React-Ts/blob/master/LICENSE.txt) License

---
*👤 Author:* [Chamud Shakeen](https://github.com/CHAMUD12)
