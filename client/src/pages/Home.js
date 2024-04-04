import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
// import { Button, Flex, Drawer, Radio, Space, Form } from "antd";
import FilterForm from "../components/FilterForm";
import homeimg from "../images/home-1.jpg";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  useEffect(() => {
    applyFilter(); // Apply filter when selectedFuelType or filterDate changes
  }, [selectedFuelType, filterDate]);

  function applyFilter() {
    let filteredCars = cars.filter(car => {
      // Filter by selected fuel type if available
      if (selectedFuelType && car.fuelType !== selectedFuelType) {
        return false;
      }

      // Filter by selected date range if available
      if (filterDate.length === 2) {
        const selectedFrom = moment(filterDate[0]);
        const selectedTo = moment(filterDate[1]);

        for (const booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            // Car is booked during selected date range, exclude it
            return false;
          }
        }
      }

      // Car passes all filters
      return true;
    });

    setTotalcars(filteredCars);
  }

  return (
    <div>
      <DefaultLayout>
      <div className="Bgimg">
          
        </div>
        <div className="text"><i>Be the medium to others destination.</i></div>
        <div className="hpage d-flex" >
          <div className="range">
            <RangePicker
              className="datepic"
              showTime={{ format: "HH:mm" }}
              format="MMM DD yyyy HH:mm"
              onChange={(dates) => setFilterDate(dates)}
            />
            </div>
            <div className="filterm">
              <FilterForm onSubmit={setSelectedFuelType} />
            </div>
          

        </div>

      

        {loading === true && <Spinner />}

        <Row justify="center" gutter={20}>
          {totalCars.map((car) => (
            <Col lg={5} sm={24} xs={24} key={car._id}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="pl-2">
                    <p className="carname size text-left">{car.name}</p>
                    <p className="text-left"><b>
                      Rent : {car.rentPerHour} /hr
                    </b></p>
                  </div>
                  <div>
                    <button className="btn btn-lg btn1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </DefaultLayout>
      <section className='footer'>
          <section className='footer-heading-bar'>

            <div className='aboutus'>
              <h4>About Us</h4>
            </div>
            <div className='aboutus'>
              <h4>Company</h4>
            </div>
            <div className='aboutus'>
              <h4>Careers</h4>
            </div>

          </section>
          <div className='sub-description'>
            <h5>Rent a car in Vadodara</h5>
            <section>
              <p>Imagine the freedom to explore the vibrant streets of Baroda at your own pace, without the constraints of fixed schedules. Rent a car in Vadodara and enjoy the flexibility to choose when and where you want to go. Whether it's a business meeting, a weekend getaway, or just a leisurely drive through the city, a self-drive car ensures you get there comfortably and on time</p>
            </section>

          </div>
      </section>
    </div>
  );
}

export default Home;
