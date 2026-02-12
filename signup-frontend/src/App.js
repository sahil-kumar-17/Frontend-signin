import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState([]);
  const [view, setView] = useState("form");
  useEffect(() => {
    if (view === "users") {
      axios.get('https://dg1p3p1ary5rs.cloudfront.net//all')
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [view]);

  const addUser = (e) => {
    e.preventDefault();

    const userId = document.querySelector("#uid").value;
    const UserName = document.querySelector("#un").value;
    const userMail = document.querySelector("#usermail").value;
    const userPass = document.querySelector("#userpass").value;

    const payload = {
      id: userId,
      userName: UserName,
      userMail: userMail,
      password: userPass
    };

    axios.post('https://dg1p3p1ary5rs.cloudfront.net/add', payload)
      .then(() => {
        setView("success");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className='form-container'>


        {view === "form" && (
          <form onSubmit={addUser}>
            <div className='form-contents uerId'>
              <label>UserId:</label>
              <input type="text" id="uid" required />
            </div>

            <div className='form-contents username'>
              <label>UserName:</label>
              <input type="text" id="un" required />
            </div>

            <div className='form-contents email'>
              <label>Email:</label>
              <input type="email" id="usermail" required />
            </div>

            <div className='form-contents password'>
              <label>Password:</label>
              <input type="password" id="userpass" required />
            </div>

            <div className='form-contents sub-button'>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        )}


        {view === "success" && (
          <div>
            <h2>Signed up successfully</h2>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setView("form")}>
                Back to Signup
              </button>
            </div>
          </div>
        )}


        {view === "users" && (
          <div>
            <h2>Available Users</h2>

            {user.map((u, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p><strong>ID:</strong> {u.id}</p>
                <p><strong>Name:</strong> {u.userName}</p>
                <p><strong>Email:</strong> {u.userMail}</p>
                <hr />
              </div>
            ))}

            <button onClick={() => setView("form")}>
              Back to Signup
            </button>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setView("users")}>
            Show Available Users
          </button>
        </div>

      </div>
    </div>
  );

}

export default App;
