import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import quranImage from '../images/quran.png';
import Loader from '../Loader/Loader';
import './Surah.css';

const Surah = () => {
    const { readerId, surahId } = useParams();
    const [surah, setSurah] = useState({ name_arabic: '' });
    const [readerName, setReaderName] = useState('');
    const [audioSource, setAudioSource] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.quran.com/api/v4/chapters/${surahId}`)
            .then(response => response.json())
            .then(data => {
                setSurah(data.chapter);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching surah details:', error);
                setLoading(false);
            });

        fetch('https://mp3quran.net/api/_arabic.php')
            .then(response => response.json())
            .then(data => {
                const reader = data.reciters.find(reciter => reciter.id === readerId);
                if (reader) {
                    setReaderName(reader.name);
                    const surahFile = `${reader.Server}/${String(surahId).padStart(3, '0')}.mp3`;
                    setAudioSource(surahFile);
                    console.log('Audio Source URL:', surahFile);
                }
            })
            .catch(error => console.error('Error fetching reader details:', error));
    }, [readerId, surahId]);

    return (
        <div className="container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="header">
                        <h1>القارئ: {readerName}</h1>
                    </div>
                    <div className="surahInfo">
                        <div className="surahImage">
                            <img src= {quranImage} alt="image" />
                        </div>
                        <h2>سورة {surah.name_arabic}</h2>
                        <ReactPlayer url={audioSource} controls />
                    </div>
                </>
            )}
        </div>
    );
};

export default Surah;
