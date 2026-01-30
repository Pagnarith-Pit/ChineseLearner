import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, Mic, Book, Radio, ArrowLeft } from 'lucide-react';
import ListeningPractice from './mainLearning/ListeningPractice';
import ReadingPractice from './mainLearning/ReadingPractice';
import SpeakingPractice from './mainLearning/SpeakingPractice';
import VocabPractice from './mainLearning/VocabPractice';
import PodcastMenu from './mainLearning/PodcastMenu';
import Timer from './mainLearning/Timer';
import PodcastDownload from './mainLearning/PodcastDownload';
import { MainLearningProvider } from './context/MainLearningContext';

import './css/MainLearning.css';

const Sidebar = ({ isEnabled }) => {
    const location = useLocation();
    
    // Normalize path to ignore trailing slash or parent path if needed
    // location.pathname will be /MainLearning/listening etc.
    
    const menuItems = [
        { path: 'listening', label: 'Listening', icon: Headphones },
        { path: 'reading', label: 'Reading', icon: BookOpen },
        { path: 'vocab', label: 'Vocabulary', icon: Book },
        { path: 'speaking', label: 'Speaking', icon: Mic },
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

// handle the arguments passed in here, including HSK level and lesson number
export default function MainLearning() {
    const location = useLocation();
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');

    // Cache lesson context passed from LessonPage so it persists across nested navigations
    const [lessonContext, setLessonContext] = useState({
        level: null,
        lessonNumber: null,
    });

    useEffect(() => {
        // Only update if state is actually provided (prevents wiping it on internal route changes)
        const incomingLevel = location.state?.level;
        const incomingLessonNumber = location.state?.lessonNumber;

        if (incomingLevel != null && incomingLessonNumber != null) {
            setLessonContext({ level: incomingLevel, lessonNumber: incomingLessonNumber });
        }
    }, [location.state]);

    const handleStart = (newTopic) => {
        setTopic(newTopic);
        navigate('listening');
    };

    // Determine initial time based on current route
    const getInitialTime = () => {
        const path = location.pathname.split('/').pop().toLowerCase();
        switch(path) {
            case 'listening': return 5; // Pomodoro style
            case 'reading': return 5;
            case 'speaking': return 20;
            case 'vocab': return 30;
            case 'podcast': return 10;
            default: return 10;
        }
    };

    // Don't show timer on the initial menu page
    const showTimer = location.pathname !== '/MainLearning' && location.pathname !== '/MainLearning/';

    const { level, lessonNumber } = lessonContext;

    return (
        <MainLearningProvider level={level} lessonNumber={lessonNumber}>
            <div className="main-learning-layout">
                <Sidebar isEnabled={!!topic} />
                <div className="main-learning-content">
                    {showTimer && <Timer key={location.pathname} initialMinutes={getInitialTime()} />}

                    <Routes>
                        <Route
                            index
                            element={
                                <PodcastMenu
                                    onStart={handleStart}
                                    level={level}
                                    lessonNumber={lessonNumber}
                                />
                            }
                        />

                        <Route
                            path="listening"
                            element={
                                topic
                                    ? <ListeningPractice level={level} lessonNumber={lessonNumber} />
                                    : <Navigate to="/MainLearning" replace />
                            }
                        />
                        <Route
                            path="reading"
                            element={
                                topic
                                    ? <ReadingPractice level={level} lessonNumber={lessonNumber} />
                                    : <Navigate to="/MainLearning" replace />
                            }
                        />
                        <Route
                            path="vocab"
                            element={
                                topic
                                    ? <VocabPractice level={level} lessonNumber={lessonNumber} />
                                    : <Navigate to="/MainLearning" replace />
                            }
                        />
                        <Route
                            path="speaking"
                            element={
                                topic
                                    ? <SpeakingPractice level={level} lessonNumber={lessonNumber} />
                                    : <Navigate to="/MainLearning" replace />
                            }
                        />
                        <Route
                            path="podcast"
                            element={
                                topic
                                    ? <PodcastDownload topic={topic} level={level} lessonNumber={lessonNumber} />
                                    : <Navigate to="/MainLearning" replace />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </MainLearningProvider>
    );
}
