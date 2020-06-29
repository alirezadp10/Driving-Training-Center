import React from "react";
import Carousel from "react-material-ui-carousel";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../constants/app"

export default function Slider(props) {
    return (
        <Carousel indicators={false} animation={"fade"} interval={6000}>
            {props.items.map((item) => (
                <Item key={Math.random()} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <Link to={`news/${props.item.id}`} style={{color: "inherit", textDecoration: "none"}}>
            <div
                style={{
                    boxShadow: "0 0 5px darkgray",
                    height   : "445px",
                    textAlign: "right",
                }}
                className={`cursor-pointer`}
            >
                <div
                    style={{
                        width          : "100%",
                        position       : "absolute",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        bottom         : 0,
                    }}
                >
                    <Typography className={`text-white f-bold f-large mr-2 p-2`}>
                        {props.item.title}
                    </Typography>
                </div>
                <img
                    src={BASE_URL + props.item.image}
                    alt={props.item.title}
                    style={{
                        height: "100%",
                        width : "100%",
                    }}
                />
            </div>
        </Link>
    );
}
