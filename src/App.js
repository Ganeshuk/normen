import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [fix, setFix] = useState(false);
  const [count, setCount] = useState(0); // State to trigger re-fetch

  useEffect(() => {
    fetch("https://how-longery.onrender.com/all")
      .then((re) => re.json())
      .then((re) => {
        setUser(re);
        setFix(true);
      });
  }, [count]); // Depend on count to trigger re-fetch
  
  const submit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const number = document.getElementById("num").value;
    const email = document.getElementById("email").value;
    const description = document.getElementById("des").value;
    console.log(typeof(date))
    const body = {
      name: name,
      date_of_birth: date,
      contact_number: number,
      email: email,
      description: description
    };

    try {
      const response = await fetch("https://how-longery.onrender.com/data", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        const newUser = await response.json();
        setCount(count + 1); // Increment count to trigger re-fetch
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 const delet= async(id)=>{
   console.log(id)
   const r= await fetch(`https://how-longery.onrender.com/delete/${id}`,{method:"DELETE"})
   setCount(count+1)
 }
  return (
    <div className="App">
      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
        <label htmlFor="date">Date of Birth</label>
        <input id="date" type="date" />
        <label htmlFor="num">Contact Number</label>
        <input id="num" type="number" />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <label htmlFor="des">Description</label>
        <textarea id="des"></textarea>
        <button type="submit">Submit</button>
      </form>
      <ul>
        <li>
          <p className='p'>Name</p>
          <p className='p'>Date of Birth</p>
          <p className='p'>Contact Number</p>
          <p className='p'>Email</p>
          <p className='p'>Description</p>
          <p>Delete</p>
          <p>Update</p>
        </li>
        {fix && user.map((each, index) => (
          <li key={index}>
            <p className='p'>{each.name}</p>
            <p className='p'>{each.date_of_birth}</p>
            <p className='p'>{each.contact_number}</p>
            <p className='p'>{each.email}</p>
            <p className='p'>{each.description}</p>
            <p onClick={()=>{delet(each.id)}}>Delete</p>
          <p>Update</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
