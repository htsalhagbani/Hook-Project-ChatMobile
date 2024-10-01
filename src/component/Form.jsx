import {React,useState} from "react";

function Setup({ onSetupComplete }) {
    const [user1Name, setUser1Name] = useState('');
    const [user2Name, setUser2Name] = useState('');
    const [user1Image, setUser1Image] = useState('');
    const [user2Image, setUser2Image] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSetupComplete({ user1Name, user1Image, user2Name, user2Image });
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="User 1 Name"
          value={user1Name}
          onChange={(e) => setUser1Name(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="User 1 Image URL"
          value={user1Image}
          onChange={(e) => setUser1Image(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="User 2 Name"
          value={user2Name}
          onChange={(e) => setUser2Name(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="User 2 Image URL"
          value={user2Image}
          onChange={(e) => setUser2Image(e.target.value)}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Start Chat
        </button>
      </form>
    );
  }
  export default Setup