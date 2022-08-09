import React, { useState, useEffect }from 'react'
import { faUsers, faStepBackward, faStepForward, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Table, FormControl, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios'


export default function UsersList() {

    const [users,setUsers] = useState([])
    const [page,setPage] = useState({
        currentPage: 1,
        usersPerPage: 5
    })

    const{ currentPage, usersPerPage } = page;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    const numFormCss = {
        width:"45px",
        border:"1px solid #17A2B8",
        color:"#17A2B8",
        textAlign: "center",
        fontWeight: "bold"
    };

    const changePage = (e) => {
        setPage({...page,[e.target.name]: parseInt(e.target.value)})
    }

    const firstPage = () => {
        if(currentPage > 1){
            setPage({
                currentPage: 1,
                usersPerPage: 5
            });
        }
    }
    const prevPage = () => {
        if(currentPage > 1){
            setPage({
                currentPage: currentPage - 1,
                usersPerPage: 5
            });
        }
    }
    const nextPage = () => {
        if(currentPage < Math.ceil(users.length / usersPerPage)){
            setPage({
                currentPage: currentPage + 1,
                usersPerPage: 5
            });
        }
    }
    const lastPage = () => {
        if(currentPage < Math.ceil(users.length / usersPerPage)){
            setPage({
                currentPage: Math.ceil(users.length / usersPerPage),
                usersPerPage: 5
            });
        }
    }

    const loadRandomUsers = async() => {
        const result = await axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
        setUsers(result.data);
    }

    useEffect(() => {
        loadRandomUsers();
    }, []);

  return (
    <div>  
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faUsers}/>   USER LIST</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr align="center">
                <td>Name</td>
                <td>Email</td>
                <td>Address</td>
                <td>Created</td>
              </tr>
            </thead>
            <tbody>
                {users.length === 0 ? 
                    <tr align="center">
                        <td colSpan={4}>No Students Available.</td>
                    </tr> :
                    currentUsers.map((user,index) =>(
                        <tr key={index}>
                            <td>{user.first}{'  '}{user.last}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.created}</td>
                        </tr>
                    ))
                }
            </tbody>
            
          </Table>

        </Card.Body>
        <Card.Footer>
            <div style={{"float":"left"}}>
                Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{"float":"right"}}>
                <InputGroup size='sm'>
                    <Button type='button' variant='outline-info' 
                        disabled={currentPage === 1 ? true: false}
                        onClick={firstPage}
                    >
                        <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button type='button' variant='outline-info' 
                        disabled={currentPage === 1 ? true: false}
                        onClick={prevPage}
                    >
                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                    </Button>
                    <FormControl style={numFormCss} className={"bg-dark"} name="currentPage" value={currentPage}
                    onChange={changePage}/>
                    <Button type='button' variant='outline-info' 
                        disabled={currentPage === totalPages ? true: false}
                        onClick={nextPage}
                    >
                        <FontAwesomeIcon icon={faStepForward}/> Next
                    </Button>
                    <Button type='button' variant='outline-info'
                        disabled={currentPage === totalPages ? true: false}
                        onClick={lastPage}
                    >
                        <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                </InputGroup>
            </div>
        </Card.Footer>
      </Card>
    </div>
  )
}