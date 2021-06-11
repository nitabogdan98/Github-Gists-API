import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


const Gist = ({ gist }) => {
    const [fork1, setFork1] = useState([]);
    const [fork2, setFork2] = useState([]);
    const [fork3, setFork3] = useState([]);
    let index = 0;

    const files = [
        {
            "filename": "Gist",
            "type": "none",
            "language": "no",
            "size": 0
        }
    ];

    const fetchData = () => {
        const url = gist.forks_url;
        axios.get(url)
            .then(res => {
                if (res.data[0])
                    setFork1(res.data[0].owner.login);
                if (res.data[1])
                    setFork2(res.data[1].owner.login);
                if (res.data[2])
                    setFork3(res.data[2].owner.login);
            })
    }

    useEffect(() => {
        fetchData();
    })

    for (let x in gist.files) {
        files[index] = gist.files[x];
        index++;
    }

    return (
        <tr>
            <td>{files.map(file =>
                <td> <a href={file.raw_url} target="_blank" rel="noopener noreferrer">{file.filename.split(".")[0]}</a> <span className="badge">{file.language}</span></td>
            )}</td>
            <td>{fork1} </td>
            <td>{fork2} </td>
            <td>{fork3} </td>
        </tr>
    )
}

export default Gist;