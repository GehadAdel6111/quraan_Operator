import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../images/person.png';
import Loader from '../Loader/Loader';
import './Readers.css';

const Readers = () => {
    const [readers, setReaders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://mp3quran.net/api/_arabic.php')
            .then(response => response.json())
            .then(data => {
                setReaders(data.reciters);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching readers:', error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredReaders = readers.filter(reciter =>
        reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="header">
                        <h1>قائمة القراء</h1>
                    </div>
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="بحث عن قارئ..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="readers">
                        {filteredReaders.map((reciter) => (
                            <Link key={reciter.id} to={`/readers/${reciter.id}`}>
                                <div className="reader">
                                    <div className="leftSide">
                                        <img src={image} alt="Reader" />
                                    </div>
                                    <div className="rightSide">
                                        <h3>{reciter.name}</h3>
                                        <p>{reciter.rewaya}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Readers;
