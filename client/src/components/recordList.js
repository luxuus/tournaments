import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import '../styles/recordList.scss';

const Record = (props) => (
 <div className="tournament__body--row">
   <div className="name" data-content="🏆">{props.record.name}</div>
   <div className="game" data-content="🎮">{props.record.game}</div>
   <div className="limit" data-content="Players Limit">{props.record.limit}</div>
   <div className="rounds" data-content="Number of Rounds">{props.record.rounds}</div>
   <div className="date" data-content="Date">{moment(props.record.date).format("MMMM Do, YYYY")}</div>
   <div className="status" data-content="Status">{props.record.status}</div>
   <div className="action">
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </div>
 </div>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5050/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5050/record/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  <div className="tournament">

    <h1>
      Tournaments
      <span className='text-gradient'> List</span>
    </h1>
    
     
    <div className="tournament__body">

      <div className="tournament__body--row header">
        <div>Tournament</div>
        <div>Game</div>
        <div>Players</div>
        <div>Rounds</div>
        <div>Date</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {recordList()}
    </div>

  </div>

 );
}