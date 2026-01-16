import React, { useState } from 'react';
import { Menu, PlusSquare, Grid, Play, LayoutGrid, UserCheck, ChevronDown, Lock } from 'lucide-react';
import { POSTS } from '../data/posts';

const ProfileView = () => {
    const [activeTab, setActiveTab] = useState('grid');

    // Using simple mocked data for the profile itself
    const USER_PROFILE = {
        username: 'i_md_aashik',
        fullName: 'Mohammed Aashik',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        posts: 54,
        followers: '14.2K',
        following: '1,240',
        bio: 'Creating moments 📸\nTech Enthusiast 💻\n📍 Kerala, India\nbit.ly/portfolio',
        link: 'bit.ly/portfolio'
    };

    const HIGHLIGHTS = [
        { id: 1, name: 'Travel', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=100&h=100&fit=crop' },
        { id: 2, name: 'Tech', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop' },
        { id: 3, name: 'Friends', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop' },
        { id: 4, name: 'Food', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop' },
        { id: 5, name: 'Music', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-primary)',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={16} />
                    <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{USER_PROFILE.username}</h1>
                    <ChevronDown size={16} />
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <PlusSquare size={26} className="interactive" style={{ cursor: 'pointer' }} />
                    <Menu size={26} className="interactive" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto' }}>
                {/* Profile Stats Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    marginBottom: '12px'
                }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative' }}>
                        <div className="story-ring" style={{ width: '88px', height: '88px', padding: '2px' }}>
                            <img
                                src={USER_PROFILE.avatar}
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--bg-primary)' }}
                                alt={USER_PROFILE.username}
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            backgroundColor: 'var(--blue-link)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid var(--bg-primary)',
                            fontSize: '16px'
                        }}>
                            +
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', marginLeft: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '18px' }}>{USER_PROFILE.posts}</span>
                            <span style={{ fontSize: '13px' }}>Posts</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '18px' }}>{USER_PROFILE.followers}</span>
                            <span style={{ fontSize: '13px' }}>Followers</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '18px' }}>{USER_PROFILE.following}</span>
                            <span style={{ fontSize: '13px' }}>Following</span>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ fontWeight: '700', marginBottom: '2px' }}>{USER_PROFILE.fullName}</div>
                    <div style={{ fontSize: '14px', whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                        {USER_PROFILE.bio}
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ padding: '0 16px', display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <button style={{
                        flex: 1,
                        backgroundColor: '#EFEFEF', // Light grey usually
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: 'black'
                    }}>
                        Edit profile
                    </button>
                    <button style={{
                        flex: 1,
                        backgroundColor: '#EFEFEF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: 'black'
                    }}>
                        Share profile
                    </button>
                    <button style={{
                        backgroundColor: '#EFEFEF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black'
                    }}>
                        <UserCheck size={18} />
                    </button>
                </div>

                {/* Highlights */}
                <div className="scroll-hide" style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '0 16px',
                    marginBottom: '20px',
                    overflowX: 'auto'
                }}>
                    {HIGHLIGHTS.map(highlight => (
                        <div key={highlight.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '64px' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                padding: '2px',
                                border: '1px solid #dbdbdb', // Grey ring for highlights
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    backgroundColor: '#eee'
                                }}>
                                    <img src={highlight.img} alt={highlight.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                            <span style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70px' }}>
                                {highlight.name}
                            </span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '64px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: '1px solid #dbdbdb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PlusSquare size={24} color="var(--text-primary)" />
                        </div>
                        <span style={{ fontSize: '12px' }}>New</span>
                    </div>
                </div>

                {/* Grid Tabs */}
                <div style={{
                    display: 'flex',
                    borderTop: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)' // Optional
                }}>
                    <div
                        onClick={() => setActiveTab('grid')}
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px 0',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'grid' ? '1px solid var(--text-primary)' : 'none',
                            color: activeTab === 'grid' ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <Grid size={24} />
                    </div>
                    <div
                        onClick={() => setActiveTab('reels')}
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px 0',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'reels' ? '1px solid var(--text-primary)' : 'none',
                            color: activeTab === 'reels' ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <Play size={24} style={{ transform: 'scale(0.8)' }} />
                        {/* Play icon mimicking Reels tab */}
                    </div>
                    <div
                        onClick={() => setActiveTab('tagged')}
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px 0',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'tagged' ? '1px solid var(--text-primary)' : 'none',
                            color: activeTab === 'tagged' ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <UserCheck size={24} />
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1px',
                    paddingBottom: '20px'
                }}>
                    {POSTS.map((post) => (
                        <div key={post.id} style={{ aspectRatio: '1/1', backgroundColor: '#333', position: 'relative' }}>
                            <img src={post.image} alt="post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                    {/* Duplicate posts to fill grid for demo */}
                    {POSTS.map((post) => (
                        <div key={`dup-${post.id}`} style={{ aspectRatio: '1/1', backgroundColor: '#333', position: 'relative' }}>
                            <img src={post.image} alt="post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProfileView;
