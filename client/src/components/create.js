import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../styles/create.scss';
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   game: "",
   limit:"",
   rounds: "",
   status: "",
   roundnames: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5050/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", game: "", limit: "", rounds: "", date: "", status: "", roundnames:"" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <>
   <div className="create-form">

     <h1>
      Create New
      <span className='text-gradient'> Tournament</span>
     </h1>

     <form className="form" onSubmit={onSubmit}>

       <div className="form__row">
         <label htmlFor="name">Tournament Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           placeholder="Trials Cup of the Week ..."
           maxLength="30"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           required
         />
       </div>

       <div className="form__row">
         <label htmlFor="game">Game</label>
         <input
           type="text"
           className="form-control"
           id="game"
           placeholder="Trials Rising ..."
           value={form.game}
           onChange={(e) => updateForm({ game: e.target.value })}
         />
       </div>

       <div className="form__row">
         <label htmlFor="limit">Players Limit</label>
         <input
           type="number"
           min="2"
           max="100"
           className="form-control"
           id="limit"
           placeholder="30"
           value={form.limit}
           onChange={(e) => updateForm({ limit: e.target.value })}
           required
         />
       </div>
      
       <div className="form__row">
         <label htmlFor="rounds">Rounds</label>
         <input
           type="number"
           min="1"
           max="10"
           className="form-control"
           id="rounds"
           placeholder="3"
           value={form.rounds}
           onChange={(e) => updateForm({ rounds: e.target.value })}
           required
         />
       </div>

       <div className="form__row">
         <label htmlFor="date">Date</label>
         <input
           type="datetime-local"
           className="form-control"
           id="date"
           placeholder="Soon ..."
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>

       <div className="form__row">
         <label htmlFor="status">Status</label>
         <input
           type="text"
           className="form-control"
           id="status"
           placeholder="Soon ..."
           value={form.status}
           onChange={(e) => updateForm({ status: e.target.value })}
         />
       </div>


       <div className="form__row">
        <label htmlFor="roundnames">Set Rounds Names</label>
        <input 
          type="checkbox" 
          className="form-control" 
          id="roundnames"
          checked={form.roundnames}
          onChange={(e) => updateForm({ roundnames: e.target.checked })}
        />
       </div>

       <div className="form__row">
         <button type="submit">Create tournament</button>
       </div>

     </form>
    </div>
   </>
 );
}