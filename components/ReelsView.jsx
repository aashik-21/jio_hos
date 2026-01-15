import React from 'react';
import { Heart, MessageCircle, Send, Music2, MoreVertical } from 'lucide-react';

const REELS = [
    {
        id: 1,
        user: 'adventure_seeker',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        videoThumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop',
        likes: '1.2M',
        comments: '12K',
        audio: 'Original Audio - adventure_seeker',
        description: 'The mountains are calling... 🏔️✨ #nature #adventure'
    },
    {
        id: 2,
        user: 'tech_wizard',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
        videoThumb: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&fit=crop',
        likes: '450K',
        comments: '5K',
        audio: 'Coding Beats Vol. 1',
        description: 'Morning setup! Ready to build something epic. 💻🔥 #coding #setup'
    }
];

const ReelsView = () => {
    return (
        <div className="scroll-hide" style={{
            height: '100%',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            backgroundColor: '#000'
        }}>
            {REELS.map(reel => (
                <div key={reel.id} style={{
                    height: '100%',
                    position: 'relative',
                    scrollSnapAlign: 'start',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px'
                }}>
                    {/* Background Mock Video */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0
                    }}>
                        <img
                            src={reel.videoThumb}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            alt="Reel content"
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                        }} />
                    </div>

                    {/* Right Side Actions */}
                    <div style={{
                        position: 'absolute',
                        right: '12px',
                        bottom: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        alignItems: 'center',
                        zIndex: 2
                    }}>
                        <div className="interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <Heart size={32} color="white" fill="white" />
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{reel.likes}</span>
                        </div>
                        <div className="interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <MessageCircle size={32} color="white" fill="white" />
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{reel.comments}</span>
                        </div>
                        <Send size={28} color="white" className="interactive" />
                        <MoreVertical size={24} color="white" className="interactive" />
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '4px',
                            border: '2px solid #fff',
                            overflow: 'hidden',
                            marginTop: '10px'
                        }}>
                            <img src={reel.avatar} style={{ width: '100%', height: '100%' }} alt="Audio icon" />
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div style={{ position: 'relative', zIndex: 2, marginBottom: '50px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <img src={reel.avatar} className="avatar" style={{ width: '36px', height: '36px', border: '2px solid #fff' }} alt={reel.user} />
                            <span style={{ fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{reel.user}</span>
                            <button style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #fff',
                                color: '#fff',
                                padding: '4px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>Follow</button>
                        </div>
                        <p style={{ margin: '0 0 12px 0', fontSize: '14px', maxWidth: '80%', lineHeight: '1.4' }}>
                            {reel.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Music2 size={14} />
                            <span style={{ fontSize: '13px' }}>{reel.audio}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReelsView;
