import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const POSTS = [
    {
        id: 1,
        user: 'luxury_vibe',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1493238507154-203698ad0bd1?w=800&fit=crop',
        likes: '12,450',
        caption: 'Nothing beats the night drive in the city. #vibes #citylights',
        time: '2 hours ago'
    },
    {
        id: 2,
        user: 'minimal_arch',
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop',
        likes: '8,210',
        caption: 'Structural elegance at its finest. #architecture #minimal',
        time: '5 hours ago'
    }
];

const PostFeed = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '70px' }}>
            {POSTS.map(post => (
                <div key={post.id} style={{ marginBottom: '16px' }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <img src={post.avatar} className="avatar" style={{ width: '32px', height: '32px' }} alt={post.user} />
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{post.user}</span>
                        </div>
                        <MoreHorizontal size={20} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                    </div>

                    {/* Image */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                        <img
                            src={post.image}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt="Post content"
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <Heart size={24} className="interactive" style={{ cursor: 'pointer' }} />
                                <MessageCircle size={24} className="interactive" style={{ cursor: 'pointer' }} />
                                <Send size={24} className="interactive" style={{ cursor: 'pointer' }} />
                            </div>
                            <Bookmark size={24} className="interactive" style={{ cursor: 'pointer' }} />
                        </div>

                        <span style={{ fontWeight: '600', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                            {post.likes} likes
                        </span>

                        <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                            <span style={{ fontWeight: '600', marginRight: '6px' }}>{post.user}</span>
                            {post.caption}
                        </div>

                        <span style={{
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                            marginTop: '8px',
                            display: 'block',
                            textTransform: 'uppercase'
                        }}>
                            {post.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostFeed;
