import { useState, useEffect } from "react";
import { getRandomUsers } from "./API";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState({ userData: [] });
  const [filteredUsers, setFilteredUsers] = useState({ userData: [] });
  const [sortDirection, setSortDirection] = useState(1);

  useEffect(() => {
    getAndSetUsers(20);
  }, []);
  const getAndSetUsers = async (count) => {
    try {
      const {
        data: { results },
      } = await getRandomUsers(count);
      //flattens data
      const userData = results.map((user) => {
        return {
          firstName: user.name.first,
          lastName: user.name.last,
          phone: user.phone,
          age: user.dob.age,
          email: user.email,
          picture: user.picture.thumbnail,
        };
      });
      setUsers({ userData });
      setFilteredUsers({ userData });
    } catch (err) {
      //handles API call errors
      throw new Error(err);
    }
  };
  const handleFilterUsers = (val) => {
    const filtered = users.userData.filter((a) => {
      return (
        a.firstName.toLowerCase().includes(val) || 
        a.lastName.toLowerCase().includes(val) ||
        a.email.toLowerCase().includes(val) ||
        ("" + a.phone).includes(val) ||
        ("" + a.age).includes(val)
      );
    });
    setFilteredUsers({userData: filtered});
  };
   const handleSort = (key) => {
     const sorted = filteredUsers.userData.sort((a, b) => {
       if (a[key] < b[key]) return -1 * sortDirection;
       if (b[key] > a[key]) return 1 * sortDirection;
       return 0;
     });
     setFilteredUsers({userData: sorted});
     setSortDirection( -sortDirection);
   };
   return (
     <>
     <body type="header" className="bg-blue">
     <h1 type="header" style={{textAlign: 'center'}} className="p-3">
       Welcome!
     </h1>
     <div style={{ marginLeft: "10%", width: "50%"}}
     className="btn-group" role="group" aria-label="Basic Example"
     >
       <div className="input-group ml-2 bg-blue">
         <span>
           Employee search
         </span>
         <input onChange={({target: {value}}) =>
        handleFilterUsers(value.toLocaleLowerCase())
         }
        placeholder="or click a header" type="text" className="formControl ml-3"/>
       </div>
       <button type="button" onclick={() => getAndSetUsers(20)} className= "btn btn-secondary">
          Find a little
       </button>
       <button type="button" onclick={() => getAndSetUsers(20)} className= "btn btn-success">
          Find a chunk
       </button>
       <button type="button" onclick={() => getAndSetUsers(20)} className= "btn btn-danger">
          Find a heckin lot
       </button>

     </div>
     <table className="table-primary mt-2" style={{width: "70%", marginLeft: "15%"}}>
       <thread>
         <tr>
           <th scope="col" className="primary">Sort by</th>
            <th onClick={()=> handleSort("firstName")}>
              First
            </th>
            <th onClick={()=> handleSort("lastName")}>
              Last
            </th>
            <th onClick={()=> handleSort("age")}>
              Age
            </th>
            <th onClick={()=> handleSort("phone")}>
              Phone
            </th>
            <th onClick={()=> handleSort("email")}>
              Email Address
            </th>
         </tr>
       </thread>
       <tbody>
         {filteredUsers.userData.map((user, i) =>(
           <tr key={`user${i}`}>
             <th scope="row">
               <img src={user.picture} alt={"user"}/>
             </th>
             <td>{user.firstName}</td>
             <td>{user.lastName}</td>
             <td>{user.age}</td>
             <td>{user.phone}</td>
             <td>{user.email}</td>
           </tr>
         ))}
       </tbody>
      
     </table>
 </body>
     </>
   )
}
export default App;
