import React from 'react'
import { Container } from 'react-bootstrap';

export const Footer = () => {
    let today=new Date();
  return (
<footer className="bg-body-tertiary text-center text-lg-start">
  <div className="text-center p-3 bg-light">
    {today.getFullYear()} &nbsp; Hotel Booking
  </div>
</footer>
  )
}
export default Footer;