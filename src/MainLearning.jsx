import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, Mic, Book, Radio, ArrowLeft } from 'lucide-react';
import ListeningPractice from './mainLearning/ListeningPractice';
import ReadingPractice from './mainLearning/ReadingPractice';
import SpeakingPractice from './mainLearning/SpeakingPractice';
import VocabPractice from './mainLearning/VocabPractice';
import PodcastMenu from './mainLearning/PodcastMenu';
import Timer from './mainLearning/Timer';
import PodcastDownload from './mainLearning/PodcastDownload';

import './css/MainLearning.css';

const Sidebar = ({ isEnabled }) => {
    const location = useLocation();
    
    // Normalize path to ignore trailing slash or parent path if needed
    // location.pathname will be /MainLearning/listening etc.
    
    const menuItems = [
        { path: 'listening', label: 'Listening', icon: Headphones },
        { path: 'reading', label: 'Reading', icon: BookOpen },
        { path: 'speaking', label: 'Speaking', icon: Mic },
        { path: 'vocab', label: 'Vocabulary', icon: Book },
        { path: 'podcast', label: 'Podcast', icon: Radio },
    ];

    return (
        <div className="main-learning-sidebar">
            <Link to="/profile" state={{ view: 'lessons' }} className="sidebar-back">
                <ArrowLeft size={20} />
                <span>Back to Lessons</span>
            </Link>
            <div className="sidebar-menu">
                {menuItems.map(item => {
                    const isActive = location.pathname.includes(item.path);
                    const Icon = item.icon;
                    return (
                        <Link 
                            key={item.path} 
                            to={isEnabled ? `/MainLearning/${item.path}` : '#'} 
                            className={`sidebar-item ${isActive ? 'active' : ''} ${!isEnabled ? 'disabled' : ''}`}
                            onClick={(e) => !isEnabled && e.preventDefault()}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default function MainLearning() {
    const location = useLocation();
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');

    const handleStart = (newTopic) => {
        setTopic(newTopic);
        navigate('listening');
    };

    // Determine initial time based on current route
    const getInitialTime = () => {
        const path = location.pathname.split('/').pop().toLowerCase();
        switch(path) {
            case 'listening': return 1; // Pomodoro style
            case 'reading': return 15;
            case 'speaking': return 20;
            case 'vocab': return 10;
            case 'podcast': return 45;
            default: return 30;
        }
    };

    // Don't show timer on the initial menu page
    const showTimer = location.pathname !== '/MainLearning' && location.pathname !== '/MainLearning/';

    return (
        <div className="main-learning-layout">
            <Sidebar isEnabled={!!topic} />
            <div className="main-learning-content">
                {/* Timer component with key to force reset on route change */}
                {showTimer && <Timer key={location.pathname} initialMinutes={getInitialTime()} />}
                
                <Routes>
                    <Route index element={<PodcastMenu onStart={handleStart} />} />
                    <Route path="listening" element={topic ? <ListeningPractice topic={topic} /> : <Navigate to="/MainLearning" replace />} />
                    <Route path="reading" element={topic ? <ReadingPractice topic={topic} /> : <Navigate to="/MainLearning" replace />} />
                    <Route path="speaking" element={topic ? <SpeakingPractice topic={topic} /> : <Navigate to="/MainLearning" replace />} />
                    <Route path="vocab" element={topic ? <VocabPractice topic={topic} /> : <Navigate to="/MainLearning" replace />} />
                    <Route path="podcast" element={topic ? <PodcastDownload topic={topic} /> : <Navigate to="/MainLearning" replace />} />
                </Routes>
            </div>
        </div>
    );
}
