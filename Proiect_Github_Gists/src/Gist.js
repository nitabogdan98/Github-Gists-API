import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";


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
            <th scope="row">
                <td>
                    {files.map(file =>
                        <p><a href={file.raw_url} target="_blank" rel="noopener noreferrer">{file.filename.split(".")[0]}</a>
                            <span className="badge">    {file.language}</span>
                        </p>
                    )}
                </td>
            </th>
            <th scope="row">
                <td>{fork1} {fork2} {fork3}</td>
            </th>

        </tr>
    )
}

export default Gist;