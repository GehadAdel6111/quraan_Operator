import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Surahs.css';

const Surahs = () => {
    const { readerId } = useParams();
    const [surahs, setSurahs] = useState([]);
    const [readerName, setReaderName] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://api.quran.com/api/v4/chapters')
            .then(response => response.json())
            .then(data => {
                setSurahs(data.chapters);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching surahs:', error);
                setLoading(false);
            });

        fetch('https://mp3quran.net/api/_arabic.php')
            .then(response => response.json())
            .then(data => {
                const reader = data.reciters.find(reciter => reciter.id === readerId);
                if (reader) {
                    setReaderName(reader.name);
                }
            })
            .catch(error => console.error('Error fetching reader details:', error));
    }, [readerId]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSurahs = surahs.filter(surah =>
        surah.name_arabic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="header">
                        <h1>القارئ : {readerName}</h1>
                    </div>
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="بحث عن سورة..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="surahs">
                        {filteredSurahs.map(surah => (
                            <Link key={surah.id} to={`/reader/${readerId}/surah/${surah.id}`}>
                                <div className="surah">
                                    <div className="rightSide">
                                        <h3>سورة {surah.name_arabic}</h3>
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

export default Surahs;
