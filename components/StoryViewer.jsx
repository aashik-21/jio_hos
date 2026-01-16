import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';

const StoryViewer = ({ stories, initialStoryIndex, onClose }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentStory = stories[currentStoryIndex];
    const currentImage = currentStory.images[currentImageIndex];

    const goToNextStory = useCallback(() => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setCurrentImageIndex(0);
            setProgress(0);
        } else {
            onClose();
        }
    }, [currentStoryIndex, stories.length, onClose]);

    const goToPrevStory = useCallback(() => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            setCurrentImageIndex(stories[currentStoryIndex - 1].images.length - 1); // Go to last image of prev story
            setProgress(0);
        } else {
            onClose();
        }
    }, [currentStoryIndex, stories, onClose]);

    const goToNextImage = useCallback(() => {
        if (currentImageIndex < currentStory.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
            setProgress(0);
        } else {
            goToNextStory();
        }
    }, [currentImageIndex, currentStory.images.length, goToNextStory]);

    const goToPrevImage = useCallback(() => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            setProgress(0);
        } else {
            goToPrevStory();
        }
    }, [currentImageIndex, goToPrevStory]);

    // Timer for auto-advance
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    goToNextImage();
                    return 0;
                }
                return prev + 2; // ~2.5 seconds per slide (50ms * 50 steps = 2500ms? No, 100/2 = 50 steps. 50 * 50ms = 2500ms = 2.5s. Maybe make it 5s? )
            });
        }, 50); // Updates every 50ms

        return () => clearInterval(interval);
    }, [isPaused, goToNextImage]);

    // Adjust speed for better UX (e.g. 5 seconds)
    useEffect(() => {
        if (isPaused) return;
        // 50ms interval. 100% progress.
        // We want 5000ms total. 5000 / 50 = 100 steps.
        // So increment by 1 each step.
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    goToNextImage();
                    return 0;
                }
                return prev + 1;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [isPaused, goToNextImage]);


    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            userSelect: 'none'
        }}>
            {/* Progress Bars */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '0',
                right: '0',
                display: 'flex',
                gap: '4px',
                padding: '0 8px',
                zIndex: 1002
            }}>
                {currentStory.images.map((_, idx) => (
                    <div key={idx} style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            background: '#fff',
                            width: idx === currentImageIndex ? `${progress}%` : idx < currentImageIndex ? '100%' : '0%',
                            transition: idx === currentImageIndex ? 'width 0.05s linear' : 'none'
                        }} />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: 0,
                right: 0,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 1002,
                color: '#fff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={currentStory.avatar} alt={currentStory.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{currentStory.name}</span>
                    <span style={{ opacity: 0.7, fontSize: '14px' }}>12h</span>
                </div>
                <X onClick={onClose} style={{ cursor: 'pointer' }} size={28} />
            </div>

            {/* Main Image */}
            <div
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <img
                    src={currentImage}
                    alt="Story"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />

                {/* Touch Areas for Navigation */}
                <div
                    onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '30%', zIndex: 1001 }}
                />
                <div
                    onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '30%', zIndex: 1001 }}
                />
            </div>

            {/* Footer / Input placeholder */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                zIndex: 1002
            }}>
                <div style={{
                    flex: 1,
                    height: '44px',
                    border: '1px solid rgba(255,255,255,0.5)',
                    borderRadius: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    color: '#fff'
                }}>
                    <span style={{ opacity: 0.8 }}>Send message...</span>
                </div>
                <Heart style={{ color: '#fff' }} size={28} />
                <Send style={{ color: '#fff' }} size={28} />
            </div>
        </div>
    );
};

export default StoryViewer;
