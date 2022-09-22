import "./App.css";
import { useState } from "react";
import Axios from "axios";
import {TextField, Button} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Employee() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

 
 



  return (
    <div >
      <div style={{display:'flex',justifyContent:'center',paddingTop:'50px',fontSize:'25px'}}>
        <b>Registration Form For Employees</b>

      </div>
        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}} >
          <TextField placeholder='Name' onChange={(event)=> setName(event.target.value)} sx={{ m: 1, minWidth: 400 }}  />
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}} >
          <TextField placeholder='Age' onChange={(event)=> setAge(event.target.value)} sx={{ m: 1, minWidth: 400 }}  />
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}} >
          <TextField placeholder='Country' onChange={(event)=> setCountry(event.target.value)} sx={{ m: 1, minWidth: 400 }} />
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
          <TextField placeholder='Position' onChange={(event)=> setPosition(event.target.value)} sx={{ m: 1, minWidth: 400 }}  />
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
          <TextField placeholder='Wage(in years)' onChange={(event)=> setWage(event.target.value)} sx={{ m: 1, minWidth: 400 }}  />
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
          <Button onClick={addEmployee} sx={{ m: 1, minWidth: 400 }}  variant="contained">Add Employee </Button>
        </div>

        <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
        <Button  
         sx={{ m: 1, minWidth: 400 }} variant="contained" 
        onClick={getEmployees}>
          Show Employees
          </Button>
        </div>
     

        


        <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Wage</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map((item,key) => (
            <TableRow
            key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.age}</TableCell>
              <TableCell align="right">{item.position}</TableCell>
              <TableCell align="right">{item.country}</TableCell>
              <TableCell align="right">{item.wage}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>


        
      
      
    </div>
  );
}

export default Employee;
