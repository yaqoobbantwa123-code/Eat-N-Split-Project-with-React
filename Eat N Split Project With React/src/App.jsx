import { useState } from 'react'
import './App.css'

function App() {
  const [friends, setFriends] = useState([
    {
      name: "Fahad",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAssX2NnLOQV4Ugv5XS1QwMXtMpv0H4z2GX9oC0nFoyQSkwtW7TvUmInU&s=10",
      balance: 150,
    },
    {
      name: "Fuzail",
      imgUrl:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/3e1f909c40ac0bb0bea323ad854f3985-1756740057893/e5655bbb-9b5d-4f01-ad34-ef787801daa5.png",
      balance: -70,
    },
    {
      name: "Bantwa",
      imgUrl:
        "https://memonfederation.org/wp-content/uploads/2023/10/Bantva-Memon-Jamat-Regd.png",
      balance: 0,
    },
  ])

  const [selectedFriend, setSelectedFriend] = useState(null);

  const [showAddFriend, setShowAddFriend] = useState(false);

  return (
    <div className='app'>
      <h1>Eat-N-Split Project</h1>

      <div className='friends-section'>
        <FriendsList 
          friends={friends} 
          selectedFriend = {selectedFriend}
          setSelectedFriend = {setSelectedFriend}
        />

        <button className='main-button' onClick={() => setShowAddFriend(true)}>AddFriend</button>

        {showAddFriend &&(
          <AddFriend setFriends={setFriends} setShowAddFriend={setShowAddFriend}/>
        )}

        
      </div>

      {selectedFriend &&(
          <SplitBill selectedFriend={selectedFriend} setFriends={setFriends} />
        )}
      
    </div>
  )
}

function FriendsList({ friends,selectedFriend,setSelectedFriend }) {
  return (
    <div className='friends-list'>
      {friends.map((friend) => (
        <Friend
          key = {friend.name}
          friend = {friend}
          selectedFriend = {selectedFriend}
          setSelectedFriend = {setSelectedFriend}
        />
      ))}
    </div>
  );
}

function Friend({friend, selectedFriend,setSelectedFriend}) {
  return(
    <div className='friend'>

      <div className='friend-image'>
        <img src={friend.imgUrl} alt={friend.name} />
      </div>

      <div className='friend-info'>
        <h2>{friend.name}</h2>

        <p className= {
          friend.balance > 0
          ? "balance-positive"
          : friend.balance < 0
          ? "balance-negative"
          : "balance-zero"
        }>
          {friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}rs`
            : friend.balance < 0
            ? `You owe ${friend.name} ${Math.abs(friend.balance)}rs`
            :  `You and ${friend.name} are even`
          }
        </p>
      </div>

      {selectedFriend?.name === friend.name ? (
        <button className='close-button' onClick={() => setSelectedFriend(null)}>Close</button>
      ) : (
        <button className='select-button' onClick={() => setSelectedFriend(friend)}>Select</button>
      )}
    </div>
  );

}

function AddFriend({setFriends,setShowAddFriend}) {
  const [friendName, setFriendName] = useState("");
  const [imgUrl , setImgUrl] = useState("");

  function handleAddFriend(e) {
    e.preventDefault();

    const newFriend = {
      name : friendName,
      imgUrl: imgUrl,
      balance: 0,
    };

    setFriends((friends) => [...friends,newFriend]);

    setShowAddFriend(false)

  }

  return (
    <div className='add-friend'>
      <form onSubmit={handleAddFriend}>
        <div className='input-group'>
          <label>Friend Name</label>
          
          <input type="text" placeholder='Enter friend name' value={friendName} onChange={(e) => setFriendName(e.target.value)} />

        </div>

        <div className='input-group'>
          <label>Image Url</label>

          <input type="text" placeholder='Enter image URL' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}/>

        </div>

        <div className='form-buttons'>
          <button className='main-button' type='submit'>Add</button>

          <button className='close-button' type='button' onClick={() => setShowAddFriend(false)}>Close</button>
        </div>
      </form>
    </div>
  );
}

function SplitBill({selectedFriend, setFriends}) {
  const [billValue, setBillValue] = useState("");

  const [yourExpense, setYourExpense] = useState("");

  const [billPayer, setBillPayer] = useState("you");

  const friendExpense = billValue - yourExpense;

  function handleSplitBill(e) {
    e.preventDefault();

    const friendBalance = billPayer === "you"
                          ? friendExpense
                          : -friendExpense

    setFriends((friends) =>
      friends.map((friend) =>
        friend.name === selectedFriend.name
          ? {...friend, balance: friend.balance + friendBalance}
          : friend
      )
    )
  }

  return (
    <div className='split-bill'>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <div className='input-group'>
        <label>Bill Value</label>

        <input type="number" value={billValue} onChange={(e) => setBillValue(e.target.value)} />
      </div>

      <div className='input-group'>
        <label>Your Expense</label>

        <input type="number" value={yourExpense} onChange={(e) => setYourExpense(e.target.value)} />
      </div>

      <div className='input-group'>
        <label>{selectedFriend.name}'s expense</label>

        <input type="number" disabled />
      </div>

      <div className='input-group'>
        <label>Who is paying the bill?</label>

        <select value={billPayer} onChange={(e) => setBillPayer(e.target.value)}>
          <option value="you">You</option>

          <option value="friend">{selectedFriend.name}</option>
        </select>
      </div>

      <button className='split-button' onClick={handleSplitBill}>Split Bill</button>
    </div>
  )
}

export default App;
