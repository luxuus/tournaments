import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../styles/edit.scss';

export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   game: "",
   limit: "",
   rounds: "",
   date: "",
   status: "",
   roundnames: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     game: form.game,
     limit: form.limit,
     rounds: form.rounds,
     date: form.date,
     status: form.status,
     roundnames: form.roundnames,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="update-form">

      <h1>Update
        <span className='text-gradient'> Tournament</span>
      </h1>

     <form className='form' onSubmit={onSubmit}>

       <div className="form__row">
         <label htmlFor="name">Tournament name</label>
         <input
           type="text"
           className="form-control"
           id="name"
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
           value={form.game}
           onChange={(e) => updateForm({ game: e.target.value })}
           required
         />
       </div>

       <div className="form__row">
         <label htmlFor="limit">Limit</label>
         <input
           type="text"
           className="form-control"
           id="limit"
           value={form.limit}
           onChange={(e) => updateForm({ limit: e.target.value })}
           required
         />
       </div>

       <div className="form__row">
         <label htmlFor="rounds">Rounds</label>
         <input
           type="text"
           className="form-control"
           id="rounds"
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
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
           required
         />
       </div>

       <div className="form__row">
         <label htmlFor="rounds">Status</label>
         <input
           type="text"
           className="form-control"
           id="status"
           placeholder="Soon ..."
           value={form.status}
           onChange={(e) => updateForm({ status: e.target.value })}
           required
         />
       </div>


       <div className="form__row">
         <label htmlFor="roundnames">Set round names</label>
         <input
           type="checkbox"
           className="form-control"
           id="roundnames"
           checked={form.roundnames}
           onChange={(e) => updateForm({ roundnames: e.target.checked })}
         />
       </div>
 
       <div className="form__row">
        <button type="submit">Update tournament</button>
       </div>

     </form>
   </div>
 );
}