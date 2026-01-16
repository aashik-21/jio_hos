import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Music2, Loader2, Play, ThumbsDown, Volume2, VolumeX, ClipboardCheck } from 'lucide-react';

import { REELS_DATA, POOL_OF_USERNAMES, POOL_OF_DESCRIPTIONS } from '../data/reels';

const ReelItem = ({ reel, isFollowed, onToggleFollow, isLikedInitially, onToggleLike, isDislikedInitially, onToggleDislike, isMuted, onToggleMute }) => {
    const videoRef = useRef(null);
    const iframeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [lastTap, setLastTap] = useState(0);

    const handleTap = (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Double Tap detected
            setShowHeart(true);
            setLiked(true);
            setTimeout(() => setShowHeart(false), 800);
        } else {
            togglePlay();
        }
        setLastTap(now);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7 // Trigger when 70% of the video is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (videoRef.current) {
                        videoRef.current.play().catch(e => console.log("Video play prevented", e));
                    } else if (iframeRef.current && reel.source === 'youtube') {
                        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    }
                    setIsPlaying(true);
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    } else if (iframeRef.current && reel.source === 'youtube') {
                        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    }
                    setIsPlaying(false);
                }
            });
        }, options);

        const target = videoRef.current || iframeRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    const togglePlay = () => {
        if (reel.source === 'youtube') {
            if (iframeRef.current) {
                const command = isPlaying ? 'pauseVideo' : 'playVideo';
                iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
                setIsPlaying(!isPlaying);
            }
            return;
        }

        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (iframeRef.current && reel.source === 'youtube') {
            const command = isMuted ? 'mute' : 'unMute';
            iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
        }
    }, [isMuted, reel.source]);

    const handleVideoError = () => {
        console.error("Video failed to load:", reel.videoUrl);
        setHasError(true);
    };

    const [liked, setLiked] = useState(isLikedInitially);
    const [disliked, setDisliked] = useState(isDislikedInitially);
    const [showCopyNotif, setShowCopyNotif] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState('');

    const handleLike = () => {
        if (!liked && disliked) {
            setDisliked(false);
            onToggleDislike();
        }
        setLiked(!liked);
        onToggleLike();
    };

    const handleDislike = () => {
        if (!disliked && liked) {
            setLiked(false);
            onToggleLike();
        }
        setDisliked(!disliked);
        onToggleDislike();
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowCopyNotif(true);
            setTimeout(() => setShowCopyNotif(false), 2000);
        });
    };

    const handleCommentSubmit = (e) => {
        if (e.key === 'Enter' && comment.trim()) {
            setComment('');
            setShowCommentInput(false);
            alert("Comment posted: " + comment);
        }
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            backgroundColor: '#000',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden'
        }}>
            {/* Media Content (Video or YouTube Iframe) */}
            <div
                onClick={handleTap}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    cursor: 'pointer'
                }}
            >
                {reel.source === 'youtube' ? (
                    <iframe
                        ref={iframeRef}
                        src={reel.videoUrl}
                        title={reel.description}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none', // Allow clicks to pass through to the overlay div
                            transform: 'scale(1.15)' // Zoom in to hide YouTube branding better on vertical
                        }}
                    />
                ) : !hasError ? (
                    <video
                        ref={videoRef}
                        src={reel.videoUrl}
                        loop
                        muted={isMuted}
                        playsInline
                        onError={handleVideoError}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#111',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        <p style={{ marginBottom: '10px' }}>Video failed to load</p>
                        <button
                            onClick={() => { setHasError(false); }}
                            style={{
                                background: 'var(--accent-color)',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#fff',
                                padding: '8px 16px',
                                cursor: 'pointer'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>

            {/* Play/Pause Overlay Icon (shows briefly on toggle) */}
            {!isPlaying && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    color: 'rgba(255,255,255,0.7)',
                    pointerEvents: 'none'
                }}>
                    <Play size={64} fill="currentColor" />
                </div>
            )}

            {/* Double Tap Heart Animation */}
            {showHeart && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 4,
                    color: '#ff3040',
                    pointerEvents: 'none',
                    animation: 'heart-pop 0.8s ease-out forwards'
                }}>
                    <Heart size={100} fill="currentColor" />
                </div>
            )}

            {/* Overlay Gradient */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* Shorts Branding */}
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    backgroundColor: '#ff0000',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '8px solid white'
                    }} />
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {reel.source === 'youtube' ? 'YouTube Shorts' : 'Shorts'}
                </span>
            </div>

            {/* Mute Toggle */}
            <div
                onClick={onToggleMute}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 4,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </div>

            {/* Interaction Buttons (Right Sidebar) */}
            <div style={{
                position: 'absolute',
                right: 12,
                bottom: 80,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                zIndex: 2,
                color: '#fff'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Heart
                        size={30}
                        className="interactive"
                        onClick={handleLike}
                        fill={liked ? "#ff3040" : "none"}
                        color={liked ? "#ff3040" : "#fff"}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{liked ? 'Liked' : reel.likes}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <ThumbsDown
                        size={30}
                        className="interactive"
                        onClick={handleDislike}
                        fill={disliked ? "#fff" : "none"}
                        color={disliked ? "var(--accent-color)" : "#fff"}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{disliked ? 'Disliked' : 'Dislike'}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <MessageCircle
                        size={30}
                        className="interactive"
                        onClick={() => setShowCommentInput(!showCommentInput)}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>{reel.comments}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {showCopyNotif ? (
                        <ClipboardCheck size={28} color="#4ade80" />
                    ) : (
                        <Send size={28} className="interactive" onClick={handleShare} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                    )}
                    <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 'bold' }}>Share</p>
                </div>
                <MoreHorizontal size={28} className="interactive" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </div>

            {/* Comment Input Overlay */}
            {showCommentInput && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleCommentSubmit}
                        style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            color: '#fff',
                            padding: '8px 16px',
                            outline: 'none'
                        }}
                    />
                </div>
            )}

            {/* Reel Info (Bottom Left) */}
            <div style={{
                padding: '16px',
                zIndex: 2,
                color: '#fff',
                marginBottom: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--story-gradient)',
                        padding: '2px'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: '#222',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {reel.username[0].toUpperCase()}
                        </div>
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{reel.username}</span>
                    <button
                        onClick={() => onToggleFollow(reel.username)}
                        style={{
                            background: isFollowed ? 'rgba(255,255,255,0.2)' : 'transparent',
                            border: '1px solid #fff',
                            borderRadius: '6px',
                            color: '#fff',
                            padding: '4px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                </div>

                <p style={{
                    margin: '0 0 12px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    maxHeight: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {reel.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Music2 size={14} />
                    <div className="scroll-text" style={{ fontSize: '12px', fontWeight: '500' }}>
                        {reel.audio}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [seenVideoUrls, setSeenVideoUrls] = useState(new Set());
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [likedUrls, setLikedUrls] = useState(new Set());
    const [dislikedUrls, setDislikedUrls] = useState(new Set());
    const [isMuted, setIsMuted] = useState(true);
    const scrollContainerRef = useRef(null);

    // Initial Load from LocalStorage and Setup Initial Reels
    useEffect(() => {
        const savedFollows = localStorage.getItem('followedUsers');
        if (savedFollows) setFollowedUsers(new Set(JSON.parse(savedFollows)));

        const savedLikes = localStorage.getItem('likedUrls');
        if (savedLikes) setLikedUrls(new Set(JSON.parse(savedLikes)));

        const savedDislikes = localStorage.getItem('dislikedUrls');
        if (savedDislikes) setDislikedUrls(new Set(JSON.parse(savedDislikes)));

        const savedMute = localStorage.getItem('isMuted');
        if (savedMute !== null) setIsMuted(JSON.parse(savedMute));

        const savedSeen = localStorage.getItem('seenVideoUrls');
        const seenSet = savedSeen ? new Set(JSON.parse(savedSeen)) : new Set();
        setSeenVideoUrls(seenSet);

        // Find videos we haven't seen yet
        let availableVideos = REELS_DATA.filter(r => !seenSet.has(r.videoUrl));

        // If we've seen everything, we switch to "Synthetic Mode" immediately
        const isSyntheticStart = availableVideos.length === 0;
        const sourcePool = isSyntheticStart ? REELS_DATA : availableVideos;

        // Load first 5 reels to start with
        const initialBatch = [...sourcePool].sort(() => Math.random() - 0.5).slice(0, 5).map(r => {
            const randomUsername = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
            const randomDescription = POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)];

            return {
                ...r,
                id: `reel-${Date.now()}-${Math.random()}`,
                // If in synthetic mode (all unique videos seen), randomize even the first batch
                ...(isSyntheticStart ? {
                    username: randomUsername,
                    description: randomDescription,
                    likes: (Math.floor(Math.random() * 500) + 10) + 'K',
                    comments: Math.floor(Math.random() * 2000) + 50,
                    audio: `Original Audio - ${randomUsername}`
                } : {})
            };
        });

        setReels(initialBatch);

        // Add those to seen if not in synthetic mode
        if (!isSyntheticStart) {
            initialBatch.forEach(r => seenSet.add(r.videoUrl));
            setSeenVideoUrls(new Set(seenSet));
        }
    }, []);

    // Sync Follows
    useEffect(() => {
        localStorage.setItem('followedUsers', JSON.stringify(Array.from(followedUsers)));
    }, [followedUsers]);

    // Sync Likes
    useEffect(() => {
        localStorage.setItem('likedUrls', JSON.stringify(Array.from(likedUrls)));
    }, [likedUrls]);

    // Sync Dislikes
    useEffect(() => {
        localStorage.setItem('dislikedUrls', JSON.stringify(Array.from(dislikedUrls)));
    }, [dislikedUrls]);

    // Sync Seen List
    useEffect(() => {
        localStorage.setItem('seenVideoUrls', JSON.stringify(Array.from(seenVideoUrls)));
    }, [seenVideoUrls]);

    // Sync Mute
    useEffect(() => {
        localStorage.setItem('isMuted', JSON.stringify(isMuted));
    }, [isMuted]);

    const toggleFollow = (username) => {
        setFollowedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(username)) newSet.delete(username);
            else newSet.add(username);
            return newSet;
        });
    };

    const toggleLike = (videoUrl) => {
        setLikedUrls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(videoUrl)) newSet.delete(videoUrl);
            else {
                newSet.add(videoUrl);
                // If liked, remove from dislikes
                setDislikedUrls(curr => {
                    const dSet = new Set(curr);
                    dSet.delete(videoUrl);
                    return dSet;
                });
            }
            return newSet;
        });
    };

    const toggleDislike = (videoUrl) => {
        setDislikedUrls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(videoUrl)) newSet.delete(videoUrl);
            else {
                newSet.add(videoUrl);
                // If disliked, remove from likes
                setLikedUrls(curr => {
                    const lSet = new Set(curr);
                    lSet.delete(videoUrl);
                    return lSet;
                });
            }
            return newSet;
        });
    };

    const toggleGlobalMute = () => {
        setIsMuted(!isMuted);
    };

    const loadMoreReels = () => {
        if (isLoading) return;

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Get videos not yet seen in context of unique initial pool
            let availableVideos = REELS_DATA.filter(r => !seenVideoUrls.has(r.videoUrl));

            // If we've seen all unique videos, we transition to "Unlimited Synthetic" mode
            // where we reuse videos but combine them with fresh random metadata
            let isSyntheticMode = false;
            if (availableVideos.length === 0) {
                availableVideos = REELS_DATA;
                isSyntheticMode = true;
            }

            // Shuffle available videos
            availableVideos = [...availableVideos].sort(() => Math.random() - 0.5);

            const nextBatch = availableVideos.slice(0, 5).map((randomReelTemplate) => {
                // If not in synthetic mode, track as seen
                if (!isSyntheticMode) {
                    setSeenVideoUrls(prev => {
                        const next = new Set(prev);
                        next.add(randomReelTemplate.videoUrl);
                        return next;
                    });
                }

                const randomUsername = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
                const randomDescription = POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)];

                // Generate a unique ID to prevent React key issues even if video URL is reused
                return {
                    ...randomReelTemplate,
                    id: `reel-${Date.now()}-${Math.random()}`,
                    username: randomUsername,
                    description: randomDescription,
                    likes: (Math.floor(Math.random() * 500) + 10) + 'K',
                    comments: Math.floor(Math.random() * 2000) + 50,
                    audio: `Original Audio - ${randomUsername}`
                };
            });

            setReels(prev => [...prev, ...nextBatch]);
            setIsLoading(false);
        }, 800);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // Trigger proactively when user is within 1.5 screen lengths of the bottom
        // This ensures "fetching" happens before they even see it
        if (scrollHeight - scrollTop <= clientHeight * 2.5) {
            loadMoreReels();
        }
    };

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scroll-hide"
            style={{
                height: 'calc(100vh - 120px)', // Adjusting for header and footer
                width: '100%',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                backgroundColor: '#000',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            {reels.map(reel => (
                <ReelItem
                    key={reel.id}
                    reel={reel}
                    isFollowed={followedUsers.has(reel.username)}
                    onToggleFollow={toggleFollow}
                    isLikedInitially={likedUrls.has(reel.videoUrl)}
                    onToggleLike={() => toggleLike(reel.videoUrl)}
                    isDislikedInitially={dislikedUrls.has(reel.videoUrl)}
                    onToggleDislike={() => toggleDislike(reel.videoUrl)}
                    isMuted={isMuted}
                    onToggleMute={toggleGlobalMute}
                />
            ))}

            {isLoading && (
                <div style={{
                    height: '100px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    scrollSnapAlign: 'end'
                }}>
                    <Loader2 size={24} className="animate-spin" />
                </div>
            )}

            <style>{`
                .scroll-hide::-webkit-scrollbar {
                    display: none;
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes heart-pop {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Reels;
