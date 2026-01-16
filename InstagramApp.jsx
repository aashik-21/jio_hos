import React, { useState } from 'react';
import { Home, Search, PlusSquare, Play, User, MessageCircle, Heart } from 'lucide-react';
import StoryBar from './components/StoryBar';
import StoryViewer from './components/StoryViewer';
import PostFeed from './components/PostFeed';
import Reels from './components/ReelsView';
import MessagesView from './components/MessagesView';
import ProfileView from './components/ProfileView';
import SearchPage from './components/Search';
import { STORIES } from './data/stories';

const InstagramApp = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [viewingStoryIndex, setViewingStoryIndex] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <div className="glass" style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: '700',
                    letterSpacing: '-1px',
                    fontStyle: 'italic',
                    background: 'var(--story-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Instagram
                </h1>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Heart size={24} className="interactive" style={{ cursor: 'pointer' }} />
                    <MessageCircle
                        size={24}
                        className="interactive"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveTab('messages')}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'home' && (
                    <>
                        <StoryBar onStoryClick={setViewingStoryIndex} />
                        <PostFeed />
                    </>
                )}
                {activeTab === 'search' && <SearchPage />}
                {activeTab === 'messages' && <MessagesView onBack={() => setActiveTab('home')} />}
                {activeTab === 'explore' && <SearchPage />}
                {activeTab === 'reels' && <Reels />}
                {activeTab === 'profile' && <ProfileView />}
                {activeTab === 'create' && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                        <p>Create page coming soon!</p>
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className="glass" style={{
                position: 'sticky',
                bottom: 0,
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-color)'
            }}>
                <Home
                    size={26}
                    onClick={() => setActiveTab('home')}
                    className="interactive"
                    style={{ cursor: 'pointer', color: activeTab === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                />
                <Search
                    size={26}
                    onClick={() => setActiveTab('explore')}
                    className="interactive"
                    style={{ cursor: 'pointer', color: activeTab === 'explore' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                />
                <PlusSquare
                    size={26}
                    onClick={() => setActiveTab('create')}
                    className="interactive"
                    style={{ cursor: 'pointer', color: activeTab === 'create' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                />
                <Play
                    size={26}
                    onClick={() => setActiveTab('reels')}
                    className="interactive"
                    style={{ cursor: 'pointer', color: activeTab === 'reels' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                />
                <User
                    size={26}
                    onClick={() => setActiveTab('profile')}
                    className="interactive"
                    style={{ cursor: 'pointer', color: activeTab === 'profile' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                />
            </div>

            {viewingStoryIndex !== null && (
                <StoryViewer
                    stories={STORIES}
                    initialStoryIndex={viewingStoryIndex}
                    onClose={() => setViewingStoryIndex(null)}
                />
            )}
        </div>
    );
};

export default InstagramApp;
