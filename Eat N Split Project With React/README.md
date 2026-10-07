# 🍽️ Eat-N-Split

A simple and interactive **React bill-splitting application** that helps you manage friends, track balances, add new friends, and split bills between yourself and a selected friend.

This project was built as a React learning project to practice important concepts such as **components, props, state, event handling, conditional rendering, array methods, controlled inputs, and state updates**.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [React Concepts Practiced](#-react-concepts-practiced)
- [Application Flow](#-application-flow)
- [State Management](#-state-management)
- [Components](#-components)
- [Bill Splitting Logic](#-bill-splitting-logic)
- [Friend Balance Logic](#-friend-balance-logic)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Usage](#-usage)
- [Responsive Design](#-responsive-design)
- [Future Improvements](#-future-improvements)
- [Learning Goals](#-learning-goals)
- [Author](#-author)

---

## 🎯 Overview

**Eat-N-Split** is a React-based application designed to make splitting bills between friends simple.

The application allows you to:

1. View a list of friends.
2. See how much each friend owes you or how much you owe them.
3. Add a new friend.
4. Select a friend.
5. Open a bill-splitting form on the right side.
6. Enter the total bill.
7. Enter your own expense.
8. Automatically calculate the friend's expense.
9. Select who paid the bill.
10. Update the friend's balance after splitting the bill.

---

## ✨ Features

### 👥 Friend List

The application displays all friends in a clean card-based layout.

Each friend contains:

- Profile image
- Friend name
- Current balance
- Select/Close button

Example:

```text
Fahad
Fahad owes you 150rs

[ Select ]

➕ Add Friend

Users can add a new friend using the Add Friend form.

The form accepts:

Friend name
Image URL

A newly added friend starts with:

balance: 0

After successfully adding the friend, the form closes automatically.

💰 Friend Balance

Each friend's balance is displayed according to their current status.

Positive Balance

If:

balance > 0

The application displays:

Fahad owes you 150rs

Positive balances are displayed using a green color.

Negative Balance

If:

balance < 0

The application displays:

You owe Fuzail 70rs

Negative balances are displayed using a red color.

Zero Balance

If:

balance === 0

The application displays:

You and Bantwa are even
🧾 Split Bill

When a friend is selected, the Split Bill component appears on the right side of the application on larger screens.

The form contains:

Bill value
Your expense
Friend's expense
Who is paying the bill?
Split Bill button
🛠️ Technologies Used

This project uses:

React
JavaScript
JSX
React Hooks
CSS
Vite (if the project was created using Vite)
Main React Hook
useState
📁 Project Structure

A basic project structure looks like this:

eat-n-split/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
⚛️ How It Works

The application is divided into multiple React components.

The main component is:

App

Inside App, the application manages the main state and renders:

App
│
├── FriendsList
│   └── Friend
│
├── AddFriend
│
└── SplitBill
🧩 Components
1. App

App is the main component of the application.

It manages:

Friends
Selected friend
Add Friend form visibility

Example state:

const [friends, setFriends] = useState([
  {
    name: "Fahad",
    imgUrl: "...",
    balance: 150,
  },
  {
    name: "Fuzail",
    imgUrl: "...",
    balance: -70,
  },
  {
    name: "Bantwa",
    imgUrl: "...",
    balance: 0,
  },
]);
2. FriendsList

FriendsList receives the friends array through props.

function FriendsList({
  friends,
  selectedFriend,
  setSelectedFriend
}) {

It uses .map() to render every friend.

{friends.map((friend) => (
  <Friend
    key={friend.name}
    friend={friend}
    selectedFriend={selectedFriend}
    setSelectedFriend={setSelectedFriend}
  />
))}
3. Friend

The Friend component displays one friend.

It receives:

friend
selectedFriend
setSelectedFriend

The component displays:

Image
Name
Balance
Select button

When a friend is selected:

setSelectedFriend(friend)

When the selected friend is closed:

setSelectedFriend(null)
4. AddFriend

The AddFriend component is responsible for creating a new friend.

It maintains two local states:

const [friendName, setFriendName] = useState("");
const [imgUrl, setImgUrl] = useState("");

When the form is submitted, a new object is created:

const newFriend = {
  name: friendName,
  imgUrl: imgUrl,
  balance: 0,
};

The new friend is then added to the existing friends array.

setFriends((friends) => [
  ...friends,
  newFriend
]);

The spread operator:

...friends

keeps all existing friends.

Then:

newFriend

is added at the end.

5. SplitBill

The SplitBill component handles the bill-splitting functionality.

It receives:

selectedFriend
setFriends

through props.

It maintains three pieces of local state:

const [billValue, setBillValue] = useState("");
const [yourExpense, setYourExpense] = useState("");
const [billPayer, setBillPayer] = useState("you");
🧠 React Concepts Practiced

This project covers several important React concepts.

1. Components

The UI is divided into reusable components:

App
FriendsList
Friend
AddFriend
SplitBill

This makes the application easier to understand and maintain.

2. Props

Components receive data from their parent using props.

Example:

<Friend
  friend={friend}
  selectedFriend={selectedFriend}
  setSelectedFriend={setSelectedFriend}
/>
3. State

React's useState hook is used to store changing data.

Example:

const [selectedFriend, setSelectedFriend] = useState(null);
4. Conditional Rendering

The Split Bill component is only shown when a friend has been selected.

{selectedFriend && (
  <SplitBill
    selectedFriend={selectedFriend}
    setFriends={setFriends}
  />
)}

If:

selectedFriend === null

the component does not appear.

When a friend is selected, it appears.

5. Array .map()

The friends array is converted into React elements using:

friends.map((friend) => (
  <Friend
    key={friend.name}
    friend={friend}
  />
))
6. Controlled Inputs

Form inputs are controlled using React state.

Example:

<input
  type="text"
  value={friendName}
  onChange={(e) => setFriendName(e.target.value)}
/>

The input value is controlled by:

friendName

and updated through:

setFriendName()
7. Event Handling

React event handlers are used for buttons and forms.

Example:

onClick={() => setSelectedFriend(friend)}

and:

onSubmit={handleAddFriend}
🧮 Bill Splitting Logic

The friend's expense is calculated from:

Friend Expense = Bill Value - Your Expense

In JavaScript:

const friendExpense = billValue - yourExpense;

For example:

Bill Value = 1000
Your Expense = 400

Friend Expense = 1000 - 400

Friend Expense = 600

So the friend paid or owes the remaining:

600
💳 Who Paid the Bill?

The application provides two options:

<option value="you">You</option>
<option value="friend">
  {selectedFriend.name}
</option>

The selected value is stored in:

const [billPayer, setBillPayer] = useState("you");
📊 Balance Update Logic

The balance update depends on who paid the bill.

The application calculates:

const friendBalance =
  billPayer === "you"
    ? friendExpense
    : -friendExpense;
If You Paid

If:

billPayer === "you"

then:

friendBalance = friendExpense

The friend's balance increases.

This means:

Friend owes you money.
If Friend Paid

If:

billPayer === "friend"

then:

friendBalance = -friendExpense

The friend's balance decreases.

This means:

You owe your friend money.
🔄 Updating the Friends Array

After calculating the balance, the application updates the selected friend's balance.

setFriends((friends) =>
  friends.map((friend) =>
    friend.name === selectedFriend.name
      ? {
          ...friend,
          balance: friend.balance + friendBalance,
        }
      : friend
  )
);

The logic works as follows:

Step 1

Loop through all friends:

friends.map()
Step 2

Find the selected friend:

friend.name === selectedFriend.name
Step 3

If the friend matches, create an updated friend object:

{
  ...friend,
  balance: friend.balance + friendBalance,
}

The spread operator:

...friend

keeps all existing properties such as:

name
imgUrl
balance

while replacing the old balance with the new balance.

Step 4

If the friend does not match:

: friend

the original friend is returned unchanged.

🖥️ Layout

The desktop layout uses CSS Grid.

The application is divided into two main columns:

┌───────────────────────────────────────────────┐
│              Eat-N-Split Project              │
│                                               │
│  Friends Section          Split Bill          │
│  ───────────────          ─────────           │
│  Friend 1                 Bill Value          │
│  Friend 2                 Your Expense        │
│  Friend 3                 Friend Expense      │
│                           Bill Payer           │
│  Add Friend               Split Bill          │
│                                               │
└───────────────────────────────────────────────┘

The CSS uses:

display: grid;

and:

grid-template-columns: minmax(500px, 600px) 430px;

This creates:

Left column → Friends
Right column → Split Bill
📱 Responsive Design

The application is also responsive.

On smaller screens, the layout changes from:

LEFT | RIGHT

to:

LEFT
─────
RIGHT

This is handled using CSS media queries.

Example:

@media (max-width: 850px) {
  .app {
    display: flex;
    flex-direction: column;
  }
}

This makes the application easier to use on:

Desktop
Laptop
Tablet
Mobile
🚀 Installation

Clone the project:

git clone <your-repository-url>

Navigate to the project:

cd eat-n-split

Install dependencies:

npm install
▶️ Running the Project

Start the development server:

npm run dev

Then open the local development URL shown in your terminal.

For a typical Vite project, it will look similar to:

http://localhost:5173
📝 Usage
Step 1 — View Friends

When the application starts, existing friends are displayed.

Example:

Fahad
Fuzail
Bantwa
Step 2 — Select a Friend

Click:

Select

on any friend.

The Split Bill component will appear on the right side.

Step 3 — Enter Bill Details

Enter:

Bill value
Your expense

The friend's expense is automatically calculated.

Step 4 — Select the Payer

Choose:

You

or:

Friend
Step 5 — Split the Bill

Click:

Split Bill

The selected friend's balance will be updated.

Step 6 — Add a Friend

Click:

Add Friend

Enter:

Friend Name
Image URL

Then click:

Add

The new friend will appear in the friend list with:

balance: 0
🎨 Styling

The project uses a separate:

App.css

file for application-specific styling.

The CSS handles:

Layout
Friend cards
Buttons
Forms
Inputs
Split Bill panel
Colors
Balance indicators
Responsive design
Hover effects

Global styles are handled separately in:

index.css
🔮 Future Improvements

Some possible improvements for future versions include:

 Add form validation
 Prevent empty friend names
 Validate image URLs
 Prevent duplicate friend names
 Add localStorage support
 Add delete friend functionality
 Add edit friend functionality
 Add transaction history
 Add total balance summary
 Add dark mode
 Add animations
 Add currency selection
 Add multiple-person bill splitting
 Persist data after page refresh
 Add backend/database support
🎓 Learning Goals

This project is especially useful for practicing the following React concepts:

React
│
├── Components
│
├── Props
│
├── useState
│
├── Event Handling
│
├── Conditional Rendering
│
├── Controlled Inputs
│
├── Array.map()
│
├── Updating Arrays in State
│
├── Spread Operator
│
├── Form Handling
│
└── Component Communication

The project demonstrates how multiple small React concepts can be combined to create a complete interactive application.

📌 Important React Pattern Used

One of the most important patterns in this project is updating an object inside an array without directly mutating the original state.

Instead of changing the object directly, the application creates a new array:

setFriends((friends) =>
  friends.map((friend) =>
    friend.name === selectedFriend.name
      ? {
          ...friend,
          balance: friend.balance + friendBalance,
        }
      : friend
  )
);

This follows React's recommended immutable state update pattern.

🏗️ Current Application Architecture
App
│
├── State
│   ├── friends
│   ├── selectedFriend
│   └── showAddFriend
│
├── FriendsList
│   │
│   └── Friend
│
├── AddFriend
│
└── SplitBill
    │
    ├── billValue
    ├── yourExpense
    └── billPayer
📄 Main Files
File	Purpose
App.jsx	React components, state, logic and application structure
App.css	Application layout and styling
index.css	Global CSS/reset styles
main.jsx	React application entry point
README.md	Project documentation
🤝 Contributing

This project is primarily a learning project, but improvements and suggestions are welcome.

If you want to contribute:

Fork the repository.
Create a new branch.
Make your changes.
Commit your changes.
Open a Pull Request.
👨‍💻 Author

Your Name

Built with ❤️ using React + JavaScript.

⭐ Project Status

Status: Learning Project / Functional

The core functionality is implemented:

✅ Friend list
✅ Friend selection
✅ Add Friend
✅ Friend balances
✅ Split Bill
✅ Automatic expense calculation
✅ Balance updates
✅ Responsive layout
✅ Component-based React architecture
🍽️ Eat-N-Split

A simple React application for managing friends and splitting bills.