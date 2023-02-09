import React, { useEffect, useState } from "react";
import './login.css';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, LoginUser, reset } from "./auth";


export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(getMe());
        dispatch(reset());
    }, [], [user, isSuccess, dispatch, navigate]);

    useEffect(() => {
        // console.log(isSuccess)
        if(user || isSuccess) {
            // console.log(isSuccess);
            navigate("/edit");
        }
    })

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({username, password}));
    }

    return(
        <div className="body">
        <div className="login-container">
            <h1>Login Admin</h1>
            {isError && <p style={{textAlign: 'center'}}>{message}</p>}
            <form onSubmit={Auth}>
                <input name="username" type='text' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                <input name="password" type='password' placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" className="submit" value={"login"}></input>
            </form>
        </div>
        
            
        </div>
    )
}