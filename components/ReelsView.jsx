import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, MoreVertical, Music2, Volume2, VolumeX, Play } from 'lucide-react';
import { REELS_DATA, POOL_OF_USERNAMES, POOL_OF_DESCRIPTIONS } from '../data/reels';

const ReelItem = ({ reel, isActive, isMuted, toggleMute }) => {
    const videoRef = useRef(null);
    const iframeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [following, setFollowing] = useState(false);
    const [displayUser, setDisplayUser] = useState(reel.username);
    const [displayDesc, setDisplayDesc] = useState(reel.description);
    const [displayAvatar, setDisplayAvatar] = useState(`https://ui-avatars.com/api/?name=${reel.username}&background=random`);

    useEffect(() => {
        // Randomize user details if not explicitly set (for robustness)
        if (!reel.username || POOL_OF_USERNAMES.includes(reel.username)) {
            const randomUser = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
            setDisplayUser(randomUser);
            setDisplayAvatar(`https://ui-avatars.com/api/?name=${randomUser}&background=random`);
        }
        if (!reel.description || POOL_OF_DESCRIPTIONS.includes(reel.description)) {
            setDisplayDesc(POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)]);
        }
    }, [reel]);

    useEffect(() => {
        if (isActive) {
            if (reel.source === 'youtube' && iframeRef.current) {
                iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
            }
            setIsPlaying(true);
        } else {
            if (reel.source === 'youtube' && iframeRef.current) {
                iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } else if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsPlaying(false);
        }
    }, [isActive, reel.source]);

    useEffect(() => {
        if (reel.source === 'youtube' && iframeRef.current) {
            const command = isMuted ? 'mute' : 'unMute';
            iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
        }
    }, [isMuted, reel.source]);

    const handleTap = (e) => {
        // Simple double-tap logic could go here, but for now single tap toggles mute/unmute
        // or play/pause. Let's make single tap toggle mute for better UX, or play/pause?
        // Instagram: Single tap = Mute/Unmute.
        toggleMute();
    };

    const handleDoubleTap = (e) => {
        setLiked(true);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 800);
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            scrollSnapAlign: 'start',
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}
            onDoubleClick={handleDoubleTap}
            onClick={handleTap}
        >
            {/* Video Player */}
            {reel.source === 'youtube' ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // Allow clicks to pass through to the container for custom controls
                    transform: 'scale(1.35)' // Zoom in to hide YT controls slightly
                }}>
                    <iframe
                        ref={iframeRef}
                        width="100%"
                        height="100%"
                        src={`${reel.videoUrl}&controls=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&rel=0`}
                        title={reel.description}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    ></iframe>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    src={reel.videoUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                pointerEvents: 'none'
            }} />

            {/* Big Heart Animation */}
            {showHeart && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    animation: 'pop-in 0.3s ease-out'
                }}>
                    <Heart size={100} fill="white" color="white" style={{ opacity: 0.8 }} />
                </div>
            )}

            {/* Right Action Sidebar */}
            <div style={{
                position: 'absolute',
                right: '12px',
                bottom: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                zIndex: 5
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} style={{ transition: 'transform 0.1s' }} className="active-scale">
                        <Heart size={30} fill={liked ? "#ff3040" : "transparent"} color={liked ? "#ff3040" : "white"} strokeWidth={1.5} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{reel.likes}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={30} color="white" strokeWidth={1.5} style={{ transform: 'rotateY(180deg)' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{reel.comments}</span>
                </div>

                <Send size={30} color="white" strokeWidth={1.5} style={{ transform: 'rotate(-25deg)', marginTop: '-4px' }} />

                <MoreVertical size={24} color="white" />

                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '2px solid white',
                    overflow: 'hidden',
                    marginTop: '12px'
                }}>
                    <img src={displayAvatar} style={{ width: '100%', height: '100%' }} alt="Audio" />
                </div>
            </div>

            {/* Bottom Info Section */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '16px',
                width: 'calc(100% - 80px)',
                zIndex: 5
            }}>
                {/* User Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={displayAvatar} style={{ width: '100%', height: '100%' }} alt={displayUser} />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '15px' }}>{displayUser}</span>
                    <button
                        onClick={(e) => { e.stopPropagation(); setFollowing(!following); }}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.6)',
                            borderRadius: '8px',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '13px',
                            fontWeight: '600',
                            marginLeft: '4px'
                        }}
                    >
                        {following ? 'Following' : 'Follow'}
                    </button>
                </div>

                {/* Description */}
                <p style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {displayDesc}
                </p>

                {/* Audio Line */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Music2 size={13} />
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '200px' }}>
                        <span style={{ fontSize: '13px' }}>{reel.audio} • Original Audio</span>
                    </div>
                </div>
            </div>

            {/* Mute Indicator (Optional, but good for feedback) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0, // Hidden by default, could animate on tap
                pointerEvents: 'none'
            }}>
                {isMuted ? <VolumeX size={40} fill="white" /> : <Volume2 size={40} fill="white" />}
            </div>
        </div>
    );
};

const ReelsView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false); // Global mute state
    const containerRef = useRef(null);

    // Scroll Observer to detect which reel is active
    useEffect(() => {
        const container = containerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Find the index of the element
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: container,
                threshold: 0.6 // 60% visibility required to be "active"
            }
        );

        const children = container.querySelectorAll('.reel-item');
        children.forEach((child) => observer.observe(child));

        return () => {
            children.forEach((child) => observer.unobserve(child));
        };
    }, []);

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div
            ref={containerRef}
            className="scroll-hide"
            style={{
                height: '100%',
                width: '100%',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                backgroundColor: '#000',
                position: 'relative'
            }}
        >
            {/* Header Overlay (for back button or title if needed, but usually empty in Reels) */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                fontSize: '22px',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
                Reels
            </div>

            {/* Camera Icon */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10
            }}>
                {/* Could add Camera icon here */}
            </div>

            {REELS_DATA.map((reel, index) => (
                <div
                    key={reel.id}
                    className="reel-item"
                    data-index={index}
                    style={{ height: '100%', width: '100%', scrollSnapAlign: 'start' }}
                >
                    <ReelItem
                        reel={reel}
                        isActive={index === activeIndex}
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                    />
                </div>
            ))}
        </div>
    );
};

export default ReelsView;
