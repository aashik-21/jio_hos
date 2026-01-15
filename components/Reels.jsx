import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Music2, Loader2, Play, ThumbsDown, Volume2, VolumeX, ClipboardCheck } from 'lucide-react';

const REELS_DATA = [
    {
        id: 1,
        username: 'traveler_pro',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '125K',
        comments: '1.2K',
        description: 'Exploring the hidden gems of the mountains! 🏔️✨ #nature #adventure',
        audio: 'Original Audio - traveler_pro'
    },
    {
        id: 2,
        username: 'chef_master',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        likes: '89K',
        comments: '950',
        description: 'The secret to the perfect chocolate lava cake! 🍫🍩 #baking #foodie',
        audio: 'Chef Master - Cooking Vibes'
    },
    {
        id: 3,
        username: 'tech_guru',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        likes: '45K',
        comments: '320',
        description: 'New setup tour! Rate this 1-10 💻🚀 #setup #productivity',
        audio: 'Lofi Beats - Tech Focus'
    },
    {
        id: 4,
        username: 'fitness_zoom',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        likes: '210K',
        comments: '2.5K',
        description: 'Morning workout routine! 💪🔥 #fitness #motivation',
        audio: 'Energize - Fitness Beats'
    },
    {
        id: 5,
        username: 'nature_lover',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        likes: '67K',
        comments: '430',
        description: 'Peaceful sunset at the beach 🌅🌊 #nature #calm',
        audio: 'Chill Vibes - Nature'
    },
    {
        id: 6,
        username: 'auto_enthusiast',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4',
        likes: '150K',
        comments: '1.8K',
        description: 'Checkout this beast! 🏎️💨 #cars #speed',
        audio: 'Engine Roar - Turbo'
    },
    {
        id: 7,
        username: 'dreamer_01',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        likes: '340K',
        comments: '4.2K',
        description: 'Enter the world of dreams... 🎨✨ #art #surreal',
        audio: 'Dreamscape - Ambient'
    },
    {
        id: 8,
        username: 'bunny_vlogs',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        likes: '1.2M',
        comments: '12K',
        description: 'The big buck is back! 🐰🌳 #cartoon #funny',
        audio: 'Forest Sounds - Happy'
    },
    {
        id: 9,
        username: 'cinema_buff',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        likes: '890K',
        comments: '9K',
        description: 'Epic cinematic shots from Sintel 🎬🐉 #cgi #movie',
        audio: 'Epic Orchestral - Movie'
    },
    {
        id: 10,
        username: 'urban_explorer',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        likes: '560K',
        comments: '6.5K',
        description: 'Cyberpunk vibes in the city 🏙️🤖 #scifi #vfx',
        audio: 'Synthwave - Night City'
    },
    {
        id: 11,
        username: 'ocean_breeze',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        likes: '120K',
        comments: '1.1K',
        description: 'Hit the road! 🏎️💨 #roadtrip #adventure',
        audio: 'Summer Hits - Road'
    },
    {
        id: 12,
        username: 'wildlife_geo',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        likes: '95K',
        comments: '800',
        description: 'Finding the best deals! 🚗💰 #cars #finance',
        audio: 'Business - Talk'
    },
    {
        id: 13,
        username: 'skater_pro',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: '2M',
        comments: '15K',
        description: 'Insane trick! 🛹🔥 #skate #pro',
        audio: 'Punk Rock - Skate'
    },
    {
        id: 14,
        username: 'zen_garden',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        likes: '45K',
        comments: '300',
        description: 'Relaxing moments 🌿🧘 #meditation #peace',
        audio: 'Calm Piano - Relax'
    },
    {
        id: 15,
        username: 'space_vibe',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        likes: '340K',
        comments: '2.4K',
        description: 'Into the cosmos... 🌌🚀 #space #universe',
        audio: 'Space Odyssey - Ambient'
    },
    {
        id: 16,
        username: 'aqua_life',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '12K',
        comments: '150',
        description: 'Deep sea secrets 🌊🐠 #ocean #diver',
        audio: 'Aqua World - Deep'
    },
    {
        id: 17,
        username: 'urban_beats',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        likes: '890K',
        comments: '11K',
        description: 'City that never sleeps 🏙️✨ #nightlife #vibes',
        audio: 'Lo-Fi Night - City'
    },
    {
        id: 18,
        username: 'pixel_ninja',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        likes: '567K',
        comments: '5K',
        description: 'Level up! 🎮🔥 #gaming #pro',
        audio: '8-Bit Hero - Gaming'
    },
    {
        id: 19,
        username: 'retro_vibe',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Routes.mp4',
        likes: '45K',
        comments: '890',
        description: 'Classic road trip memories 🗺️🚗 #vintage #travel',
        audio: 'Retro Beats - 90s'
    },
    {
        id: 20,
        username: 'auto_guru',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        likes: '120K',
        comments: '2.1K',
        description: 'GTI Review is here! 🚗🔥 #cars #review',
        audio: 'Auto Talk - Motor'
    },
    {
        id: 21,
        username: 'vlog_queen',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        likes: '900K',
        comments: '8K',
        description: 'Just having some fun today! ✨🌈 #vlog #happy',
        audio: 'Pop Hits - Summer'
    },
    {
        id: 22,
        username: 'sci_fi_geek',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        likes: '1.5M',
        comments: '20K',
        description: 'The future is here 🦾🤖 #scifi #tech',
        audio: 'Future Synth - Scifi'
    },
    {
        id: 23,
        username: 'nature_vibe',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
        likes: '34K',
        comments: '450',
        description: 'Nature and tech collide 🌿🚴 #detection #ai',
        audio: 'Electronic Pulse - Tech'
    },
    {
        id: 24,
        username: 'health_vlog',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/bottle-detection.mp4',
        likes: '12K',
        comments: '200',
        description: 'Hydration is key! 💧✨ #health #tips',
        audio: 'Zen Flow - Health'
    },
    {
        id: 25,
        username: 'city_walk',
        videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking-and-pause.mp4',
        likes: '89K',
        comments: '1.1K',
        description: 'City streets never sleep 🏙️🚶 #urban #walking',
        audio: 'Street Jazz - Mood'
    },
    {
        id: 26,
        username: 'anime_fan',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        likes: '2.1M',
        comments: '30K',
        description: 'Classic bunny moments! 🐰🥕 #anime #classic',
        audio: 'Funny Tunes - Cartoon'
    },
    {
        id: 27,
        username: 'art_space',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        likes: '560K',
        comments: '4K',
        description: 'Artistic expression in motion 🎨🌊 #motion #art',
        audio: 'Ambient Waves - Dream'
    },
    {
        id: 28,
        username: 'movie_buff',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        likes: '1.1M',
        comments: '15K',
        description: 'Fantasy worlds come alive ⚔️🐉 #fantasy #cgi',
        audio: 'Epic Choir - Movie'
    },
    {
        id: 29,
        username: 'tech_news',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        likes: '230K',
        comments: '3.1K',
        description: 'Testing the latest gadgets! 📱🚀 #unboxing #tech',
        audio: 'High Energy - Tech'
    },
    {
        id: 30,
        username: 'daily_joy',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        likes: '450K',
        comments: '5.2K',
        description: 'Spreading joy one reel at a time! 🌈✨ #positivity #life',
        audio: 'Happy Vibes - Daily'
    }
];

const POOL_OF_USERNAMES = [
    'pixel_art', 'daily_vlog', 'music_soul', 'gamer_zone', 'creative_mind', 'wanderlust', 'foodie_life', 'tech_insider',
    'style_icon', 'adventure_seeker', 'chef_talk', 'movie_magic', 'retro_gamer', 'health_first', 'urban_pulse', 'sky_high',
    'neon_nights', 'wild_spirit', 'digital_nomad', 'trend_setter', 'soul_surfer', 'zen_master', 'code_ninja', 'data_viz'
];
const POOL_OF_DESCRIPTIONS = [
    'Check this out! 🚀✨ #amazing #viral',
    'Life is a journey, not a destination. 🌍❤️',
    'POV: You are in paradise 🌴☀️ #paradise #travel',
    'Can you believe this happened? 😲😱 #shook #wow',
    'Best day ever! 🎊🕺 #happy #vibes',
    'Cooking something special today 🥘🔥 #chef #delicious',
    'Wait for the end... 😱👀 #plot-twist',
    'New morning routine revealed ☀️🧘 #lifestyle',
    'Which one is your favorite? 1 or 2? 👇',
    'Transforming my space! 🛠️🏠 #diy #home',
    'Current mood: Grateful ✨🙏 #blessed',
    'Behind the scenes look 🎬👀 #bts #production',
    'Level up your game 🎮🔥 #pro #gaming',
    'The view from the top 🏔️☁️ #mountains #hiking',
    'Friday night vibes 🕺🎶 #weekend #party',
    'Productivity hack you need 💻🚀 #work #efficiency'
];

const ReelItem = ({ reel, isFollowed, onToggleFollow, isLikedInitially, onToggleLike, isDislikedInitially, onToggleDislike, isMuted, onToggleMute }) => {
    const videoRef = useRef(null);
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
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play().catch(error => {
                        console.log("Autoplay prevented:", error);
                    });
                    setIsPlaying(true);
                } else if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

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
            {/* Video Background */}
            {!hasError ? (
                <video
                    ref={videoRef}
                    src={reel.videoUrl}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={handleTap}
                    onError={handleVideoError}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        cursor: 'pointer'
                    }}
                />
            ) : (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
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
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Shorts</span>
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

        // Populate initial reels starting from the first UNSEEN one
        let initialPool = REELS_DATA.filter(r => !seenSet.has(r.videoUrl));
        if (initialPool.length === 0) {
            initialPool = REELS_DATA;
            seenSet.clear();
            setSeenVideoUrls(new Set());
        }

        // Load first 5 reels to start with
        const initialBatch = initialPool.slice(0, 5).map(r => ({
            ...r,
            id: Date.now() + Math.random()
        }));
        setReels(initialBatch);

        // Add those to seen
        initialBatch.forEach(r => seenSet.add(r.videoUrl));
        setSeenVideoUrls(new Set(seenSet));
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
            // Filter out videos that have been seen
            let availableVideos = REELS_DATA.filter(r => !seenVideoUrls.has(r.videoUrl));

            // If all videos have been seen, reset to show variety again
            if (availableVideos.length === 0) {
                availableVideos = REELS_DATA;
                setSeenVideoUrls(new Set());
            }

            const nextBatch = availableVideos.slice(0, 3).map((randomReelTemplate) => {
                // Track this video as seen
                setSeenVideoUrls(prev => new Set(prev).add(randomReelTemplate.videoUrl));

                const randomUsername = POOL_OF_USERNAMES[Math.floor(Math.random() * POOL_OF_USERNAMES.length)];
                const randomDescription = POOL_OF_DESCRIPTIONS[Math.floor(Math.random() * POOL_OF_DESCRIPTIONS.length)];

                return {
                    ...randomReelTemplate,
                    id: Date.now() + Math.random(),
                    username: randomUsername,
                    description: randomDescription,
                    likes: Math.floor(Math.random() * 500) + 'K',
                    comments: Math.floor(Math.random() * 2000)
                };
            });

            setReels(prev => [...prev, ...nextBatch]);
            setIsLoading(false);
        }, 800);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // Trigger when user is within 50px of the bottom
        if (scrollHeight - scrollTop <= clientHeight + 50) {
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
