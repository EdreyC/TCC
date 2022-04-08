import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { BsPlus } from "react-icons/bs"
import { FiSettings } from "react-icons/fi";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

import Button from './../components/Button/index';
import FadeMenu from './../components/menu/index';
import LongMenu from "./../components/menu/index";
import Task from "../components/task";
import { AiOutlinePlus } from "react-icons/ai";
import CardKanban from "../components/CardKanban";

export default function Board() {

    const { user } = useAuth()

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={[{nome: "Tarefa1", priority: 2}, {nome: "Tarefa2", priority: 3}]}/>
                <CardKanban title="Doing" tasks={[{nome: "Tarefa1", priority: 2}, {nome: "Tarefa2", priority: 2}]}/>
                <CardKanban title="Review" tasks={[{nome: "Tarefa1", priority: 2}, {nome: "Tarefa2", priority: 2}]}/>
                <CardKanban title="Done" tasks={[{nome: "Tarefa1", priority: 2}, {nome: "Tarefa2", priority: 2}]}/>
            </div>
        </div>
    )
}


