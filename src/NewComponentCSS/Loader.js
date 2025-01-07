import classes from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={classes.center_loader}>
            <span className={classes.loader}></span>
        </div>
    )
}