import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import "./styles.css";
import Spinner from "react-bootstrap/Spinner";

const VenueSinglePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`https://sis.materdeicollege.com/api/venues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // destructuring the data response from api
        const { venue } = data;

        setLoading(false);
        setVenue(venue);
        setSchedule(data.schedules);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <>
      
      <div className="justify-content-center">
        <h1 className="text-center align-item-center text-dark">
          Mater Dei College {venue.building}
        </h1>
        <hr />
        </div>
        <div className="d-flex justify-content-center align-item-center text-dark">
       

        {error && (
          <p className="text-danger text-center">
            Something's wrong fetching the API
          </p>
        )}
        {loading && (
          <p className="text-white text-center">
            <Spinner animation="border" variant="" />
          </p>
        )}
       
        <table className="table overflow-auto bg-info bg-white"> 
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Building</th>
              <th scope="col">Capacity</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.building}</td>
              <td>{venue.capacity}</td>
            </tr>
          </tbody>
        </table>
        
        
        <div className="wrapper">
       
          {Object.keys(schedule)?.map((sched, index) => {
            return (
              
              <div
                className="card m-1 elevation-1"
                style={{
                  width: "600px",
                  height: "270px",
                }}
                key={index}
              >
                
                <div>
                  <div className="card-header bg-dark text-white">
                    <p className="card-text">ID: {schedule[sched].id}</p>
                  </div>
                  <div className="card-body bg-info bg-gradient">
                    <p className="card-text ">
                      <strong>Course No. </strong>
                      
                      {schedule[sched].course_no}
                    </p>
                    <p className="card-text">
                     {" "}
                      <strong> Description: </strong>
                      {schedule[sched].description}
                    </p>
                    <p className="card-text">
                      <strong>Schedule: </strong>
                      {schedule[sched].schedule}
                    </p>
                    <p className="card-text"> <strong>Size:</strong>  {schedule[sched].size}</p>
                    <p className="card-footer card-text">
                      <strong>Teacher: </strong>
                      {schedule[sched].teacher}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/" className="btn btn btn-dark mt-10">
        <BiArrowBack />
        back
      </Link>
    </>
  );
};

export default VenueSinglePage;
