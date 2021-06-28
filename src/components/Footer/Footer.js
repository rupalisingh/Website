import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Footer.css";
import axios from "../../axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";

// Alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Use Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// Footer App starts here
function Footer() {
  const classes = useStyles();

  // Alert Messages
  var messages = {
    Success: "Successfully Subscribed!",
    Info: "You Are Already Subscribed!",
    Warning: "Something Went Wrong Please Try Again!",
    Error: "Incorrect Email!",
  };

  // All states
  const [Email, changeEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState(messages.Success);

  // Handeling subscription
  const handelSubscription = () => {
    // console.log(Email);
    if (Email !== null) {
      if ((Email.length > 5) & Email.includes("@") & Email.includes(".")) {
        axios
          .post("/newsletterSubscribe", {
            email: Email,
          })
          .then(function (response) {
            if (response.data.msg === "Added subscription") {
              setOpen(true);
              setSeverity("success");
              setAlert(messages.Success);
            } else {
              setOpen(true);
              setSeverity("warning");
              setAlert(messages.Warning);
            }
          })
          .catch(function (error) {
            //   Bad Request or Already subscribed
            if (error.response) {
              if (error.response.data.error === "Already subscribed") {
                setOpen(true);
                setSeverity("info");
                setAlert(messages.Info);
              }
            } else {
              setOpen(true);
              setSeverity("warning");
              setAlert(messages.Warning);
            }
          });
      } else {
        // Invalid Email
        setOpen(true);
        setSeverity("error");
        setAlert(messages.Error);
      }
    } else {
      // Invalid Email
      setOpen(true);
      setSeverity("error");
      setAlert(messages.Error);
    }
  };

  // Handeling snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">Join Our Newsletter</p>
        <p className="footer-subscription-text">
          Signup to be the first to hear about exclusive deals, special offers
          and upcoming collections
        </p>
        <div className="input-areas">
          <form action="">
            <input
              className="footer-subscription-input"
              type="email"
              name="email"
              placeholder="Enter email for weekly newsletter"
              onChange={(e) => changeEmail(e.target.value)}
            />
            <input
              type="button"
              className="footer-subscription-button"
              onClick={handelSubscription}
              value="Subscribe"
            />

            {/* !!! do not change !!! */}
            {/*  snackbar starts*/}
            <div className={classes.root}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={severity}>
                  {alert}
                </Alert>
              </Snackbar>
            </div>
            {/* snackbar ends */}
            {/* !!! do not change !!! */}
          </form>
        </div>
      </section>
      <div className="footer-container2">
        <section className="social-media">
          <div className="social-media-wrap">
            <div className="footer-logo">
              <Link to="/" className="social-logo">
                <img src="./images/logo[800x150].png" alt="" />
              </Link>
            </div>
            <div className="footer-address">
              <p className="footer-address-para">
                IIIT Lucknow, Ahmamau 226002 UP, India
              </p>
            </div>
            <div className="footer-contact">
              <Link to="/">bookshlf@outlook.com</Link>
              <br />
              <Link to="/">+91 97926 66122</Link>
            </div>
            {/* <small className="website-rights">MyYoutube &copy; 2021</small> */}
            <div className="social-icons">
              <Link
                className="social-icon-link facebook"
                to="/"
                target="_blank"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                className="social-icon-link instagram"
                to="/"
                target="_blank"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                className="social-icon-link twitter"
                to="/"
                target="_blank"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                className="social-icon-link linkedin"
                to="/"
                target="_blank"
                aria-label="Linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link
                className="social-icon-link youtube"
                to="/"
                target="_blank"
                aria-label="Youtube"
              >
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
        </section>
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h4>Explore</h4>
              <Link to="/About">About Us</Link>
              <Link to="/">Sitemap</Link>
              <Link to="/">Sign in</Link>
              <Link to="/">Join Us</Link>
            </div>
            <div className="footer-link-items">
              <h4>Customer Service</h4>
              <Link to="/">Returns</Link>
              <Link to="/">Report Product</Link>
              <Link to="/">Accessibility</Link>
              <Link to="/Contact">Contact Us</Link>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h4>Policy</h4>
              <Link to="/">Return Policy</Link>
              <Link to="/">Terms Of Use</Link>
              <Link to="/">Security</Link>
              <Link to="/">Privacy</Link>
            </div>
            <div className="footer-link-items">
              <h4>Categories</h4>
              <Link to="/">JEE Mains</Link>
              <Link to="/">NEET PG</Link>
              <Link to="/">JEE Advanced</Link>
              <Link to="/">High School</Link>
              <Link to="/">Programming</Link>
              <Link to="/">Novels</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container3">
        &copy; 2021 BookShlf. All Rights Reserved
      </div>
    </div>
  );
}
export default Footer;
