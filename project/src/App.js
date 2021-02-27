import { useState, useEffect } from "react";
import { getRandomUsers } from "./API";
import "./App.css";

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
       if (b[key] > b[key]) return 1 * sortDirection;
       return 0;
     });
     setFilteredUsers({userData: sorted});
     setSortDirection( -sortDirection);
   };
   return (
     <>
     <h1 style={{textAlign: 'center'}} className="bg-light p-5">
       Welcome!
      
     </h1>

     </>
   )
}
export default App;
