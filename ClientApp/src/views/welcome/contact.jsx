import React from "react";
import {Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faTelegram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons";

export default function Contact(props) {
    return (
        <div>
            <div style={{
                    height         : 100,
                    backgroundColor: "white",
                    width          : "100%",
                    boxShadow      : "0 0 5px darkgray",
                    display        : "flex",
                    justifyContent : "center",
                    alignItems     : "center",
                }}>
                <Typography className={`t-center f-bold f-medium`}>با ما تماس بگیرید<br />33902534</Typography>
                <FontAwesomeIcon style={{marginLeft: "25px", fontSize: "40px"}}
                                 color="#000"
                                 icon={faPhone} />
            </div>
            <div style={{
                    marginTop      : 15,
                    height         : 100,
                    backgroundColor: "white",
                    width          : "100%",
                    boxShadow      : "0 0 5px darkgray",
                    display        : "flex",
                    justifyContent : "center",
                    alignItems     : "center",
                }}>
                <Typography className={`f-bold f-medium`}>.به کانال تلگرام ما بپیوندید</Typography>
                <FontAwesomeIcon style={{marginLeft: "15px", fontSize: "50px"}}
                                 color="#34acde"
                                 icon={faTelegram} />
            </div>
            <div style={{
                    marginTop      : 15,
                    height         : 100,
                    backgroundColor: "white",
                    width          : "100%",
                    boxShadow      : "0 0 5px darkgray",
                    display        : "flex",
                    justifyContent : "center",
                    alignItems     : "center",
                }}>
                <Typography className={`f-bold f-medium`}>.ما را در اینستاگرام دنبال کنید</Typography>
                <FontAwesomeIcon style={{marginLeft: "10px", fontSize: "50px"}}
                                 color="#c65aa4"
                                 icon={faInstagram} />
            </div>
            <div style={{
                    marginTop      : 15,
                    height         : 100,
                    backgroundColor: "white",
                    width          : "100%",
                    boxShadow      : "0 0 5px darkgray",
                    display        : "flex",
                    justifyContent : "center",
                    alignItems     : "center",
                }}>
                <Typography className={`f-bold f-medium`}>.ما را در توییتر دنبال کنید</Typography>
                <FontAwesomeIcon style={{marginLeft: "15px", fontSize: "50px"}}
                                 color="#1cb7eb"
                                 icon={faTwitter} />
            </div>
        </div>
    );
}
