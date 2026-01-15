import React from 'react';

const STORIES = [
    { id: 1, name: 'Your Story', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
    { id: 2, name: 'alex_r', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
    { id: 3, name: 'sarah.j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: 4, name: 'mike_v', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { id: 5, name: 'traveler', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { id: 6, name: 'coding_ninja', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
];

const StoryBar = () => {
    return (
        <div className="scroll-hide" style={{
            display: 'flex',
            gap: '12px',
            padding: '12px 16px',
            overflowX: 'auto',
            borderBottom: '1px solid var(--border-color)'
        }}>
            {STORIES.map(story => (
                <div key={story.id} className="interactive" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                }}>
                    <div className="story-ring">
                        <div className="story-inner">
                            <img
                                src={story.avatar}
                                className="avatar"
                                style={{ width: '60px', height: '60px' }}
                                alt={story.name}
                            />
                        </div>
                    </div>
                    <span style={{
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        maxWidth: '65px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {story.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StoryBar;
