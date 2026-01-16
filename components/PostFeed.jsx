import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

import { POSTS } from '../data/posts';

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
